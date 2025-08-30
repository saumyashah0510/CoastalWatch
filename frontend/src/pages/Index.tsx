import { useCallback } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Waves, AlertTriangle, Activity, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  // This function loads the particles engine
  const particlesInit = useCallback(async (engine: Engine) => {
    // You can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // This loads the tsparticles package bundle, it's a must to load the engine to prevent bugs
    await loadSlim(engine);
  }, []);

  // This is the configuration for the particle effect
  const particlesOptions = {
    background: {
      color: {
        value: "#0a192f", // A deep navy blue, acts as the base background
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab", // Creates a "grab" effect on hover
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
        value: "#ffffff", // Particle color
      },
      links: {
        color: "#ffffff", // Line color connecting particles
        distance: 150,
        enable: true,
        opacity: 0.2, // Subtle lines
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: false,
        speed: 1, // Slow, gentle movement
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80, // Number of particles
      },
      opacity: {
        value: 0.3, // Make particles semi-transparent
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 }, // Small, varied particle sizes
      },
    },
    detectRetina: true,
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a192f]">
      {/* The Particles component is placed here, acting as the background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* All content sections are now relative with a z-index to sit on top of the particles */}
      
      {/* Hero Section */}
      <section className="relative py-28 px-6 text-white z-10">
        <div className="max-w-4xl mx-auto text-center space-y-7">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Waves className="h-20 w-20 text-blue-300 animate-pulse" />
            <h1 className="text-6xl font-extrabold drop-shadow-lg">CoastalWatch</h1>
          </div>
          
          <p className="text-2xl text-blue-100 mb-10 max-w-2xl mx-auto drop-shadow">
            Your AI-powered guardian for the *Gujarat coastline*, providing real-time environmental surveillance and life-saving early warnings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button asChild size="xl" className="text-xl px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white">
              <Link to="/dashboard">
                View Live Dashboard
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="text-xl px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-blue-300 text-blue-300 hover:bg-blue-500/20">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Current Status Overview */}
      <section className="relative py-20 px-6 bg-black/10 backdrop-blur-sm z-10 border-t border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-14 drop-shadow-md">Current Coastal Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Cards here - using a darker, more transparent background to see particles through */}
            <Card className="border-l-4 border-destructive bg-slate-900/50 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-blue-200">Active Alerts</CardTitle>
                <AlertTriangle className="h-5 w-5 text-destructive animate-bounce" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">2</div>
                <p className="text-sm text-red-200 mt-1">Immediate attention required</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-primary bg-slate-900/50 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-blue-200">Sensors Online</CardTitle>
                <Activity className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">25</div>
                <p className="text-sm text-blue-200 mt-1">All stations operational</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-primary bg-slate-900/50 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-blue-200">Avg Water Level</CardTitle>
                <Waves className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">1.2m</div>
                <p className="text-sm text-blue-200 mt-1">Stable within averages</p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-green-500 bg-slate-900/50 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-blue-200">System Status</CardTitle>
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">Operational</div>
                <p className="text-sm text-blue-200 mt-1">All models running</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The rest of your sections (Recent Activity, Quick Navigation) will follow the same pattern... */}
      {/* Make sure each <section> has 'relative' and 'z-10' classes */}
    </div>
  );
};

export default Index;