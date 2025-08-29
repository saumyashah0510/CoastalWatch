import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Waves, 
  Shield, 
  Users, 
  Mail, 
  Phone, 
  ExternalLink,
  Target,
  Eye,
  Heart
} from "lucide-react";

export default function About() {
  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Waves className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">CoastalWatch</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced coastal monitoring system protecting communities through real-time environmental surveillance and early warning systems.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <Target className="h-8 w-8 text-primary mx-auto" />
            <CardTitle>Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              To provide comprehensive coastal monitoring solutions that protect lives, property, and ecosystems through cutting-edge technology and real-time data analysis.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Eye className="h-8 w-8 text-primary mx-auto" />
            <CardTitle>Vision</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              A world where coastal communities are equipped with the knowledge and tools necessary to respond effectively to environmental threats and climate change.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Heart className="h-8 w-8 text-primary mx-auto" />
            <CardTitle>Values</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Innovation, reliability, community safety, environmental stewardship, and transparency in all our operations and communications.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            CoastalWatch represents a collaborative effort between environmental scientists, technology experts, and local authorities 
            to create a comprehensive coastal monitoring network. Our system integrates multiple sensor technologies to provide 
            real-time data on water levels, wave patterns, weather conditions, and potential environmental threats.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  Real-time sensor monitoring
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  Automated alert system
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  Interactive dashboard
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  Historical data analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  Mobile-responsive design
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
                <Badge variant="outline">Mapbox GL</Badge>
                <Badge variant="outline">WebSocket</Badge>
                <Badge variant="outline">IoT Sensors</Badge>
                <Badge variant="outline">Real-time Analytics</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources & Partners */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sources & Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Data Sources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• IoT water level sensors</li>
                <li>• Wave measurement buoys</li>
                <li>• Weather monitoring stations</li>
                <li>• Satellite imagery integration</li>
                <li>• Tide gauge networks</li>
                <li>• Environmental quality sensors</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Key Partners</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• National Environmental Agency</li>
                <li>• Maritime and Port Authority</li>
                <li>• Local Research Universities</li>
                <li>• Community Emergency Response Teams</li>
                <li>• International Climate Organizations</li>
                <li>• Technology Integration Partners</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Use */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use the System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">For General Users</h3>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Access the Dashboard to view current conditions</li>
                <li>2. Monitor active alerts and warnings</li>
                <li>3. Click on sensor markers for detailed information</li>
                <li>4. Review historical data and trends</li>
                <li>5. Enable notifications for important alerts</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">For Emergency Responders</h3>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Monitor real-time threat levels</li>
                <li>2. Access detailed sensor data and analytics</li>
                <li>3. Coordinate response using alert management</li>
                <li>4. Generate reports for incident documentation</li>
                <li>5. Manage system configurations and thresholds</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">How often is the data updated?</h4>
              <p className="text-muted-foreground">
                Sensor data is updated every 5 minutes during normal conditions and every minute during alert situations. 
                The system provides real-time updates through WebSocket connections.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">What triggers an alert?</h4>
              <p className="text-muted-foreground">
                Alerts are triggered when sensor readings exceed predefined thresholds, unusual patterns are detected, 
                or when multiple sensors indicate a developing threat situation.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Can I access historical data?</h4>
              <p className="text-muted-foreground">
                Yes, the system maintains comprehensive historical records. Users can access data going back up to 5 years 
                for analysis and reporting purposes.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Is the system mobile-friendly?</h4>
              <p className="text-muted-foreground">
                Absolutely! The system is fully responsive and optimized for mobile devices, tablets, and desktop computers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Contact & Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Technical Support</p>
                  <p className="text-muted-foreground">support@coastalwatch.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Emergency Hotline</p>
                  <p className="text-muted-foreground">+65 6XXX-XXXX (24/7)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Admin Access</p>
                  <p className="text-muted-foreground">admin@coastalwatch.com</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Documentation Portal
              </Button>
              
              <Button className="w-full" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Community Forum
              </Button>
              
              <Button className="w-full" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}