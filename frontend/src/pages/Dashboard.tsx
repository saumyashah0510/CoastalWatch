// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { AlertTriangle, Waves, Activity, RefreshCw } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// interface Sensor {
//   id: string;
//   name: string;
//   location: { lat: number; lng: number };
//   status: "normal" | "warning" | "alert";
//   lastReading: number;
//   type: string;
// }

// interface AlertData {
//   id: string;
//   sensorId: string;
//   severity: "low" | "medium" | "high";
//   message: string;
//   timestamp: string;
//   location: string;
// }

// export default function Dashboard() {
//   const [alerts, setAlerts] = useState<AlertData[]>([
//     {
//       id: "1",
//       sensorId: "S001",
//       severity: "high",
//       message: "Water level critical - 2.3m above normal",
//       timestamp: "2024-01-15 14:30",
//       location: "Marina Bay"
//     },
//     {
//       id: "2", 
//       sensorId: "S003",
//       severity: "medium",
//       message: "Unusual wave pattern detected",
//       timestamp: "2024-01-15 13:45",
//       location: "Sunset Beach"
//     }
//   ]);

//   const [sensors] = useState<Sensor[]>([
//     { id: "S001", name: "Marina Bay Monitor", location: { lat: 1.28, lng: 103.85 }, status: "alert", lastReading: 2.3, type: "Water Level" },
//     { id: "S002", name: "East Coast Sensor", location: { lat: 1.30, lng: 103.90 }, status: "normal", lastReading: 0.8, type: "Water Level" },
//     { id: "S003", name: "Sunset Beach Monitor", location: { lat: 1.26, lng: 103.82 }, status: "warning", lastReading: 1.5, type: "Wave Height" }
//   ]);

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "high": return "destructive";
//       case "medium": return "secondary";
//       case "low": return "outline";
//       default: return "outline";
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "alert": return "text-destructive";
//       case "warning": return "text-secondary";
//       case "normal": return "text-primary";
//       default: return "text-muted-foreground";
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-foreground">Coastal Monitoring Dashboard</h1>
//         <Button variant="outline" size="sm">
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Refresh Data
//         </Button>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
//             <AlertTriangle className="h-4 w-4 text-destructive" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-destructive">{alerts.length}</div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Sensors Online</CardTitle>
//             <Activity className="h-4 w-4 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-primary">{sensors.length}</div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Water Level</CardTitle>
//             <Waves className="h-4 w-4 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-primary">1.2m</div>
//             <p className="text-xs text-muted-foreground">Average</p>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">System Status</CardTitle>
//             <div className="h-2 w-2 bg-primary rounded-full"></div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-primary">Operational</div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Interactive Map Placeholder */}
//         <Card className="lg:col-span-1">
//           <CardHeader>
//             <CardTitle>Sensor Map</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
//               <div className="text-center">
//                 <Waves className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                 <p className="text-muted-foreground">Interactive map will be displayed here</p>
//                 <p className="text-sm text-muted-foreground">Showing sensor locations and status</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Active Alerts */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Active Alerts</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {alerts.map((alert) => (
//               <Alert key={alert.id} className="border-l-4 border-l-destructive">
//                 <AlertTriangle className="h-4 w-4" />
//                 <AlertDescription>
//                   <div className="flex items-start justify-between">
//                     <div className="space-y-1">
//                       <p className="font-medium">{alert.message}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {alert.location} • {alert.timestamp}
//                       </p>
//                     </div>
//                     <Badge variant={getSeverityColor(alert.severity)}>
//                       {alert.severity}
//                     </Badge>
//                   </div>
//                 </AlertDescription>
//               </Alert>
//             ))}
//             {alerts.length === 0 && (
//               <p className="text-muted-foreground text-center py-4">No active alerts</p>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Sensor Status */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Sensor Status Overview</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {sensors.map((sensor) => (
//               <div key={sensor.id} className="p-4 border rounded-lg bg-card">
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="font-medium">{sensor.name}</h4>
//                   <div className={`h-2 w-2 rounded-full ${
//                     sensor.status === 'alert' ? 'bg-destructive' : 
//                     sensor.status === 'warning' ? 'bg-secondary' : 'bg-primary'
//                   }`}></div>
//                 </div>
//                 <p className="text-sm text-muted-foreground">{sensor.type}</p>
//                 <p className={text-lg font-semibold ${getStatusColor(sensor.status)}}>
//                   {sensor.lastReading}m
//                 </p>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Waves, Activity, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Sensor {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: "normal" | "warning" | "alert";
  lastReading: number;
  type: string;
}

