// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { AlertTriangle, Search, Download, Filter } from "lucide-react";

// interface HistoricalAlert {
//   id: string;
//   sensorId: string;
//   sensorName: string;
//   severity: "low" | "medium" | "high";
//   message: string;
//   timestamp: string;
//   location: string;
//   status: "active" | "resolved" | "acknowledged";
//   resolvedAt?: string;
// }

// export default function AlertsHistory() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [severityFilter, setSeverityFilter] = useState<string>("all");
//   const [statusFilter, setStatusFilter] = useState<string>("all");

//   const [alerts] = useState<HistoricalAlert[]>([
//     {
//       id: "ALT001",
//       sensorId: "S001",
//       sensorName: "Marina Bay Monitor",
//       severity: "high",
//       message: "Water level critical - 2.3m above normal",
//       timestamp: "2024-01-15 14:30:00",
//       location: "Marina Bay",
//       status: "active"
//     },
//     {
//       id: "ALT002", 
//       sensorId: "S003",
//       sensorName: "Sunset Beach Monitor",
//       severity: "medium",
//       message: "Unusual wave pattern detected",
//       timestamp: "2024-01-15 13:45:00",
//       location: "Sunset Beach",
//       status: "acknowledged"
//     },
//     {
//       id: "ALT003",
//       sensorId: "S002",
//       sensorName: "East Coast Sensor", 
//       severity: "low",
//       message: "Minor water level fluctuation",
//       timestamp: "2024-01-15 12:15:00",
//       location: "East Coast Park",
//       status: "resolved",
//       resolvedAt: "2024-01-15 12:45:00"
//     },
//     {
//       id: "ALT004",
//       sensorId: "S001",
//       sensorName: "Marina Bay Monitor",
//       severity: "high", 
//       message: "Storm surge detected - immediate action required",
//       timestamp: "2024-01-14 09:20:00",
//       location: "Marina Bay",
//       status: "resolved",
//       resolvedAt: "2024-01-14 11:30:00"
//     },
//     {
//       id: "ALT005",
//       sensorId: "S004",
//       sensorName: "Harbor Sensor",
//       severity: "medium",
//       message: "Tide level exceeding normal range",
//       timestamp: "2024-01-13 16:10:00", 
//       location: "Singapore Harbor",
//       status: "resolved",
//       resolvedAt: "2024-01-13 18:25:00"
//     }
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
//       case "active": return "destructive";
//       case "acknowledged": return "secondary";
//       case "resolved": return "outline";
//       default: return "outline";
//     }
//   };

//   const filteredAlerts = alerts.filter(alert => {
//     const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          alert.sensorName.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
//     const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
    
//     return matchesSearch && matchesSeverity && matchesStatus;
//   });

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-foreground">Alert History</h1>
//         <Button variant="outline">
//           <Download className="h-4 w-4 mr-2" />
//           Export CSV
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Filter className="h-5 w-5" />
//             Filters
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search alerts..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
            
//             <Select value={severityFilter} onValueChange={setSeverityFilter}>
//               <SelectTrigger className="w-full md:w-48">
//                 <SelectValue placeholder="Severity" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Severities</SelectItem>
//                 <SelectItem value="high">High</SelectItem>
//                 <SelectItem value="medium">Medium</SelectItem>
//                 <SelectItem value="low">Low</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full md:w-48">
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="acknowledged">Acknowledged</SelectItem>
//                 <SelectItem value="resolved">Resolved</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Alert Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
//             <AlertTriangle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{alerts.length}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active</CardTitle>
//             <div className="h-2 w-2 bg-destructive rounded-full"></div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-destructive">
//               {alerts.filter(a => a.status === 'active').length}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
//             <div className="h-2 w-2 bg-secondary rounded-full"></div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-secondary">
//               {alerts.filter(a => a.status === 'acknowledged').length}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Resolved</CardTitle>
//             <div className="h-2 w-2 bg-primary rounded-full"></div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-primary">
//               {alerts.filter(a => a.status === 'resolved').length}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Alerts Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Alert History ({filteredAlerts.length} results)</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Alert ID</TableHead>
//                 <TableHead>Sensor</TableHead>
//                 <TableHead>Message</TableHead>
//                 <TableHead>Severity</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Location</TableHead>
//                 <TableHead>Timestamp</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredAlerts.map((alert) => (
//                 <TableRow key={alert.id}>
//                   <TableCell className="font-mono text-sm">{alert.id}</TableCell>
//                   <TableCell>{alert.sensorName}</TableCell>
//                   <TableCell className="max-w-xs truncate">{alert.message}</TableCell>
//                   <TableCell>
//                     <Badge variant={getSeverityColor(alert.severity)}>
//                       {alert.severity}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={getStatusColor(alert.status)}>
//                       {alert.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{alert.location}</TableCell>
//                   <TableCell className="text-sm text-muted-foreground">
//                     {alert.timestamp}
//                     {alert.resolvedAt && (
//                       <div className="text-xs">Resolved: {alert.resolvedAt}</div>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
          
