"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiLogOut, FiSettings, FiUser, FiBarChart2, FiHome, FiMenu } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive sidebar behavior
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
      
      {/* Sidebar with Framer Motion for Smooth Animations */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } fixed md:relative inset-y-0 left-0 bg-[#1E1E1E] text-white p-5 flex flex-col transition-all duration-300 md:block ${
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
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
          <SidebarLink icon={<FiUser />} label="Profile" sidebarOpen={sidebarOpen} />
          <SidebarLink icon={<FiSettings />} label="Settings" sidebarOpen={sidebarOpen} />
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
      <div className="flex-1 flex flex-col ml-0 md:ml-20 lg:ml-64 transition-all">
        
        {/* Top Bar */}
        <header className="p-5 bg-white shadow flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Button className="bg-black text-white">Upgrade Plan</Button>
            <FiUser className="text-gray-600 text-2xl" />
          </div>
        </header>

        {/* Content */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: AI Insights */}
          <DashboardCard
            title="AI Insights"
            description="Your AI-powered analytics are ready"
            icon={<FiBarChart2 className="text-blue-500 text-4xl" />}
          />

          {/* Card 2: User Engagement */}
          <DashboardCard
            title="User Engagement"
            description="Users actively engaging this week"
            icon={<FiUser className="text-green-500 text-4xl" />}
          />

          {/* Card 3: System Health */}
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
const SidebarLink = ({ icon, label, sidebarOpen }: { icon: React.ReactNode; label: string; sidebarOpen: boolean }) => (
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
        className="absolute left-12 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {label}
      </motion.span>
    )}
  </motion.div>
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
