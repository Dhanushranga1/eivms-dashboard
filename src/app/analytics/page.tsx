// src/app/analytics/page.tsx
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>

      {/* Fleet Overview KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Vehicles</h2>
          <p className="text-3xl font-bold text-blue-600">150</p>
        </Card>
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Active Vehicles</h2>
          <p className="text-3xl font-bold text-green-600">120</p>
        </Card>
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Idle Vehicles</h2>
          <p className="text-3xl font-bold text-yellow-500">20</p>
        </Card>
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Vehicles in Fault</h2>
          <p className="text-3xl font-bold text-red-600">10</p>
        </Card>
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Emissions (CO₂)</h2>
          <p className="text-3xl font-bold text-gray-800">12.5 Tons</p>
        </Card>
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Distance Traveled</h2>
          <p className="text-3xl font-bold text-indigo-600">450,000 km</p>
        </Card>
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Fuel/Energy Consumption</h2>
          <p className="text-3xl font-bold text-orange-600">35,000 L</p>
        </Card>
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Maintenance Alerts</h2>
          <p className="text-3xl font-bold text-red-500">8</p>
        </Card>
      </div>

      {/* Graph Placeholders for Future Implementation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Emissions Stats */}
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center shadow-inner">
          <p className="text-gray-500">Emissions Stats Chart Placeholder</p>
        </div>

        {/* Usage & Distance Stats */}
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center shadow-inner">
          <p className="text-gray-500">Usage & Distance Chart Placeholder</p>
        </div>

        {/* Energy/Fuel Consumption */}
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center shadow-inner">
          <p className="text-gray-500">Energy Consumption Chart Placeholder</p>
        </div>

        {/* Maintenance Alerts Table */}
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center shadow-inner">
          <p className="text-gray-500">Maintenance Alerts Table Placeholder</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center shadow-inner">
        <p className="text-gray-500">Recent Activities Table Placeholder</p>
      </div>
    </div>
  );
}