interface AlertData {
  id: string;
  sensorId: string;
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: string;
  location: string;
}

export default function Dashboard() {
  const [alerts] = useState<AlertData[]>([
    {
      id: "1",
      sensorId: "S001",
      severity: "high",
      message: "Water level critical - 2.3m above normal",
      timestamp: "2024-01-15 14:30",
      location: "Marina Bay",
    },
    {
      id: "2",
      sensorId: "S003",
      severity: "medium",
      message: "Unusual wave pattern detected",
      timestamp: "2024-01-15 13:45",
      location: "Sunset Beach",
    },
  ]);

  const [sensors] = useState<Sensor[]>([
    {
      id: "S001",
      name: "Marina Bay Monitor",
      location: { lat: 1.28, lng: 103.85 },
      status: "alert",
      lastReading: 2.3,
      type: "Water Level",
    },
    {
      id: "S002",
      name: "East Coast Sensor",
      location: { lat: 1.3, lng: 103.9 },
      status: "normal",
      lastReading: 0.8,
      type: "Water Level",
    },
    {
      id: "S003",
      name: "Sunset Beach Monitor",
      location: { lat: 1.26, lng: 103.82 },
      status: "warning",
      lastReading: 1.5,
      type: "Wave Height",
    },
  ]);

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
        grab: { distance: 140, links: { opacity: 0.7 } },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "out" },
        random: false,
        speed: 1,
        straight: false,
      },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "alert":
        return "text-destructive";
      case "warning":
        return "text-secondary";
      case "normal":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a192f]">
      {/* Particle background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Dashboard content */}
      <div className="relative z-10 p-6 space-y-6 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Coastal Monitoring Dashboard</h1>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
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
                {alerts.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 text-white border-l-4 border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sensors Online</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{sensors.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 text-white border-l-4 border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Level</CardTitle>
              <Waves className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1.2m</div>
              <p className="text-xs text-blue-200">Average</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 text-white border-l-4 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Operational</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Placeholder */}
          <Card className="bg-slate-900/60 text-white">
            <CardHeader>
              <CardTitle>Sensor Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-black/40 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20">
                <div className="text-center text-blue-200">
                  <Waves className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                  <p>Interactive map will be displayed here</p>
                  <p className="text-sm">Showing sensor locations and status</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card className="bg-slate-900/60 text-white">
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
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
                          {alert.location} • {alert.timestamp}
                        </p>
                      </div>
                      <Badge variant={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
              {alerts.length === 0 && (
                <p className="text-blue-200 text-center py-4">No active alerts</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sensor Status */}
        <Card className="bg-slate-900/60 text-white">
          <CardHeader>
            <CardTitle>Sensor Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sensors.map((sensor) => (
                <div
                  key={sensor.id}
                  className="p-4 border border-white/20 rounded-lg bg-black/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{sensor.name}</h4>
                    <div
                      className={`h-2 w-2 rounded-full ${
                        sensor.status === "alert"
                          ? "bg-destructive"
                          : sensor.status === "warning"
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      } animate-pulse`}
                    ></div>
                  </div>
                  <p className="text-sm text-blue-200">{sensor.type}</p>
                  <p
                    className={`text-lg font-semibold ${getStatusColor(
                      sensor.status
                    )}`}
                  >
                    {sensor.lastReading}m
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}