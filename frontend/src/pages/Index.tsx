import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Waves, AlertTriangle, Activity, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Waves className="h-16 w-16 text-primary animate-pulse" />
            <h1 className="text-5xl font-bold text-foreground">CoastalWatch</h1>
          </div>
          
          <p className="text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Advanced coastal monitoring system protecting communities through real-time environmental surveillance and early warning systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/dashboard">
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Current Status Overview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Current Coastal Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-destructive">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">2</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sensors Online</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">25</div>
                <p className="text-xs text-muted-foreground">All operational</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Water Level</CardTitle>
                <Waves className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">1.2m</div>
                <p className="text-xs text-muted-foreground">Within normal range</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">Operational</div>
                <p className="text-xs text-muted-foreground">All systems normal</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-destructive/20">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium">High water level detected at Marina Bay</p>
                  <p className="text-sm text-muted-foreground">2.3m above normal - 15 minutes ago</p>
                </div>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-secondary/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <div>
                  <p className="font-medium">Unusual wave patterns at Sunset Beach</p>
                  <p className="text-sm text-muted-foreground">Monitor continuing - 45 minutes ago</p>
                </div>
              </div>
              <Badge variant="secondary">Warning</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">All East Coast sensors online</p>
                  <p className="text-sm text-muted-foreground">System check completed - 2 hours ago</p>
                </div>
              </div>
              <Badge variant="outline">Normal</Badge>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/alerts">View All Alerts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/dashboard">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5 text-primary" />
                    Live Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Monitor real-time coastal conditions and sensor data</p>
                </CardContent>
              </Link>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/sensors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Sensor Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Detailed sensor information and historical data</p>
                </CardContent>
              </Link>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/alerts">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Alert History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Review past alerts and system responses</p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
