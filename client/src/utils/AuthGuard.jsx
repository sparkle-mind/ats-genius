

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/axios";

export default function AuthGuard({ children }) {
    const router = useRouter();

    const {
        data: user,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const { data } = await api.get("/auth/me");
            return data;
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (error instanceof AxiosError && error.response?.status === 401) {
            router.replace("/login");
        }
    }, [error, router]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="mb-8 text-5xl font-bold text-white">⚡</div>

                    <div className="h-1 w-52 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-1/2 animate-pulse rounded-full bg-white" />
                    </div>

                    <p className="mt-6 text-sm tracking-widest text-white/60 uppercase">
                        Loading
                    </p>
                </div>
            </div>
        );
    }

    // Wait while redirecting
    if (error instanceof AxiosError && error.response?.status === 401) {
        return null;
    }

    // Optional: handle unexpected errors
    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                Something went wrong. Please try again.
            </div>
        );
    }

    return children;
}
