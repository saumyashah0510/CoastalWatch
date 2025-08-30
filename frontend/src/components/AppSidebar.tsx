import { 
  Waves, 
  Map, 
  Radio, 
  AlertTriangle, 
  Info, 
  Home 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: Map },
  { title: "Sensor Details", url: "/sensors", icon: Radio },
  { title: "Alert History", url: "/alerts", icon: AlertTriangle },
  { title: "About", url: "/about", icon: Info },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    }`;

  return (
    <Sidebar
      className={`transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6 text-primary" />
            {!isCollapsed && (
              <span className="font-bold text-lg text-primary">CoastalWatch</span>
            )}
          </div>
        </div>

        {/* Nav Links */}
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      end
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
