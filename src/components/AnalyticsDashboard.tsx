"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Card, Title, LineChart, Metric } from "@tremor/react";

const socket = io("http://localhost:5000"); // Update this with your backend URL

export default function AnalyticsDashboard() {
    const [analytics, setAnalytics] = useState<{ time: string; users: number }[]>([]);

    useEffect(() => {
        // Fetch initial analytics data
        fetch("http://localhost:5000/analytics")
            .then((res) => res.json())
            .then((data) => setAnalytics(data));

        // Listen for real-time updates
        socket.on("newAnalytics", (data) => {
            setAnalytics((prev) => [...prev, data]);
        });

        return () => {
            socket.off("newAnalytics");
        };
    }, []);

    return (
        <div className="p-6">
            <Title>📊 Real-Time Analytics</Title>

            {/* Active Users Card */}
            <Card className="mt-4 p-4 shadow-lg">
                <Metric className="text-3xl font-bold text-blue-600">{analytics.length}</Metric>
                <p className="text-gray-600">Total Active Users</p>
            </Card>

            {/* Real-Time User Growth Chart */}
            <Card className="mt-6 p-4 shadow-lg">
                <Title>User Growth Over Time</Title>
                <LineChart
                    data={analytics}
                    index="time"
                    categories={["users"]}
                    colors={["blue"]}
                    yAxisWidth={40}
                />
            </Card>
        </div>
    );
}
