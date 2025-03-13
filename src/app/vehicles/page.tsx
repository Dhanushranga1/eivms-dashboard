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
    FiBattery,
    FiPlus,
    FiEdit,
    FiTrash2
} from "react-icons/fi";
import MapComponent from "@/app/components/MapComponent";

export default function VehiclesPage() {
    const router = useRouter();
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
        <div className="flex min-h-screen bg-gray-100 text-gray-900">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`${sidebarOpen ? "w-64" : "w-20"} fixed md:relative inset-y-0 left-0 bg-[#1E1E1E] text-white p-5 flex flex-col transition-all duration-300 md:block ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"} z-50`}
            >
                <div className="flex items-center justify-between">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={`text-xl font-semibold tracking-wide transition-all ${sidebarOpen ? "block" : "hidden"}`}
                    >
                        AUTOWISE
                    </motion.h1>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
                        <FiMenu size={24} />
                    </motion.button>
                </div>

                <nav className="mt-8 space-y-4">
                    <SidebarLink icon={<FiHome />} label="Home" sidebarOpen={sidebarOpen} />
                    <SidebarLink icon={<FiBarChart2 />} label="Analytics" sidebarOpen={sidebarOpen} />
                    <SidebarLink icon={<FiMap />} label="Live Tracking" sidebarOpen={sidebarOpen} />
                    <SidebarLink icon={<FiTruck />} label="Fleet Management" sidebarOpen={sidebarOpen} />
                    <SidebarLink icon={<FiActivity />} label="Performance" sidebarOpen={sidebarOpen} />
                    <SidebarLink icon={<FiUser />} label="Profile" sidebarOpen={sidebarOpen} />
                    <SidebarLink icon={<FiSettings />} label="Settings" sidebarOpen={sidebarOpen} />
                </nav>

                <motion.div whileHover={{ scale: 1.05 }} className="mt-auto">
                    <Button onClick={handleLogout} className="flex items-center gap-2 w-full text-white bg-red-600 hover:bg-red-700">
                        <FiLogOut /> {sidebarOpen && "Logout"}
                    </Button>
                </motion.div>
            </motion.aside>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all ${sidebarOpen ? "md:ml-64" : "md:ml-20"} ${isMobile ? "ml-0" : ""}`}>
                <header className="p-5 bg-white shadow flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Fleet Management</h2>
                    <Button className="bg-green-600 text-white flex items-center gap-2">
                        <FiPlus />
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
                      <span className={`px-2 py-1 rounded-md text-sm font-medium ${vehicle.status === "active" ? "bg-green-100 text-green-600" : vehicle.status === "idle" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>
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

// Sidebar Link Component
const SidebarLink = ({ icon, label, sidebarOpen }) => (
    <motion.div whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }} className="relative group rounded-md transition-all">
        <a href="#" className="flex items-center gap-4 p-3 rounded-md transition-all hover:bg-gray-800">{icon} {sidebarOpen && <span>{label}</span>}</a>
    </motion.div>
);

