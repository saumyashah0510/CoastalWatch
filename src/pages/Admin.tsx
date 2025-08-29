import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, Activity, Plus, Edit, Trash2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "operator" | "viewer";
  lastLogin: string;
  status: "active" | "inactive";
}

interface SystemSensor {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "online" | "offline" | "maintenance";
  lastUpdate: string;
}

export default function Admin() {
  const { toast } = useToast();
  
  const [users] = useState<User[]>([
    {
      id: "U001",
      name: "John Smith",
      email: "john@coastalwatch.com", 
      role: "admin",
      lastLogin: "2024-01-15 14:30",
      status: "active"
    },
    {
      id: "U002",
      name: "Sarah Johnson",
      email: "sarah@coastalwatch.com",
      role: "operator", 
      lastLogin: "2024-01-15 13:45",
      status: "active"
    },
    {
      id: "U003",
      name: "Mike Chen",
      email: "mike@coastalwatch.com",
      role: "viewer",
      lastLogin: "2024-01-14 16:20",
      status: "inactive"
    }
  ]);

  const [sensors, setSensors] = useState<SystemSensor[]>([
    {
      id: "S001",
      name: "Marina Bay Monitor",
      type: "Water Level",
      location: "Marina Bay, Singapore",
      status: "online", 
      lastUpdate: "2024-01-15 14:30"
    },
    {
      id: "S002", 
      name: "East Coast Sensor",
      type: "Water Level",
      location: "East Coast Park, Singapore",
      status: "online",
      lastUpdate: "2024-01-15 14:29"
    },
    {
      id: "S003",
      name: "Sunset Beach Monitor", 
      type: "Wave Height",
      location: "Sunset Beach, Singapore",
      status: "maintenance",
      lastUpdate: "2024-01-15 12:15"
    }
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "destructive";
      case "operator": return "secondary";
      case "viewer": return "outline";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "outline";
      case "offline": return "destructive";
      case "maintenance": return "secondary";
      case "active": return "outline";
      case "inactive": return "destructive";
      default: return "outline";
    }
  };

  const handleAddSensor = () => {
    toast({
      title: "Add Sensor",
      description: "Sensor addition form would be displayed here"
    });
  };

  const handleEditSensor = (sensorId: string) => {
    toast({
      title: "Edit Sensor", 
      description: `Editing sensor ${sensorId}`
    });
  };

  const handleDeleteSensor = (sensorId: string) => {
    toast({
      title: "Delete Sensor",
      description: `Sensor ${sensorId} deletion would be confirmed here`,
      variant: "destructive"
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-8 w-8" />
          System Administration
        </h1>
      </div>

      <Tabs defaultValue="sensors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sensors">Sensor Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="sensors" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sensor Configuration</CardTitle>
              <Button onClick={handleAddSensor}>
                <Plus className="h-4 w-4 mr-2" />
                Add Sensor
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sensor ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sensors.map((sensor) => (
                    <TableRow key={sensor.id}>
                      <TableCell className="font-mono">{sensor.id}</TableCell>
                      <TableCell className="font-medium">{sensor.name}</TableCell>
                      <TableCell>{sensor.type}</TableCell>
                      <TableCell>{sensor.location}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(sensor.status)}>
                          {sensor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {sensor.lastUpdate}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditSensor(sensor.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteSensor(sensor.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>User Access Management</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono">{user.id}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {users.filter(u => u.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">Current users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Processing</CardTitle>
                <Settings className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">Normal</div>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="refresh-rate">Data Refresh Rate (seconds)</Label>
                  <Input id="refresh-rate" defaultValue="300" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alert-threshold">Alert Threshold (meters)</Label>
                  <Input id="alert-threshold" defaultValue="2.0" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retention">Data Retention (days)</Label>
                  <Input id="retention" defaultValue="365" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-interval">Backup Interval (hours)</Label>
                  <Input id="backup-interval" defaultValue="24" />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button>Save Configuration</Button>
                <Button variant="outline">Reset to Defaults</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}