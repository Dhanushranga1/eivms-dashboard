"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, BarChart, Shield } from "lucide-react";

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Car className="h-8 w-8 text-blue-600" />
                    <span className="font-bold text-2xl text-blue-900">EIVMS</span>
                </div>
                <div className="flex space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/auth/login")}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => router.push("/auth/register")}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Get Started
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
                        Intelligent Fleet Management Solution
                    </h1>
                    <p className="text-lg text-gray-600">
                        Streamline your operations with real-time tracking, predictive maintenance,
                        and comprehensive analytics for your entire fleet.
                    </p>
                    <div className="flex space-x-4 pt-4">
                        <Button
                            onClick={() => router.push("/auth/register")}
                            className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg"
                        >
                            Start Free Trial
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push("/auth/login")}
                            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
                        >
                            Login
                        </Button>
                    </div>
                </div>
                <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                    <div className="relative w-full max-w-md h-64 bg-blue-100 rounded-lg shadow-lg overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-10"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Car className="h-24 w-24 text-blue-600" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-16 bg-white rounded-t-3xl shadow-sm">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
                    Key Features
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Car className="h-10 w-10 text-blue-600" />}
                        title="Real-Time Tracking"
                        description="Monitor your entire fleet with GPS precision and get instant location updates."
                    />
                    <FeatureCard
                        icon={<Shield className="h-10 w-10 text-blue-600" />}
                        title="Predictive Maintenance"
                        description="Prevent breakdowns with AI-powered insights and timely maintenance alerts."
                    />
                    <FeatureCard
                        icon={<BarChart className="h-10 w-10 text-blue-600" />}
                        title="Performance Analytics"
                        description="Optimize operations with comprehensive data analysis and reporting."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-8">
                <div className="container mx-auto px-6 text-center">
                    <p>© 2025 Enhanced Intelligent Vehicle Management System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-blue-900 text-center mb-2">{title}</h3>
            <p className="text-gray-600 text-center">{description}</p>
        </div>
    );
}