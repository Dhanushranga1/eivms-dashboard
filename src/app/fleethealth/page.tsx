'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Battery,
    Calendar,
    Car,
    Circle,
    Droplet,
    Gauge,
    LayoutDashboard,
    Lightbulb,
    MapPin,
    Wrench
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const fleetOverview = {
    totalVehicles: 48,
    needingMaintenance: 7,
    criticalIssues: 2,
    overallHealth: 86
};

const healthMetrics = {
    batteryHealth: 92,
    engineHealth: 86,
    tirePressure: 94,
    fuelLevels: 78
};

const maintenanceAlerts = [
    { id: 'V-1023', vehicle: 'Toyota Camry', plate: 'FL-7829', issue: 'Oil Change Due', priority: 'Medium', dueIn: '3 days', cost: '$85' },
    { id: 'V-0872', vehicle: 'Ford Transit', plate: 'FL-4567', issue: 'Brake Pads Worn', priority: 'High', dueIn: '1 day', cost: '$220' },
    { id: 'V-2341', vehicle: 'Tesla Model 3', plate: 'FL-9012', issue: 'Battery Inspection', priority: 'Low', dueIn: '10 days', cost: '$75' },
    { id: 'V-1567', vehicle: 'Chevrolet Bolt', plate: 'FL-6545', issue: 'Tire Rotation', priority: 'Medium', dueIn: '5 days', cost: '$45' },
    { id: 'V-0721', vehicle: 'Mercedes Sprinter', plate: 'FL-3392', issue: 'Engine Warning Light', priority: 'Critical', dueIn: 'Immediate', cost: '$350+' },
];

const vehicles = [
    { id: 'V-1023', name: 'Toyota Camry', plate: 'FL-7829', type: 'Sedan', status: 'Active' },
    { id: 'V-0872', name: 'Ford Transit', plate: 'FL-4567', type: 'Van', status: 'Maintenance' },
    { id: 'V-2341', name: 'Tesla Model 3', plate: 'FL-9012', type: 'Electric', status: 'Active' },
    { id: 'V-1567', name: 'Chevrolet Bolt', plate: 'FL-6545', type: 'Electric', status: 'Active' },
    { id: 'V-0721', name: 'Mercedes Sprinter', plate: 'FL-3392', type: 'Van', status: 'Critical' },
    { id: 'V-1122', name: 'Honda Accord', plate: 'FL-2233', type: 'Sedan', status: 'Active' },
    { id: 'V-0991', name: 'Nissan Leaf', plate: 'FL-8843', type: 'Electric', status: 'Active' },
];

const historicalData = [
    { month: 'Jan', batteryHealth: 95, engineHealth: 88, tirePressure: 92, fuelEfficiency: 90 },
    { month: 'Feb', batteryHealth: 94, engineHealth: 87, tirePressure: 93, fuelEfficiency: 89 },
    { month: 'Mar', batteryHealth: 96, engineHealth: 90, tirePressure: 94, fuelEfficiency: 91 },
    { month: 'Apr', batteryHealth: 93, engineHealth: 85, tirePressure: 92, fuelEfficiency: 88 },
    { month: 'May', batteryHealth: 92, engineHealth: 86, tirePressure: 94, fuelEfficiency: 87 },
    { month: 'Jun', batteryHealth: 91, engineHealth: 84, tirePressure: 93, fuelEfficiency: 85 },
];

const vehicleHealthData = {
    'V-1023': {
        batteryVoltage: 12.7,
        engineTemp: 195,
        tirePressure: { fl: 32, fr: 32, rl: 30, rr: 31 },
        fuelLevel: 65,
        oilLife: 22,
        lastService: '2024-11-15',
        nextService: '2025-03-10',
        mileage: 45892,
        healthScore: 88
    },
    'V-0872': {
        batteryVoltage: 12.1,
        engineTemp: 210,
        tirePressure: { fl: 29, fr: 30, rl: 29, rr: 28 },
        fuelLevel: 42,
        oilLife: 5,
        lastService: '2024-09-22',
        nextService: '2025-03-07',
        mileage: 67541,
        healthScore: 73
    },
    'V-2341': {
        batteryVoltage: 380.5,
        engineTemp: 75,
        tirePressure: { fl: 36, fr: 36, rl: 35, rr: 35 },
        fuelLevel: null,
        oilLife: null,
        lastService: '2024-12-05',
        nextService: '2025-03-15',
        mileage: 28754,
        healthScore: 95,
        batteryLevel: 78,
        batteryRange: 241
    }
};

