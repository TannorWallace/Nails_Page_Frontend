//app/login/page.tsx
'use client';

import { useState } from "react";
import Link from "next/link";


export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    // const handleLogin = async (e: React.FormEvent) => {
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => { //ugh ok deprecation warning wont go away
        e.preventDefault();
        setLoading(true); //why? is this breaking...
        setError("");

        try {
            const res = await fetch(
            "http://127.0.0.1:8000/auth/token",{
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({
                    username:username,
                    password: password,
                    }),
            });
        
    if (res.ok) {
            const data = await res.json();
            localStorage.setItem("access_token", data.access_token);
            window.location.href = "/";
        } else {
            setError("Username or Password Not Recognised");
        }
        } catch (err) {
        setError("Oops! Is the server running?");
        } finally {
        setLoading(false);
        }
    };


    return(
        <div className="min-h-screen flex items-center justify-center py-12">
            <div className="max-w-md w-full bg-white/60 rounded-3xl shadow-sm p-10">
                <h1 className="text-4xl font-bold text-center mb-8">Login</h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-4 border rounded-2xl"
                        required/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 border rounded-2xl"
                                required/>
                    </div>

                    {error && <p className="text-red-600 text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-purple-700 transition-colors">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center mt-8 text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-purple-600 hover:underline hover:text-purple-800">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}