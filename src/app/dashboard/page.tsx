"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useMemo } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  Car,
  LayoutDashboard,
  Activity,
  User,
  BarChart2,
  LogOut,
  Settings,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Droplet,
  Battery,
  Map,
  Menu,
  Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import MapComponent from "@/app/components/MapComponent";
import VehicleTelemetryComponent from "@/components/VehicleTelemetryComponent";


export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVehicles, setActiveVehicles] = useState(18);
  const [idleVehicles, setIdleVehicles] = useState(4);
  const [maintenanceVehicles, setMaintenanceVehicles] = useState(2);
  const [selectedMapTab, setSelectedMapTab] = useState('all');
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState(3);
  const USE_API = false;
  // Mock data for fleet health and performance
  const fleetHealthData = {
    batteryHealth: 87,
    engineHealth: 92,
    tirePressure: 98,
    fuelLevel: 76,
    maintenanceAlerts: 3,
  };

  const performanceData = {
    fuelEfficiency: 28.5,
    speedingIncidents: 12,
    harshBraking: 8,
    optimalRoutes: 83,
  };

  const mockVehicleData = [
    { id: "V001", latitude: 40.7128, longitude: -74.0060, status: "active" },  // New York
    { id: "V002", latitude: 34.0522, longitude: -118.2437, status: "active" }, // Los Angeles
    { id: "V003", latitude: 41.8781, longitude: -87.6298, status: "idle" },    // Chicago
    { id: "V004", latitude: 29.7604, longitude: -95.3698, status: "maintenance" }, // Houston
    { id: "V005", latitude: 39.9526, longitude: -75.1652, status: "active" },  // Philadelphia
    { id: "V006", latitude: 33.4484, longitude: -112.0740, status: "idle" },   // Phoenix
    { id: "V007", latitude: 32.7767, longitude: -96.7970, status: "active" },  // Dallas
  ];

  // Filter vehicles based on selected tab
  const filteredVehicles = useMemo(() => {
    if (selectedMapTab === 'all') return mockVehicleData;
    return mockVehicleData.filter(vehicle => vehicle.status === selectedMapTab);
  }, [selectedMapTab, mockVehicleData]);


  // Handle screen resizing for sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setSidebarOpen(false);
    };
    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get user email from Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");
        // Extract name from email for avatar
        const namePart = user.email?.split('@')[0] || "";
        setUserName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!userName) return "U";
    return userName.charAt(0).toUpperCase();
  };

  return (
      <div className="flex min-h-screen bg-gray-50 text-gray-900">
        {/* Sidebar */}
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`${
                sidebarOpen ? "w-64" : "w-20"
            } fixed md:relative inset-y-0 left-0 bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col transition-all duration-300 md:block ${
                isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
            } z-50 shadow-xl`}
        >
          <div className="flex items-center justify-between p-4 border-b border-blue-700">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`flex items-center transition-all ${
                    sidebarOpen ? "justify-between w-full" : "justify-center"
                }`}
            >
              {sidebarOpen ? (
                  <>
                    <div className="flex items-center">
                      <Car className="h-6 w-6 text-blue-200" />
                      <h1 className="ml-2 text-xl font-bold text-white">EIVMS</h1>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-blue-200 hover:text-white transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  </>
              ) : (
                  <>
                    <Car className="h-6 w-6 text-blue-200" />
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="absolute right-0 mr-4 text-blue-200 hover:text-white transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
              )}
            </motion.div>
          </div>

          {/* User Profile Info */}
          <div className={`border-b border-blue-700 p-4 ${sidebarOpen ? "text-left" : "text-center"}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className={`${sidebarOpen ? "flex items-center" : "flex flex-col items-center"}`}>
                    <Avatar className="h-10 w-10 bg-blue-600 text-white">
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    {sidebarOpen && (
                        <div className="ml-3 overflow-hidden">
                          <p className="font-medium truncate">{userName || "User"}</p>
                          <p className="text-xs text-blue-200 truncate">{userEmail}</p>
                        </div>
                    )}
                  </div>
                </TooltipTrigger>
                {!sidebarOpen && (
                    <TooltipContent side="right">
                      <p className="font-medium">{userName || "User"}</p>
                      <p className="text-xs">{userEmail}</p>
                    </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>

{/* Navigation Menu */}
<nav className="flex-1 overflow-y-auto p-2 space-y-1">
  <TooltipProvider>
    <SidebarLink
      icon={<LayoutDashboard size={20} />}
      label="Dashboard"
      isActive={true}
      sidebarOpen={sidebarOpen}
      href="/dashboard"
    />
    <SidebarLink
      icon={<Activity size={20} />}
      label="Fleet Health"
      sidebarOpen={sidebarOpen}
      href="/fleethealth"
    />
    <SidebarLink
      icon={<Car size={20} />}
      label="Vehicles"
      sidebarOpen={sidebarOpen}
      href="/vehicles"
    />
    <SidebarLink
      icon={<User size={20} />}
      label="Profile"
      sidebarOpen={sidebarOpen}
      href="/profile"
    />
  </TooltipProvider>
</nav>


          <div className="p-4 border-t border-blue-700">
            <Button
                onClick={handleLogout}
                variant="ghost"
                className={`${
                    sidebarOpen ? "w-full justify-start" : "w-full justify-center"
                } text-red-100 hover:text-white hover:bg-red-700 transition-colors`}
            >
              <LogOut size={20} className="mr-2" />
              {sidebarOpen && "Logout"}
            </Button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all ${
            sidebarOpen ? "md:ml-64" : "md:ml-20"
        } ${isMobile ? "ml-0" : ""}`}>
          {/* Top Bar */}
          <header className="sticky top-0 z-40 bg-white border-b px-6 py-3 flex justify-between items-center">
            <div className="flex items-center">
              {isMobile && (
                  <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
                    <Menu size={20} />
                  </Button>
              )}
              <h2 className="text-xl font-semibold text-blue-900">Fleet Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell size={20} />
                      {notifications > 0 && (
                          <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
                            {notifications}
                          </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{notifications} unread notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Upgrade to Pro</Button>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Date and Welcome */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white p-6">
              <p className="text-blue-200">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <h1 className="text-2xl font-bold mt-1">Welcome back, {userName}</h1>
              <p className="text-blue-100 mt-1">Here's what's happening with your fleet today</p>
            </div>

            {/* Summary Cards */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <FleetStatusCard
                    title="Active Vehicles"
                    count={activeVehicles}
                    icon={<Car className="text-green-500" size={28} />}
                    color="green"
                />
                <FleetStatusCard
                    title="Idle Vehicles"
                    count={idleVehicles}
                    icon={<Car className="text-yellow-500" size={28} />}
                    color="yellow"
                />
                <FleetStatusCard
                    title="In Maintenance"
                    count={maintenanceVehicles}
                    icon={<Car className="text-red-500" size={28} />}
                    color="red"
                />
              </div>
            </div>
            <div className="px-6 pb-6">
              <VehicleTelemetryComponent/>
              </div>

            {/* Live Vehicle Tracking */}
            <div className="px-6 pb-6">
              <Card className="overflow-hidden shadow-md">
                <CardHeader className="bg-white py-4 px-6 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-blue-900">Real-Time Fleet Tracking</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                        variant={selectedMapTab === 'all' ? "default" : "outline"}
                        onClick={() => setSelectedMapTab('all')}
                        className="text-sm h-8"
                    >
                      All
                    </Button>
                    <Button
                        variant={selectedMapTab === 'active' ? "default" : "outline"}
                        onClick={() => setSelectedMapTab('active')}
                        className="text-sm h-8"
                    >
                      Active
                    </Button>
                    <Button
                        variant={selectedMapTab === 'idle' ? "default" : "outline"}
                        onClick={() => setSelectedMapTab('idle')}
                        className="text-sm h-8"
                    >
                      Idle
                    </Button>
                    <Button
                        variant={selectedMapTab === 'maintenance' ? "default" : "outline"}
                        onClick={() => setSelectedMapTab('maintenance')}
                        className="text-sm h-8"
                    >
                      Maintenance
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Map Component */}
                  <div className="relative w-full h-96 bg-gray-200">
                    <MapComponent vehicleLocations={filteredVehicles} />
                  </div>
                  <div className="flex items-center justify-center space-x-6 p-3 bg-white border-t">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Active</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Idle</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Maintenance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fleet Health and Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6">
              {/* Fleet Health Section */}
              <Card className="shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-blue-900">Fleet Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <HealthIndicator
                      icon={<Battery size={18} />}
                      label="Battery Health"
                      value={fleetHealthData.batteryHealth}
                      color={fleetHealthData.batteryHealth > 90 ? "green" : fleetHealthData.batteryHealth > 70 ? "yellow" : "red"}
                  />
                  <HealthIndicator
                      icon={<Activity size={18} />}
                      label="Engine Health"
                      value={fleetHealthData.engineHealth}
                      color={fleetHealthData.engineHealth > 90 ? "green" : fleetHealthData.engineHealth > 70 ? "yellow" : "red"}
                  />
                  <HealthIndicator
                      icon={<Droplet size={18} />}
                      label="Tire Pressure"
                      value={fleetHealthData.tirePressure}
                      color={fleetHealthData.tirePressure > 90 ? "green" : fleetHealthData.tirePressure > 70 ? "yellow" : "red"}
                  />

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2 flex items-center">
                      <AlertTriangle className="text-red-500 mr-2" size={18} />
                      Maintenance Alerts
                    </h4>
                    <div className="bg-red-50 p-3 rounded-md">
                      <p className="text-red-700 font-medium">3 vehicles require attention</p>
                      <ul className="list-disc pl-5 mt-1 text-sm text-red-600">
                        <li>Vehicle #A103 - Oil change overdue</li>
                        <li>Vehicle #B208 - Brake inspection needed</li>
                        <li>Vehicle #C315 - Battery replacement recommended</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Insights */}
              <Card className="shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-blue-900">Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <h4 className="font-medium mb-2">Fuel Efficiency (MPG)</h4>
                    <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                      <div
                          className="h-full bg-blue-600 rounded-full flex items-center"
                          style={{ width: `${(performanceData.fuelEfficiency / 40) * 100}%` }}
                      >
                        <span className="px-3 text-white font-medium">{performanceData.fuelEfficiency} MPG</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Safety Incidents (Last 30 days)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-50 p-3 rounded-md border border-orange-100">
                        <p className="text-orange-600 font-medium">Speeding</p>
                        <p className="text-2xl font-bold text-orange-700">{performanceData.speedingIncidents}</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-md border border-red-100">
                        <p className="text-red-600 font-medium">Harsh Braking</p>
                        <p className="text-2xl font-bold text-red-700">{performanceData.harshBraking}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Route Optimization</h4>
                    <div className="flex items-center">
                      <div className="h-8 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${performanceData.optimalRoutes}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 font-medium">{performanceData.optimalRoutes}%</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">Routes following optimal paths</p>

                    <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
                      <p className="text-blue-800 font-medium">AI Recommendation</p>
                      <p className="text-sm text-blue-700 mt-1">Adjusting delivery schedules to non-peak hours could save an estimated 12% in fuel costs.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}

// Sidebar Link Component with Tooltip Support and Hover Effect
// Sidebar Link Component with Tooltip Support and Hover Effect
const SidebarLink = ({ icon, label, sidebarOpen, isActive = false, href }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
          href={href}
          className={`flex items-center rounded-md px-3 py-2 transition-colors ${
              isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:text-white hover:bg-blue-700/50"
          } ${
              sidebarOpen ? "justify-start" : "justify-center"
          }`}
      >
        <span className="flex-shrink-0">{icon}</span>
        {sidebarOpen && <span className="ml-3">{label}</span>}
      </a>
    </TooltipTrigger>
    {!sidebarOpen && (
        <TooltipContent side="right">
          {label}
        </TooltipContent>
    )}
  </Tooltip>
);

// Fleet Status Card Component
const FleetStatusCard = ({ title, count, icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
    >
      <Card className={`shadow-md hover:shadow-lg transition-shadow border-l-4 ${
          color === "green" ? "border-l-green-500" :
              color === "yellow" ? "border-l-yellow-500" :
                  "border-l-red-500"
      }`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500">{title}</h3>
              <p className="text-3xl font-bold mt-1">{count}</p>
              <p className="text-sm text-gray-500 mt-1">vehicles</p>
            </div>
            <div className={`p-3 rounded-full ${
                color === "green" ? "bg-green-100" :
                    color === "yellow" ? "bg-yellow-100" :
                        "bg-red-100"
            }`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
);

// Health Indicator Component
const HealthIndicator = ({ icon, label, value, color }) => (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
        <span className={`mr-2 ${
            color === "green" ? "text-green-500" :
                color === "yellow" ? "text-yellow-500" :
                    "text-red-500"
        }`}>{icon}</span>
          <span className="text-gray-700">{label}</span>
        </div>
        <span className={`font-medium ${
            color === "green" ? "text-green-600" :
                color === "yellow" ? "text-yellow-600" :
                    "text-red-600"
        }`}>{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
            className={`h-full rounded-full ${
                color === "green" ? "bg-green-500" :
                    color === "yellow" ? "bg-yellow-500" :
                        "bg-red-500"
            }`}
            style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
);