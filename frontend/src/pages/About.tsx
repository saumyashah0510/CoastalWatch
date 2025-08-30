import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

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
  // Initialize particle engine
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Particle configuration (same as Index.tsx)
  const particlesOptions = {
    background: {
      color: {
        value: "#0a192f",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.7,
          },
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
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
        outModes: {
          default: "out",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
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

      {/* About Content */}
      <div className="relative p-6 space-y-6 z-10">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Waves className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">CoastalWatch</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Advanced coastal monitoring system protecting communities through real-time 
            environmental surveillance and early warning systems.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900/50 text-white shadow-lg">
            <CardHeader className="text-center">
              <Target className="h-8 w-8 text-primary mx-auto" />
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-blue-200">
              To provide comprehensive coastal monitoring solutions that protect lives, 
              property, and ecosystems through cutting-edge technology and real-time data analysis.
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 text-white shadow-lg">
            <CardHeader className="text-center">
              <Eye className="h-8 w-8 text-primary mx-auto" />
              <CardTitle>Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-blue-200">
              A world where coastal communities are equipped with the knowledge and tools 
              necessary to respond effectively to environmental threats and climate change.
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 text-white shadow-lg">
            <CardHeader className="text-center">
              <Heart className="h-8 w-8 text-primary mx-auto" />
              <CardTitle>Values</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-blue-200">
              Innovation, reliability, community safety, environmental stewardship, and transparency 
              in all our operations and communications.
            </CardContent>
          </Card>
        </div>

        {/* Project Overview */}
        <Card className="bg-slate-900/50 text-white shadow-lg">
          <CardHeader>
            <Shield className="h-6 w-6 text-primary inline-block mr-2" />
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-200">
            CoastalWatch integrates sensor networks, satellite data, and machine learning models 
            to monitor coastal regions for threats including:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Storm surges and extreme weather</li>
              <li>Coastal erosion and flooding risks</li>
              <li>Marine pollution and illegal activities</li>
              <li>Blue carbon ecosystem degradation</li>
            </ul>
          </CardContent>
        </Card>

        {/* Partners */}
        <Card className="bg-slate-900/50 text-white shadow-lg">
          <CardHeader>
            <Users className="h-6 w-6 text-primary inline-block mr-2" />
            <CardTitle>Inspiration</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Badge variant="secondary">NOAA</Badge>
            <Badge variant="secondary">NASA Earth Science</Badge>
            <Badge variant="secondary">Local Coastal Authorities</Badge>
            <Badge variant="secondary">International NGOs</Badge>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-slate-900/50 text-white shadow-lg">
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-200 space-y-4">
            <div>
              <p className="font-semibold text-white">How does CoastalWatch detect threats?</p>
              <p>Through AI models analyzing real-time data from satellites, sensors, and historical records.</p>
            </div>
            <div>
              <p className="font-semibold text-white">Who can access the alerts?</p>
              <p>Coastal authorities, government agencies, and registered community organizations.</p>
            </div>
            <div>
              <p className="font-semibold text-white">Is the system scalable?</p>
              <p>Yes, it is designed to be deployed across global coastal regions with modular integration.</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-slate-900/50 text-white shadow-lg">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-blue-200">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" /> support@coastalwatch.org
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" /> +1 (234) 567-890
            </div>
            <Button variant="outline" className="flex items-center gap-2 mt-3">
              Visit Website <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}