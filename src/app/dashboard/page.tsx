"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useMemo } from "react";
import {
  FiLogOut,
  FiSettings,
  FiUser,
  FiBarChart2,
  FiHome,
  FiMenu,
  FiMap,
  FiTruck,
  FiActivity,
  FiAlertTriangle,
  FiDroplet,
  FiBattery
} from "react-icons/fi";
import MapComponent from "@/app/components/MapComponent";
import {AiFillCar} from "react-icons/ai";

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVehicles, setActiveVehicles] = useState(18);
  const [idleVehicles, setIdleVehicles] = useState(4);
  const [maintenanceVehicles, setMaintenanceVehicles] = useState(2);
  const [selectedMapTab, setSelectedMapTab] = useState('all');

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

  const handleLogout = () => {
    router.push("/");
  };

  return (
      <div className="flex min-h-screen bg-gray-100 text-gray-900">
        {/* Sidebar */}
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`${
                sidebarOpen ? "w-64" : "w-20"
            } fixed md:relative inset-y-0 left-0 bg-[#1E1E1E] text-white p-5 flex flex-col transition-all duration-300 md:block ${
                isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
            } z-50`}
        >
          <div className="flex items-center justify-between">
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`text-xl font-semibold tracking-wide transition-all ${
                    sidebarOpen ? "block" : "hidden"
                }`}
            >
              AUTOWISE
            </motion.h1>
            <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white"
            >
              <FiMenu size={24} />
            </motion.button>
          </div>

          <nav className="mt-8 space-y-4">
            <SidebarLink icon={<FiHome />} label="Home" sidebarOpen={sidebarOpen} />
            <SidebarLink icon={<FiBarChart2 />} label="Analytics" sidebarOpen={sidebarOpen} />
            <SidebarLink icon={<FiMap />} label="Live Tracking" sidebarOpen={sidebarOpen} />
            <SidebarLink icon={<FiTruck />} label="Fleet Health" sidebarOpen={sidebarOpen} />
            <SidebarLink icon={<FiActivity />} label="Performance" sidebarOpen={sidebarOpen} />
            <SidebarLink icon={<FiUser />} label="Profile" sidebarOpen={sidebarOpen} />
            <SidebarLink icon={<FiSettings />} label="Settings" sidebarOpen={sidebarOpen} />
            <SidebarLink icon={<AiFillCar />} label="Vehicles" sidebarOpen={sidebarOpen} />

          </nav>

          <motion.div whileHover={{ scale: 1.05 }} className="mt-auto">
            <Button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-white bg-red-600 hover:bg-red-700"
            >
              <FiLogOut /> {sidebarOpen && "Logout"}
            </Button>
          </motion.div>
        </motion.aside>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all ${
            sidebarOpen ? "md:ml-64" : "md:ml-20"
        } ${isMobile ? "ml-0" : ""}`}>
          {/* Top Bar */}
          <header className="p-5 bg-white shadow flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Fleet Dashboard</h2>
            <div className="flex items-center space-x-4">
              <Button className="bg-black text-white">Upgrade Plan</Button>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FiUser className="text-gray-600 text-xl" />
              </div>
            </div>
          </header>

          {/* Summary Cards */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Fleet Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <FleetStatusCard
                  title="Active Vehicles"
                  count={activeVehicles}
                  icon={<FiTruck className="text-green-500 text-4xl" />}
                  color="green"
              />
              <FleetStatusCard
                  title="Idle Vehicles"
                  count={idleVehicles}
                  icon={<FiTruck className="text-yellow-500 text-4xl" />}
                  color="yellow"
              />
              <FleetStatusCard
                  title="In Maintenance"
                  count={maintenanceVehicles}
                  icon={<FiTruck className="text-red-500 text-4xl" />}
                  color="red"
              />
            </div>
          </div>

          {/* Live Vehicle Tracking */}
          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Real-Time Vehicle Tracking</h3>
                <div className="flex space-x-2">
                  <Button
                      variant={selectedMapTab === 'all' ? "default" : "outline"}
                      onClick={() => setSelectedMapTab('all')}
                      className="text-sm"
                  >
                    All
                  </Button>
                  <Button
                      variant={selectedMapTab === 'active' ? "default" : "outline"}
                      onClick={() => setSelectedMapTab('active')}
                      className="text-sm"
                  >
                    Active
                  </Button>
                  <Button
                      variant={selectedMapTab === 'idle' ? "default" : "outline"}
                      onClick={() => setSelectedMapTab('idle')}
                      className="text-sm"
                  >
                    Idle
                  </Button>
                  <Button
                      variant={selectedMapTab === 'maintenance' ? "default" : "outline"}
                      onClick={() => setSelectedMapTab('maintenance')}
                      className="text-sm"
                  >
                    Maintenance
                  </Button>
                </div>
              </div>
              {/* Map Component - Integrated */}
              <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-2">
                <MapComponent vehicleLocations={filteredVehicles} />
              </div>
              <div className="flex items-center justify-center space-x-6">
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
            </div>
          </div>

          {/* Fleet Health and Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6">
            {/* Fleet Health Section */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-4">Fleet Health</h3>
              <div className="space-y-4">
                <HealthIndicator
                    icon={<FiBattery />}
                    label="Battery Health"
                    value={fleetHealthData.batteryHealth}
                    color={fleetHealthData.batteryHealth > 90 ? "green" : fleetHealthData.batteryHealth > 70 ? "yellow" : "red"}
                />
                <HealthIndicator
                    icon={<FiActivity />}
                    label="Engine Health"
                    value={fleetHealthData.engineHealth}
                    color={fleetHealthData.engineHealth > 90 ? "green" : fleetHealthData.engineHealth > 70 ? "yellow" : "red"}
                />
                <HealthIndicator
                    icon={<FiDroplet />}
                    label="Tire Pressure"
                    value={fleetHealthData.tirePressure}
                    color={fleetHealthData.tirePressure > 90 ? "green" : fleetHealthData.tirePressure > 70 ? "yellow" : "red"}
                />

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FiAlertTriangle className="text-red-500 mr-2" />
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
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-4">Performance Insights</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Fuel Efficiency (MPG)</h4>
                  <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(performanceData.fuelEfficiency / 40) * 100}%` }}>
                      <span className="px-2 text-white">{performanceData.fuelEfficiency} MPG</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Safety Incidents (Last 30 days)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-3 rounded-md">
                      <p className="text-orange-600">Speeding</p>
                      <p className="text-2xl font-bold text-orange-700">{performanceData.speedingIncidents}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-md">
                      <p className="text-red-600">Harsh Braking</p>
                      <p className="text-2xl font-bold text-red-700">{performanceData.harshBraking}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Route Optimization</h4>
                  <div className="flex items-center">
                    <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${performanceData.optimalRoutes}%` }}></div>
                    </div>
                    <span className="ml-2 font-medium">{performanceData.optimalRoutes}%</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">Routes following optimal paths</p>

                  <div className="mt-4 bg-blue-50 p-3 rounded-md">
                    <p className="text-blue-700 font-medium">AI Recommendation</p>
                    <p className="text-sm text-blue-600 mt-1">Adjusting delivery schedules to non-peak hours could save an estimated 12% in fuel costs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

// Sidebar Link Component with Tooltip Support and Hover Effect
const SidebarLink = ({ icon, label, sidebarOpen }) => (
    <motion.div
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        className="relative group rounded-md transition-all"
    >
      <a href="#" className="flex items-center gap-4 p-3 rounded-md transition-all hover:bg-gray-800">
        {icon}
        {sidebarOpen && <span>{label}</span>}
      </a>
      {!sidebarOpen && (
          <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-12 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50"
          >
            {label}
          </motion.span>
      )}
    </motion.div>
);

// Fleet Status Card Component
const FleetStatusCard = ({ title, count, icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Card className="shadow-md bg-white border-l-4" style={{ borderLeftColor: color === "green" ? "#10B981" : color === "yellow" ? "#F59E0B" : "#EF4444" }}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{count}</p>
          <p className="text-sm text-gray-500">vehicles</p>
        </CardContent>
      </Card>
    </motion.div>
);

// Health Indicator Component
const HealthIndicator = ({ icon, label, value, color }) => (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">{icon}</span>
          <span>{label}</span>
        </div>
        <span className={`font-medium ${
            color === "green" ? "text-green-600" : color === "yellow" ? "text-yellow-600" : "text-red-600"
        }`}>{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
            className={`h-full rounded-full ${
                color === "green" ? "bg-green-500" : color === "yellow" ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
);