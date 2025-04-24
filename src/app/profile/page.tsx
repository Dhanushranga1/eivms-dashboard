"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  FiLogOut,
  FiSettings,
  FiUser,
  FiBarChart2,
  FiHome,
  FiMenu,
  FiTruck
} from "react-icons/fi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import io from "socket.io-client";

// Connect to backend WebSocket
const socket = io("http://localhost:5000"); // Change URL if deployed

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);

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

  // Handle real-time analytics updates
  useEffect(() => {
    socket.on("newAnalytics", (data) => {
      setActiveUsers(data.users);
    });

    return () => {
      socket.off("newAnalytics");
    };
  }, []);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar - Updated to match VehiclesPage */}
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
                  <FiTruck className="h-6 w-6 text-blue-200" />
                  <h1 className="ml-2 text-xl font-bold text-white">AUTOWISE</h1>
                </div>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  <FiMenu size={20} />
                </button>
              </>
            ) : (
              <>
                <FiTruck className="h-6 w-6 text-blue-200" />
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="absolute right-0 mr-4 text-blue-200 hover:text-white transition-colors"
                >
                  <FiMenu size={20} />
                </button>
              </>
            )}
          </motion.div>
        </div>

        {/* User Profile Info */}
        <div className={`border-b border-blue-700 p-4 ${sidebarOpen ? "text-left" : "text-center"}`}>
          <div className={`${sidebarOpen ? "flex items-center" : "flex flex-col items-center"}`}>
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <FiUser size={20} />
            </div>
            {sidebarOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="font-medium truncate">Admin User</p>
                <p className="text-xs text-blue-200 truncate">admin@example.com</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          <TooltipProvider>
            <SidebarLink
              icon={<FiHome size={20} />}
              label="Home"
              isActive={pathname === "/dashboard"}
              sidebarOpen={sidebarOpen}
              href="/dashboard"
            />
            <SidebarLink
              icon={<FiBarChart2 size={20} />}
              label="Analytics"
              isActive={pathname === "/analytics"}
              sidebarOpen={sidebarOpen}
              href="/analytics"
            />
            <SidebarLink
              icon={<FiUser size={20} />}
              label="Profile"
              isActive={pathname === "/profile"}
              sidebarOpen={sidebarOpen}
              href="/profile"
            />
            <SidebarLink
              icon={<FiSettings size={20} />}
              label="Settings"
              isActive={pathname === "/settings"}
              sidebarOpen={sidebarOpen}
              href="/settings"
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
            <FiLogOut size={20} className="mr-2" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all ${sidebarOpen ? "md:ml-64" : "md:ml-20"} ${isMobile ? "ml-0" : ""}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white border-b px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
                <FiMenu size={20} />
              </Button>
            )}
            <h2 className="text-xl font-semibold text-blue-900">Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Upgrade Plan</Button>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <FiUser className="text-gray-600" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Real-Time Active Users */}
          <DashboardCard
            title="Active Users"
            description={`Currently online: ${activeUsers}`}
            icon={<FiUser className="text-green-500 text-4xl" />}
          />

          {/* AI Insights */}
          <DashboardCard
            title="AI Insights"
            description="Your AI-powered analytics are ready"
            icon={<FiBarChart2 className="text-blue-500 text-4xl" />}
          />

          {/* System Health */}
          <DashboardCard
            title="System Health"
            description="Everything is running smoothly"
            icon={<FiSettings className="text-yellow-500 text-4xl" />}
          />
        </main>
      </div>
    </div>
  );
}

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

// Dashboard Card Component with Smooth Fade-in Animation
const DashboardCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    <Card className="shadow-md bg-white">
      <CardHeader className="flex items-center space-x-4">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);