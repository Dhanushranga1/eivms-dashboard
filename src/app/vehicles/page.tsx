"use client";

import { useRouter, usePathname } from "next/navigation";
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
    FiBattery,
    FiPlus,
    FiEdit,
    FiTrash2
} from "react-icons/fi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MapComponent from "@/app/components/MapComponent";

export default function VehiclesPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedMapTab, setSelectedMapTab] = useState('all');

    const mockVehicleData = [
        { id: "V001", latitude: 40.7128, longitude: -74.0060, status: "active", driver: "John Doe", lastService: "2024-02-15" },
        { id: "V002", latitude: 34.0522, longitude: -118.2437, status: "active", driver: "Jane Smith", lastService: "2024-02-10" },
        { id: "V003", latitude: 41.8781, longitude: -87.6298, status: "idle", driver: "N/A", lastService: "2024-01-20" },
        { id: "V004", latitude: 29.7604, longitude: -95.3698, status: "maintenance", driver: "Mike Johnson", lastService: "2024-03-01" },
    ];

    const filteredVehicles = useMemo(() => {
        if (selectedMapTab === 'all') return mockVehicleData;
        return mockVehicleData.filter(vehicle => vehicle.status === selectedMapTab);
    }, [selectedMapTab]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) setSidebarOpen(false);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        router.push("/");
    };

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900">
            {/* Sidebar - Updated to match Dashboard */}
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
                                    <h1 className="ml-2 text-xl font-bold text-white">EIVMS</h1>
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

                {/* User Profile Info - Placeholder for consistency */}
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

                {/* Navigation Menu - Updated to match Dashboard */}
                <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                    <TooltipProvider>
                        <SidebarLink
                            icon={<FiHome size={20} />}
                            label="Dashboard"
                            isActive={pathname === "/dashboard"}
                            sidebarOpen={sidebarOpen}
                            href="/dashboard"
                        />
                        <SidebarLink
                            icon={<FiActivity size={20} />}
                            label="Fleet Health"
                            isActive={pathname === "/fleethealth"}
                            sidebarOpen={sidebarOpen}
                            href="/fleethealth"
                        />
                        <SidebarLink
                            icon={<FiTruck size={20} />}
                            label="Vehicles"
                            isActive={pathname === "/vehicles"}
                            sidebarOpen={sidebarOpen}
                            href="/vehicles"
                        />
                        <SidebarLink
                            icon={<FiUser size={20} />}
                            label="Profile"
                            isActive={pathname === "/profile"}
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
                        <FiLogOut size={20} className="mr-2" />
                        {sidebarOpen && "Logout"}
                    </Button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all ${sidebarOpen ? "md:ml-64" : "md:ml-20"} ${isMobile ? "ml-0" : ""}`}>
                <header className="sticky top-0 z-40 bg-white border-b px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        {isMobile && (
                            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
                                <FiMenu size={20} />
                            </Button>
                        )}
                        <h2 className="text-xl font-semibold text-blue-900">Fleet Management</h2>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                        <FiPlus size={16} />
                        Add Vehicle
                    </Button>
                </header>

                {/* Vehicle List */}
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Vehicle Overview</h3>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-3">Vehicle ID</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Driver</th>
                                <th className="p-3">Last Service</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mockVehicleData.map(vehicle => (
                                <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{vehicle.id}</td>
                                    <td className="p-3">
                                      <span className={`px-2 py-1 rounded-md text-sm font-medium ${
                                          vehicle.status === "active" ? "bg-green-100 text-green-600" : 
                                          vehicle.status === "idle" ? "bg-yellow-100 text-yellow-600" : 
                                          "bg-red-100 text-red-600"
                                      }`}>
                                        {vehicle.status}
                                      </span>
                                    </td>
                                    <td className="p-3">{vehicle.driver}</td>
                                    <td className="p-3">{vehicle.lastService}</td>
                                    <td className="p-3 flex justify-center space-x-2">
                                        <Button size="sm" variant="outline"><FiEdit /></Button>
                                        <Button size="sm" variant="outline"><FiTrash2 className="text-red-500" /></Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Live Vehicle Tracking */}
                <div className="px-6 pb-6">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-semibold mb-4">Live Vehicle Tracking</h3>
                        <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-2">
                            <MapComponent vehicleLocations={filteredVehicles} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sidebar Link Component with Tooltip Support and Hover Effect - Matches Dashboard
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