const aiInsights = [
    "Based on driving patterns, schedule oil changes every 4,500 miles instead of 3,000 to save $1,200 annually across the fleet",
    "Three vehicles showing early signs of alternator failure. Preventative maintenance now could avoid $4,500 in future repairs",
    "Fleet fuel efficiency has decreased 7% in cold weather - recommend checking tire pressure weekly during winter months",
    "Vehicles that received the software update are showing 12% better battery performance - schedule updates for remaining 8 vehicles",
    "Consider replacing Toyota Camry (FL-7829) within 6 months based on increasing maintenance costs exceeding asset value"
];

export default function FleetHealthPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedVehicle, setSelectedVehicle] = useState("V-1023");

    // Compute status color based on priority or health value
    const getStatusColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'low': return 'bg-green-500';
            case 'medium': return 'bg-yellow-500';
            case 'high': return 'bg-orange-500';
            case 'critical': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getHealthColor = (value) => {
        if (value >= 80) return 'text-green-500';
        if (value >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getProgressColor = (value) => {
        if (value >= 80) return 'bg-green-500';
        if (value >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    // Calculate days since last service for the selected vehicle
    const calculateDaysSinceService = (lastServiceDate) => {
        if (!lastServiceDate) return "Unknown";
        const lastService = new Date(lastServiceDate);
        const today = new Date();
        const diffTime = Math.abs(today - lastService);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days ago`;
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Fleet Health</h1>
                    <p className="text-gray-500">Monitor and manage the health status of your entire fleet</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Maintenance
                    </Button>
                    <Button>
                        <Wrench className="mr-2 h-4 w-4" />
                        Maintenance Reports
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="vehicles">
                        <Car className="mr-2 h-4 w-4" />
                        Vehicle Reports
                    </TabsTrigger>
                    <TabsTrigger value="insights">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        AI Insights
                    </TabsTrigger>
                    <TabsTrigger value="map">
                        <MapPin className="mr-2 h-4 w-4" />
                        Fleet Map
                    </TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-6">
                    {/* Health Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Battery Health</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <Battery className={`h-10 w-10 ${getHealthColor(healthMetrics.batteryHealth)}`} />
                                    <div className="text-2xl font-bold">{healthMetrics.batteryHealth}%</div>
                                </div>
                                <Progress className="mt-2" value={healthMetrics.batteryHealth} />
                                <p className="mt-2 text-xs text-gray-500">2 vehicles need battery check</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Engine Health</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <Gauge className={`h-10 w-10 ${getHealthColor(healthMetrics.engineHealth)}`} />
                                    <div className="text-2xl font-bold">{healthMetrics.engineHealth}%</div>
                                </div>
                                <Progress className="mt-2" value={healthMetrics.engineHealth} />
                                <p className="mt-2 text-xs text-gray-500">5 vehicles due for service</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Tire Pressure</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <Circle className={`h-10 w-10 ${getHealthColor(healthMetrics.tirePressure)}`} />
                                    <div className="text-2xl font-bold">{healthMetrics.tirePressure}%</div>
                                </div>
                                <Progress className="mt-2" value={healthMetrics.tirePressure} />
                                <p className="mt-2 text-xs text-gray-500">1 vehicle needs inflation</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Fuel Levels</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <Droplet className={`h-10 w-10 ${getHealthColor(healthMetrics.fuelLevels)}`} />
                                    <div className="text-2xl font-bold">{healthMetrics.fuelLevels}%</div>
                                </div>
                                <Progress className="mt-2" value={healthMetrics.fuelLevels} />
                                <p className="mt-2 text-xs text-gray-500">3 vehicles below 25% fuel</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Fleet Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Maintenance Alerts</CardTitle>
                                <CardDescription>Vehicles requiring attention in the next 14 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {maintenanceAlerts.map((alert) => (
                                        <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${getStatusColor(alert.priority)}`}></div>
                                                <div>
                                                    <p className="font-medium">{alert.vehicle} ({alert.plate})</p>
                                                    <p className="text-sm text-gray-500">{alert.issue}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant={alert.priority.toLowerCase() === 'critical' ? "destructive" : "outline"}>
                                                    {alert.priority}
                                                </Badge>
                                                <p className="text-sm mt-1">Due: {alert.dueIn}</p>
                                                <p className="text-sm font-medium">{alert.cost}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Fleet Health Summary</CardTitle>
                                <CardDescription>Overall status across all vehicles</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Overall Fleet Health</span>
                                            <span className={`text-sm font-medium ${getHealthColor(fleetOverview.overallHealth)}`}>
                        {fleetOverview.overallHealth}%
                      </span>
                                        </div>
                                        <Progress
                                            value={fleetOverview.overallHealth}
                                            className={getProgressColor(fleetOverview.overallHealth)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold">{fleetOverview.totalVehicles}</span>
                                            <span className="text-xs text-gray-500">Total Vehicles</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold">{fleetOverview.needingMaintenance}</span>
                                            <span className="text-xs text-gray-500">Need Maintenance</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-red-500">{fleetOverview.criticalIssues}</span>
                                            <span className="text-xs text-gray-500">Critical Issues</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-green-500">41</span>
                                            <span className="text-xs text-gray-500">Healthy Vehicles</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <h4 className="text-sm font-medium mb-2">Maintenance History</h4>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <BarChart data={historicalData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="engineHealth" fill="#4ade80" name="Engine Health" />
                                                <Bar dataKey="batteryHealth" fill="#60a5fa" name="Battery Health" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* VEHICLE REPORTS TAB */}
                <TabsContent value="vehicles" className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Individual Vehicle Reports</h2>
                            <p className="text-sm text-gray-500">View detailed diagnostics for each vehicle</p>
                        </div>
                        <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select Vehicle" />
                            </SelectTrigger>
                            <SelectContent>
                                {vehicles.map(vehicle => (
                                    <SelectItem key={vehicle.id} value={vehicle.id}>
                                        {vehicle.name} ({vehicle.plate})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {vehicleHealthData[selectedVehicle] && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <Gauge className={`h-10 w-10 ${getHealthColor(vehicleHealthData[selectedVehicle].healthScore)}`} />
                                            <div className="text-2xl font-bold">{vehicleHealthData[selectedVehicle].healthScore}%</div>
                                        </div>
                                        <Progress
                                            className="mt-2"
                                            value={vehicleHealthData[selectedVehicle].healthScore}
                                        />
                                        <p className="mt-2 text-xs text-gray-500">
                                            Last updated: Today, 9:45 AM
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {selectedVehicle.startsWith('V-234') ? 'Battery Level' : 'Battery Voltage'}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <Battery className="h-10 w-10 text-blue-500" />
                                            <div className="text-2xl font-bold">
                                                {selectedVehicle.startsWith('V-234')
                                                    ? `${vehicleHealthData[selectedVehicle].batteryLevel}%`
                                                    : `${vehicleHealthData[selectedVehicle].batteryVoltage}V`
                                                }
                                            </div>
                                        </div>
                                        {selectedVehicle.startsWith('V-234') && (
                                            <p className="mt-2 text-xs">Range: {vehicleHealthData[selectedVehicle].batteryRange} miles</p>
                                        )}
                                        <p className="mt-2 text-xs text-gray-500">
                                            {selectedVehicle.startsWith('V-234')
                                                ? 'Healthy (Degradation: 4%)'
                                                : vehicleHealthData[selectedVehicle].batteryVoltage > 12.5
                                                    ? 'Healthy'
                                                    : 'May need charging'
                                            }
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {selectedVehicle.startsWith('V-234') ? 'Motor Temp' : 'Engine Temp'}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <Gauge className="h-10 w-10 text-orange-500" />
                                            <div className="text-2xl font-bold">
                                                {vehicleHealthData[selectedVehicle].engineTemp}°F
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs">
                                            {vehicleHealthData[selectedVehicle].engineTemp > 200
                                                ? 'Above optimal temperature'
                                                : 'Normal operating temperature'
                                            }
                                        </p>
                                        <p className="mt-2 text-xs text-gray-500">
                                            Safe range: 170°F - 205°F
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {selectedVehicle.startsWith('V-234') ? 'Charge Level' : 'Fuel Level'}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <Droplet className="h-10 w-10 text-blue-500" />
                                            <div className="text-2xl font-bold">
                                                {selectedVehicle.startsWith('V-234')
                                                    ? `${vehicleHealthData[selectedVehicle].batteryLevel}%`
                                                    : `${vehicleHealthData[selectedVehicle].fuelLevel}%`
                                                }
                                            </div>
                                        </div>
                                        <Progress
                                            className="mt-2"
                                            value={selectedVehicle.startsWith('V-234')
                                                ? vehicleHealthData[selectedVehicle].batteryLevel
                                                : vehicleHealthData[selectedVehicle].fuelLevel
                                            }
                                        />
                                        <p className="mt-2 text-xs text-gray-500">
                                            {selectedVehicle.startsWith('V-234')
                                                ? 'Estimated range: 241 miles'
                                                : vehicleHealthData[selectedVehicle].fuelLevel < 25
                                                    ? 'Low fuel - refill soon'
                                                    : 'Adequate fuel level'
                                            }
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                <Card className="md:col-span-8">
                                    <CardHeader>
                                        <CardTitle>Health Metrics Over Time</CardTitle>
                                        <CardDescription>
                                            Last 6 months of data for {vehicles.find(v => v.id === selectedVehicle)?.name}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <LineChart data={historicalData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="batteryHealth" stroke="#3b82f6" name="Battery Health" />
                                                <Line type="monotone" dataKey="engineHealth" stroke="#ef4444" name="Engine Health" />
                                                <Line type="monotone" dataKey="tirePressure" stroke="#10b981" name="Tire Pressure" />
                                                <Line type="monotone" dataKey="fuelEfficiency" stroke="#f59e0b" name="Fuel Efficiency" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                <Card className="md:col-span-4">
                                    <CardHeader>
                                        <CardTitle>Maintenance Status</CardTitle>
                                        <CardDescription>Service history and upcoming maintenance</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium">Last Service</h4>
                                                <p className="text-lg">{vehicleHealthData[selectedVehicle].lastService}</p>
                                                <p className="text-xs text-gray-500">
                                                    {calculateDaysSinceService(vehicleHealthData[selectedVehicle].lastService)}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium">Next Service Due</h4>
                                                <p className="text-lg">{vehicleHealthData[selectedVehicle].nextService}</p>
                                                {new Date(vehicleHealthData[selectedVehicle].nextService) < new Date() ? (
                                                    <Badge variant="destructive">Overdue</Badge>
                                                ) : (
                                                    <Badge variant="outline">Scheduled</Badge>
                                                )}
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="text-sm font-medium">Current Mileage</h4>
                                                <p className="text-lg">{vehicleHealthData[selectedVehicle].mileage.toLocaleString()} miles</p>
                                            </div>

                                            {!selectedVehicle.startsWith('V-234') && (
                                                <div>
                                                    <h4 className="text-sm font-medium">Oil Life</h4>
                                                    <Progress
                                                        className="mt-2"
                                                        value={vehicleHealthData[selectedVehicle].oilLife}
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {vehicleHealthData[selectedVehicle].oilLife}% remaining
                                                    </p>
                                                </div>
                                            )}

                                            <Button className="w-full mt-2">Schedule Service</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Tire Pressure (PSI)</CardTitle>
                                    <CardDescription>Current readings for all four tires</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                                        <div className="text-center">
                                            <div className="text-lg font-medium">
                                                {vehicleHealthData[selectedVehicle].tirePressure.fl} PSI
                                            </div>
                                            <p className="text-sm text-gray-500">Front Left</p>
                                            {vehicleHealthData[selectedVehicle].tirePressure.fl < 30 && (
                                                <Badge variant="destructive" className="mt-1">Low</Badge>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-medium">
                                                {vehicleHealthData[selectedVehicle].tirePressure.fr} PSI
                                            </div>
                                            <p className="text-sm text-gray-500">Front Right</p>
                                            {vehicleHealthData[selectedVehicle].tirePressure.fr < 30 && (
                                                <Badge variant="destructive" className="mt-1">Low</Badge>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-medium">
                                                {vehicleHealthData[selectedVehicle].tirePressure.rl} PSI
                                            </div>
                                            <p className="text-sm text-gray-500">Rear Left</p>
                                            {vehicleHealthData[selectedVehicle].tirePressure.rl < 30 && (
                                                <Badge variant="destructive" className="mt-1">Low</Badge>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-medium">
                                                {vehicleHealthData[selectedVehicle].tirePressure.rr} PSI
                                            </div>
                                            <p className="text-sm text-gray-500">Rear Right</p>
                                            {vehicleHealthData[selectedVehicle].tirePressure.rr < 30 && (
                                                <Badge variant="destructive" className="mt-1">Low</Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-center mt-4 text-sm">
                                        <p>Recommended: 32-36 PSI (check vehicle manual for specific recommendations)</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </TabsContent>

                {/* AI INSIGHTS TAB */}
                <TabsContent value="insights" className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold">AI-Powered Insights & Predictions</h2>
                        <p className="text-sm text-gray-500">Smart recommendations to optimize your fleet's health and reduce costs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {aiInsights.map((insight, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>Insight #{index + 1}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm">{insight}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}