//           {filteredAlerts.length === 0 && (
//             <div className="text-center py-8">
//               <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//               <p className="text-muted-foreground">No alerts found matching your criteria</p>
//             </div>
//           )}
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Search, Download, Filter } from "lucide-react";

interface HistoricalAlert {
  id: string;
  sensorId: string;
  sensorName: string;
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: string;
  location: string;
  status: "active" | "resolved" | "acknowledged";
  resolvedAt?: string;
}

export default function AlertsHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [alerts] = useState<HistoricalAlert[]>([
    {
      id: "ALT001",
      sensorId: "S001",
      sensorName: "Marina Bay Monitor",
      severity: "high",
      message: "Water level critical - 2.3m above normal",
      timestamp: "2024-01-15 14:30:00",
      location: "Marina Bay",
      status: "active"
    },
    {
      id: "ALT002", 
      sensorId: "S003",
      sensorName: "Sunset Beach Monitor",
      severity: "medium",
      message: "Unusual wave pattern detected",
      timestamp: "2024-01-15 13:45:00",
      location: "Sunset Beach",
      status: "acknowledged"
    },
    {
      id: "ALT003",
      sensorId: "S002",
      sensorName: "East Coast Sensor", 
      severity: "low",
      message: "Minor water level fluctuation",
      timestamp: "2024-01-15 12:15:00",
      location: "East Coast Park",
      status: "resolved",
      resolvedAt: "2024-01-15 12:45:00"
    },
    {
      id: "ALT004",
      sensorId: "S001",
      sensorName: "Marina Bay Monitor",
      severity: "high", 
      message: "Storm surge detected - immediate action required",
      timestamp: "2024-01-14 09:20:00",
      location: "Marina Bay",
      status: "resolved",
      resolvedAt: "2024-01-14 11:30:00"
    },
    {
      id: "ALT005",
      sensorId: "S004",
      sensorName: "Harbor Sensor",
      severity: "medium",
      message: "Tide level exceeding normal range",
      timestamp: "2024-01-13 16:10:00", 
      location: "Singapore Harbor",
      status: "resolved",
      resolvedAt: "2024-01-13 18:25:00"
    }
  ]);

  // Particles setup (same as Index.tsx)
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
        enable: true,
        speed: 1,
        outModes: { default: "out" },
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
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "destructive";
      case "acknowledged": return "secondary";
      case "resolved": return "outline";
      default: return "outline";
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alert.sensorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a192f] text-white">
      {/* Particle background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Content on top of particles */}
      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Alert History</h1>
          <Button variant="outline" className="text-white border-blue-300 hover:bg-blue-500/20">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/70 text-white border-white/20"
                />
              </div>
              
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full md:w-48 bg-slate-800/70 text-white border-white/20">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 text-white">
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-slate-800/70 text-white border-white/20">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 text-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table section */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border border-white/10 text-white">
          <CardHeader>
            <CardTitle>Alert History ({filteredAlerts.length} results)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Sensor</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-mono text-sm">{alert.id}</TableCell>
                    <TableCell>{alert.sensorName}</TableCell>
                    <TableCell className="max-w-xs truncate">{alert.message}</TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.location}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {alert.timestamp}
                      {alert.resolvedAt && (
                        <div className="text-xs">Resolved: {alert.resolvedAt}</div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No alerts found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}