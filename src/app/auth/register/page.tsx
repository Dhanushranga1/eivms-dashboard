"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Car, Lock, Mail, User, AlertCircle } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await createUserWithEmailAndPassword(auth, form.email, form.password);
            router.push("/dashboard"); // Redirect to dashboard after registration
        } catch (err) {
            setError("Error creating account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-2">
                        <Car className="h-10 w-10 text-blue-600" />
                        <span className="font-bold text-3xl text-blue-900">EIVMS</span>
                    </div>
                </div>

                <Card className="border-none shadow-lg">
                    <CardContent className="pt-6">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-blue-900">Create Your Account</h1>
                            <p className="text-gray-500 mt-2">Start managing your fleet efficiently</p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@company.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700">Password</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Must be at least 8 characters with a mix of letters, numbers, and symbols
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>

                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <a
                                    href="/auth/login"
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Sign in
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center mt-8">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to our{" "}
                        <a href="#" className="underline">Terms of Service</a> and{" "}
                        <a href="#" className="underline">Privacy Policy</a>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        © 2025 Enhanced Intelligent Vehicle Management System
                    </p>
                </div>
            </div>
        </div>
    );
}