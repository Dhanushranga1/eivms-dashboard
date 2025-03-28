"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function signup() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
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
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-sm shadow-md">
                <CardHeader>
                    <CardTitle className="text-center">Create an Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing up..." : "Sign Up"}
                        </Button>
                    </form>

                    <div className="text-center text-sm mt-2">
                        <a href="/auth/login" className="text-blue-500 hover:underline">
                            Already have an account? Log in
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
