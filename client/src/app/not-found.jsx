"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Home, ArrowLeft, Zap } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden bg-[#080810] text-[#f0f0ff] p-4 min-h-[100vh] select-none">
            {/* Dynamic Background Elements / Glowing Blobs */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Tech grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

            {/* Main Container */}
            <div className="relative z-10 max-w-lg w-full text-center py-8">
                {/* Glassmorphic card */}
                <div className="glass-card noise-overlay rounded-[var(--radius-xl)] px-6 py-10 sm:px-8 sm:py-12 flex flex-col items-center shadow-[var(--shadow-card)] border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-[24px]">

                    {/* Animated Tech Radar / Lost Compass Illustration */}
                    <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
                        {/* Outer spinning ring */}
                        <div className="absolute inset-0 border border-orange-500/20 border-dashed rounded-full animate-spin-slow" />

                        {/* Inner pulsing radar grid */}
                        <div className="absolute inset-4 border border-orange-500/10 rounded-full flex items-center justify-center">
                            <div className="absolute inset-4 border border-orange-500/10 rounded-full flex items-center justify-center">
                                <div className="absolute inset-4 border border-orange-500/5 rounded-full" />
                            </div>
                        </div>

                        {/* Sweeping radar line */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-orange-500/10 animate-spin [animation-duration:4s] pointer-events-none" />

                        {/* Glowing target blip 1 */}
                        <div className="absolute top-[25%] right-[30%] w-2 h-2 bg-orange-500 rounded-full pulse-glow" />

                        {/* Glowing target blip 2 */}
                        <div className="absolute bottom-[20%] left-[25%] w-1.5 h-1.5 bg-orange-500/60 rounded-full pulse-glow [animation-delay:1.5s]" />

                        {/* Center Glowing Navigation Icon */}
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5722] to-[#FF7043] flex items-center justify-center shadow-lg shadow-orange-500/20 animate-float">
                            <Compass className="w-8 h-8 text-white animate-pulse" />
                        </div>
                    </div>

                    {/* Badge */}
                    <span className="badge badge-primary mb-4 animate-fade-in">
                        Error Code: 404
                    </span>

                    {/* 404 Heading */}
                    <h1 className="text-7xl font-extrabold tracking-tight mb-2 select-text">
                        <span className="gradient-text font-black">404</span>
                    </h1>

                    <h2 className="text-2xl font-bold text-white mb-3 animate-fade-in-up">
                        Lost in Transition
                    </h2>

                    <p className="text-sm text-[var(--color-text-secondary)] max-w-sm mb-8 select-text leading-relaxed">
                        The page you are looking for has drifted off its trajectory or doesn't exist on this server. Let's navigate back to safety.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                        <button
                            onClick={() => router.back()}
                            className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            <span>Go Back</span>
                        </button>
                        <Link
                            href="/"
                            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Home className="w-4 h-4" />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
