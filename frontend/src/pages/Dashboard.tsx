import { useState, useCallback, useEffect } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Waves, Activity, RefreshCw, Wind, MapPin, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Leaflet / React-Leaflet imports
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

interface Sensor {
  id: number;
  name: string;
  type: string;
  location_name: string;
  latitude: number;
  longitude: number;
  status: "normal" | "warning" | "alert";
  installed_date?: string;
  last_maintenance?: string;
}

interface AlertData {
  id: number;
  sensor_id: number;
  message: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
  location_name: string;
}

interface ReadingStats {
  avg_water_level: number;
  avg_wind_speed: number;
}

// Fix for default markers in react-leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default markers
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Fit bounds component
function FitBounds({ sensors }: { sensors: Sensor[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (!sensors || sensors.length === 0) return;
    
    try {
      const bounds = L.latLngBounds(
        sensors.map(sensor => [sensor.latitude, sensor.longitude])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    } catch (e) {
      console.error("Error fitting bounds:", e);
    }
  }, [map, sensors]);
  
  return null;
}

export default function Dashboard() {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [stats, setStats] = useState<ReadingStats>({ 
    avg_water_level: 0, 
    avg_wind_speed: 0 
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [alertsResponse, sensorsResponse, statsResponse] = await Promise.all([
        axios.get("http://127.0.0.1:8000/dashboard/alerts"),
        axios.get("http://127.0.0.1:8000/dashboard/sensors"),
        axios.get("http://127.0.0.1:8000/dashboard/readings/averages?limit=10")
      ]);
      
      // Store all alerts but only display top 3 in the detailed view
      setAlerts(alertsResponse.data);
      setSensors(sensorsResponse.data);
      setStats(statsResponse.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      
      // Fallback mock data with more than 3 alerts to test the limit
      setAlerts([
        {
          id: 1,
          sensor_id: 1,
          severity: "critical",
          message: "Water level critical - 2.3m above normal",
          timestamp: "2024-01-15T14:30:00",
          location_name: "Marina Bay"
        },
        {
          id: 2,
          sensor_id: 2,
          severity: "high",
          message: "Unusual wave pattern detected",
          timestamp: "2024-01-15T13:45:00",
          location_name: "East Coast"
        },
        {
          id: 3,
          sensor_id: 3,
          severity: "medium",
          message: "Wind speed above threshold",
          timestamp: "2024-01-15T12:20:00",
          location_name: "Sunset Beach"
        },
        {
          id: 4,
          sensor_id: 4,
          severity: "high",
          message: "Sensor communication issue",
          timestamp: "2024-01-14T16:10:00",
          location_name: "West Coast"
        },
        {
          id: 5,
          sensor_id: 5,
          severity: "medium",
          message: "Elevated water temperature",
          timestamp: "2024-01-14T10:30:00",
          location_name: "North Point"
        }
      ]);
      
      setSensors([
        {
          id: 1,
          name: "Marina Bay Monitor",
          type: "Water Level",
          location_name: "Marina Bay",
          latitude: 1.28,
          longitude: 103.85,
          status: "alert",
          installed_date: "2023-05-15",
          last_maintenance: "2024-01-10"
        },
        {
          id: 2,
          name: "East Coast Sensor",
          type: "Water Level",
          location_name: "East Coast",
          latitude: 1.30,
          longitude: 103.90,
          status: "normal",
          installed_date: "2023-06-20",
          last_maintenance: "2024-01-05"
        },
        {
          id: 3,
          name: "Sunset Beach Monitor",
          type: "Wave Height",
          location_name: "Sunset Beach",
          latitude: 1.26,
          longitude: 103.82,
          status: "warning",
          installed_date: "2023-07-10",
          last_maintenance: "2023-12-15"
        },
        {
          id: 4,
          name: "West Coast Buoy",
          type: "Water Level",
          location_name: "West Coast",
          latitude: 1.29,
          longitude: 103.75,
          status: "normal",
          installed_date: "2023-08-05",
          last_maintenance: "2024-01-08"
        },
        {
          id: 5,
          name: "Northern Sensor",
          type: "Wave Height",
          location_name: "North Point",
          latitude: 1.32,
          longitude: 103.95,
          status: "normal",
          installed_date: "2023-09-12",
          last_maintenance: "2023-12-20"
        }
      ]);
      
      setStats({ 
        avg_water_level: 1.2, 
        avg_wind_speed: 24 
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (error) {
      return timestamp;
    }
  };

  // Format date for display (without time)
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  // Particle engine setup
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: { value: "#0a192f" },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true,
      },
      modes: {
        grab: { distance: 120, links: { opacity: 0.7 } },
      },
    },
    particles: {
      color: { value: "#9fb8ff" },
      links: {
        color: "#6fa8ff",
        distance: 140,
        enable: true,
        opacity: 0.12,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "out" },
        random: false,
        speed: 0.7,
        straight: false,
      },
      number: { density: { enable: true, area: 900 }, value: 60 },
      opacity: { value: 0.25 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "secondary";
      case "medium":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "alert":
        return "bg-destructive";
      case "warning":
        return "bg-yellow-500";
      case "normal":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "alert":
        return "text-destructive";
      case "warning":
        return "text-yellow-500";
      case "normal":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  // Map color by status
  const colorForStatus = (status: string) => {
    if (status === "alert") return "#ff4d4f";
    if (status === "warning") return "#ffa940";
    return "#4ade80";
  };

  const defaultCenter: [number, number] = sensors.length > 0
    ? [sensors[0].latitude, sensors[0].longitude]
    : [1.28, 103.85];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a192f]">
      {/* Particles background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Dashboard content */}
      <div className="relative z-10 p-6 space-y-6 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Coastal Monitoring Dashboard</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchData} 
            disabled={loading}
            className="bg-slate-800/50 border-white/20"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Loading..." : "Refresh Data"}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/60 text-white border-l-4 border-destructive">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {alerts.length} {/* Show total alert count */}
              </div>
              <p className="text-xs text-blue-200">Total alerts</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 text-white border-l-4 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sensors Online</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">5</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 text-white border-l-4 border-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Level</CardTitle>
              <Waves className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {stats.avg_water_level.toFixed(1)}m
              </div>
              <p className="text-xs text-blue-200">Average (Top 10)</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 text-white border-l-4 border-cyan-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
              <Wind className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-500">
                {stats.avg_wind_speed.toFixed(1)}km/h
              </div>
              <p className="text-xs text-cyan-200">Average (Top 10)</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sensor Map */}
          <Card className="bg-slate-900/60 text-white">
            <CardHeader>
              <CardTitle>Sensor Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={defaultCenter}
                  zoom={12}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                  style={{ background: "transparent" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <FitBounds sensors={sensors} />

                  {sensors.map((sensor) => (
                    <CircleMarker
                      key={sensor.id}
                      center={[sensor.latitude, sensor.longitude]}
                      radius={10}
                      pathOptions={{
                        color: colorForStatus(sensor.status),
                        fillColor: colorForStatus(sensor.status),
                        fillOpacity: 0.8,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="text-left text-black">
                          <strong>{sensor.name}</strong>
                          <div className="text-sm">Location: {sensor.location_name}</div>
                          <div className="text-sm">Type: {sensor.type}</div>
                          <div className="text-sm">Status: {sensor.status}</div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts - Show only 3 most recent alerts */}
          <Card className="bg-slate-900/60 text-white">
            <CardHeader>
              <CardTitle>Recent Alerts (Last 10 Days)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.length > 0 ? (
                alerts.slice(0, 3).map((alert) => ( // Only show first 3 alerts
                  <Alert
                    key={alert.id}
                    className="border-l-4 border-l-destructive bg-black/30 text-white"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-blue-200">
                            {alert.location_name} • {formatTimestamp(alert.timestamp)}
                          </p>
                        </div>
                        <Badge variant={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))
              ) : (
                <p className="text-blue-200 text-center py-4">No active alerts in the last 10 days</p>
              )}
              {alerts.length > 3 && (
                <p className="text-blue-200 text-center py-2">
                  Showing 3 of {alerts.length} alerts
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sensor Details Section - Added at the bottom */}
        <Card className="bg-slate-900/60 text-white">
          <CardHeader>
            <CardTitle>Sensor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sensors.map((sensor) => (
                <Card key={sensor.id} className="bg-slate-800/50 border-white/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{sensor.name}</CardTitle>
                      <div className={`h-3 w-3 rounded-full ${getStatusColor(sensor.status)}`}></div>
                    </div>
                    <Badge variant="outline" className={getStatusText(sensor.status)}>
                      {sensor.status.toUpperCase()}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-blue-400" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{sensor.location_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {sensor.latitude.toFixed(4)}°N, {sensor.longitude.toFixed(4)}°E
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Activity className="h-4 w-4 mt-1 text-blue-400" />
                      <div>
                        <p className="text-sm font-medium">Type</p>
                        <p className="text-sm text-muted-foreground">{sensor.type}</p>
                      </div>
                    </div>
                    
                    {sensor.installed_date && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-1 text-blue-400" />
                        <div>
                          <p className="text-sm font-medium">Installed</p>
                          <p className="text-sm text-muted-foreground">{formatDate(sensor.installed_date)}</p>
                        </div>
                      </div>
                    )}
                    
                    {sensor.last_maintenance && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-1 text-blue-400" />
                        <div>
                          <p className="text-sm font-medium">Last Maintenance</p>
                          <p className="text-sm text-muted-foreground">{formatDate(sensor.last_maintenance)}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}