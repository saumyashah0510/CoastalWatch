import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, MapPin, Calendar, TrendingUp } from "lucide-react";

interface SensorReading {
  timestamp: string;
  value: number;
  unit: string;
}

interface SensorDetail {
  id: string;
  name: string;
  type: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: "normal" | "warning" | "alert";
  installedDate: string;
  lastMaintenance: string;
  readings: SensorReading[];
}

export default function SensorDetails() {
  const [selectedSensor, setSelectedSensor] = useState<string>("S001");
  
  const sensors: SensorDetail[] = [
    {
      id: "S001",
      name: "Marina Bay Monitor", 
      type: "Water Level Sensor",
      location: "Marina Bay, Singapore",
      coordinates: { lat: 1.28, lng: 103.85 },
      status: "alert",
      installedDate: "2023-03-15",
      lastMaintenance: "2024-01-10",
      readings: [
        { timestamp: "14:30", value: 2.3, unit: "m" },
        { timestamp: "14:00", value: 2.1, unit: "m" },
        { timestamp: "13:30", value: 1.9, unit: "m" },
        { timestamp: "13:00", value: 1.7, unit: "m" },
        { timestamp: "12:30", value: 1.5, unit: "m" },
      ]
    },
    {
      id: "S002",
      name: "East Coast Sensor",
      type: "Water Level Sensor", 
      location: "East Coast Park, Singapore",
      coordinates: { lat: 1.30, lng: 103.90 },
      status: "normal",
      installedDate: "2023-05-20",
      lastMaintenance: "2024-01-08",
      readings: [
        { timestamp: "14:30", value: 0.8, unit: "m" },
        { timestamp: "14:00", value: 0.7, unit: "m" },
        { timestamp: "13:30", value: 0.9, unit: "m" },
        { timestamp: "13:00", value: 0.8, unit: "m" },
        { timestamp: "12:30", value: 0.6, unit: "m" },
      ]
    }
  ];

  const currentSensor = sensors.find(s => s.id === selectedSensor) || sensors[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "alert": return "destructive";
      case "warning": return "secondary"; 
      case "normal": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Sensor Details</h1>
        <Select value={selectedSensor} onValueChange={setSelectedSensor}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select a sensor" />
          </SelectTrigger>
          <SelectContent>
            {sensors.map((sensor) => (
              <SelectItem key={sensor.id} value={sensor.id}>
                {sensor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Sensor Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{currentSensor.name}</h3>
              <Badge variant={getStatusColor(currentSensor.status)} className="mt-1">
                {currentSensor.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{currentSensor.location}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentSensor.coordinates.lat}°N, {currentSensor.coordinates.lng}°E
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Installed</p>
                  <p className="text-sm text-muted-foreground">{currentSensor.installedDate}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Maintenance</p>
                  <p className="text-sm text-muted-foreground">{currentSensor.lastMaintenance}</p>
                </div>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              Schedule Maintenance
            </Button>
          </CardContent>
        </Card>

        {/* Recent Readings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Readings</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chart Placeholder */}
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border mb-6">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Time-series chart will be displayed here</p>
                <p className="text-sm text-muted-foreground">Showing sensor readings over time</p>
              </div>
            </div>

            {/* Readings Table */}
            <div className="space-y-2">
              <h4 className="font-medium">Latest Readings</h4>
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b">
                <div>Time</div>
                <div>Value</div>
                <div>Status</div>
              </div>
              {currentSensor.readings.map((reading, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 text-sm py-2 border-b">
                  <div>{reading.timestamp}</div>
                  <div className="font-medium">{reading.value} {reading.unit}</div>
                  <div>
                    {reading.value > 2.0 ? (
                      <Badge variant="destructive" className="text-xs">Alert</Badge>
                    ) : reading.value > 1.5 ? (
                      <Badge variant="secondary" className="text-xs">Warning</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Normal</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Location Map */}
      <Card>
        <CardHeader>
          <CardTitle>Sensor Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Detailed location map will be displayed here</p>
              <p className="text-sm text-muted-foreground">Showing precise sensor placement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}