import { useState, useEffect, useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Activity, MapPin, Calendar, Waves, Wind, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";

// Types
interface SensorReading {
  timestamp: string;
  water_level: number;
  wind_speed: number;
}

interface SensorDetail {
  id: number;
  location_name: string;
  latitude: number;
  longitude: number;
  status: "normal" | "warning" | "alert";
  installed_date?: string;
  last_maintenance?: string;
  readings: SensorReading[];
}

export default function SensorDetails() {
  const [sensors, setSensors] = useState<SensorDetail[]>([]);
  const [selectedSensorId, setSelectedSensorId] = useState<number | null>(null);

  // Helper: Get current sensor
  const currentSensor = sensors.find((s) => s.id === selectedSensorId);

  // Helper: Badge colors
  const getStatusColor = (status: "normal" | "warning" | "alert") => {
    switch (status) {
      case "normal": return "default";
      case "warning": return "secondary";
      case "alert": return "destructive";
      default: return "default";
    }
  };

  // Helper: Calculate statistics
  const calculateStats = (readings: SensorReading[]) => {
    if (readings.length === 0) return null;
    
    const waterLevels = readings.map(r => r.water_level);
    const windSpeeds = readings.map(r => r.wind_speed);
    
    const avgWater = waterLevels.reduce((a, b) => a + b, 0) / waterLevels.length;
    const avgWind = windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length;
    
    const maxWater = Math.max(...waterLevels);
    const maxWind = Math.max(...windSpeeds);
    
    const minWater = Math.min(...waterLevels);
    const minWind = Math.min(...windSpeeds);
    
    // Calculate trends (comparing first and last reading)
    const waterTrend = waterLevels.length > 1 
      ? waterLevels[waterLevels.length - 1] - waterLevels[0] 
      : 0;
      
    const windTrend = windSpeeds.length > 1 
      ? windSpeeds[windSpeeds.length - 1] - windSpeeds[0] 
      : 0;
    
    return {
      avgWater: avgWater.toFixed(2),
      avgWind: avgWind.toFixed(2),
      maxWater: maxWater.toFixed(2),
      maxWind: maxWind.toFixed(2),
      minWater: minWater.toFixed(2),
      minWind: minWind.toFixed(2),
      waterTrend,
      windTrend,
      lastReading: readings[readings.length - 1]
    };
  };

  const stats = currentSensor ? calculateStats(currentSensor.readings) : null;

  // Particle Background Init
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: { color: { value: "#0a192f" } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" }, resize: true },
      modes: { grab: { distance: 140, links: { opacity: 0.7 } } },
    },
    particles: {
      color: { value: "#ffffff" },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1, outModes: { default: "out" } },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  // Fetch and Normalize Data
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/sensors")
      .then((res) => {
        console.log("API Response:", res.data);
        const rawData = Array.isArray(res.data) ? res.data : [];

        // Group readings by sensor_id
        const grouped = rawData.reduce((acc: Record<number, SensorDetail>, reading: any) => {
          if (!acc[reading.sensor_id]) {
            acc[reading.sensor_id] = {
              id: reading.sensor_id,
              location_name: reading.location_name,
              latitude: reading.latitude,
              longitude: reading.longitude,
              status: reading.status || "normal",
              readings: [],
            };
          }
          acc[reading.sensor_id].readings.push({
            timestamp: reading.timestamp,
            water_level: reading.water_level,
            wind_speed: reading.wind_speed,
          });
          return acc;
        }, {});

        const sensorsArray = Object.values(grouped);
        setSensors(sensorsArray);
        if (sensorsArray.length > 0) setSelectedSensorId(sensorsArray[0].id);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a192f]">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Page Content */}
      <div className="relative z-10 p-6 space-y-6 text-white">
        {/* Header with dropdown */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Sensor Details</h1>
          <Select
            value={selectedSensorId?.toString() || ""}
            onValueChange={(v) => setSelectedSensorId(parseInt(v))}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select a sensor" />
            </SelectTrigger>
            <SelectContent>
              {sensors.map((sensor) => (
                <SelectItem key={sensor.id} value={sensor.id.toString()}>
                  {sensor.location_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentSensor && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sensor Info */}
            <Card className="lg:col-span-1 bg-slate-900/50 border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" /> Sensor Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{currentSensor.location_name}</h3>
                  <Badge variant={getStatusColor(currentSensor.status)} className="mt-1">
                    {currentSensor.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{currentSensor.location_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {currentSensor.latitude}°N, {currentSensor.longitude}°E
                      </p>
                    </div>
                  </div>
                  {currentSensor.installed_date && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Installed</p>
                        <p className="text-sm text-muted-foreground">{currentSensor.installed_date}</p>
                      </div>
                    </div>
                  )}
                </div>
                <Button className="w-full" variant="outline">Schedule Maintenance</Button>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="lg:col-span-2 bg-slate-900/50 border border-white/10">
              <CardHeader><CardTitle>Sensor Location</CardTitle></CardHeader>
              <CardContent>
                <MapContainer
                  center={[currentSensor.latitude, currentSensor.longitude]}
                  zoom={12}
                  style={{ height: "300px", width: "100%" }}
                  className="rounded-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap"
                  />
                  <Marker position={[currentSensor.latitude, currentSensor.longitude]}>
                    <Popup>{currentSensor.location_name}</Popup>
                  </Marker>
                </MapContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Graph with Statistics */}
        {currentSensor && stats && (
          <Card className="bg-slate-900/50 border border-white/10">
            <CardHeader>
              <CardTitle>Water & Wind Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Water Level Stats */}
                <Card className="bg-slate-800/50 border border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Waves className="h-4 w-4" /> Water Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current</span>
                        <span className="font-semibold">{stats.lastReading.water_level}m</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Average</span>
                        <span>{stats.avgWater}m</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Max/Min</span>
                        <span>{stats.maxWater}m / {stats.minWater}m</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Trend</span>
                        <div className="flex items-center">
                          {stats.waterTrend > 0 ? (
                            <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                          ) : stats.waterTrend < 0 ? (
                            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                          ) : null}
                          <span className={stats.waterTrend > 0 ? "text-red-500" : stats.waterTrend < 0 ? "text-green-500" : ""}>
                            {stats.waterTrend > 0 ? "+" : ""}{stats.waterTrend.toFixed(2)}m
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Wind Speed Stats */}
                <Card className="bg-slate-800/50 border border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Wind className="h-4 w-4" /> Wind Speed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current</span>
                        <span className="font-semibold">{stats.lastReading.wind_speed}km/h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Average</span>
                        <span>{stats.avgWind}km/h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Max/Min</span>
                        <span>{stats.maxWind}km/h / {stats.minWind}km/h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Trend</span>
                        <div className="flex items-center">
                          {stats.windTrend > 0 ? (
                            <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                          ) : stats.windTrend < 0 ? (
                            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                          ) : null}
                          <span className={stats.windTrend > 0 ? "text-red-500" : stats.windTrend < 0 ? "text-green-500" : ""}>
                            {stats.windTrend > 0 ? "+" : ""}{stats.windTrend.toFixed(2)}km/h
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Status Summary */}
                <Card className="bg-slate-800/50 border border-white/10 md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" /> Status Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Water Level Status</h4>
                        <div className="flex items-center">
                          <div className={`h-3 w-3 rounded-full mr-2 ${
                            stats.lastReading.water_level > 3.5 ? "bg-red-500" :
                            stats.lastReading.water_level > 2.5 ? "bg-yellow-500" : "bg-green-500"
                          }`} />
                          <span className="text-sm">
                            {stats.lastReading.water_level > 3.5 ? "High Alert" :
                             stats.lastReading.water_level > 2.5 ? "Warning" : "Normal"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stats.lastReading.water_level > 3.5 ? "Water level is critically high" :
                           stats.lastReading.water_level > 2.5 ? "Water level is elevated" : "Water level is within normal range"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Wind Speed Status</h4>
                        <div className="flex items-center">
                          <div className={`h-3 w-3 rounded-full mr-2 ${
                            stats.lastReading.wind_speed > 30 ? "bg-red-500" :
                            stats.lastReading.wind_speed > 20 ? "bg-yellow-500" : "bg-green-500"
                          }`} />
                          <span className="text-sm">
                            {stats.lastReading.wind_speed > 30 ? "High Alert" :
                             stats.lastReading.wind_speed > 20 ? "Warning" : "Normal"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stats.lastReading.wind_speed > 30 ? "Strong winds detected" :
                           stats.lastReading.wind_speed > 20 ? "Moderate winds" : "Calm conditions"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={currentSensor.readings.map((r) => ({
                  time: new Date(r.timestamp).toLocaleTimeString(),
                  water: r.water_level,
                  wind: r.wind_speed,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="time" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip />
                  <Line type="monotone" dataKey="water" stroke="#4FD1C5" strokeWidth={3} name="Water Level (m)" />
                  <Line type="monotone" dataKey="wind" stroke="#F87171" strokeWidth={3} name="Wind Speed (km/h)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
