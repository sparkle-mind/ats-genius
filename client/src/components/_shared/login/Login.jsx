"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import Input from "@/components/atoms/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/validation/loginSchema";
import { loginUserAPI, getMe } from "@/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

const highlights = [
  { icon: TrendingUp, text: "3x faster job search with AI" },
  { icon: Users, text: "50,000+ professionals trust us" },
  { icon: Award, text: "89% interview success rate" },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  // React-quey mutation >>>>>>>>>>>>
  const loginMutation = useMutation({
    mutationFn: loginUserAPI,

    onSuccess: async () => {
      try {
        // 🔥 fetch real authenticated user
        const user = await getMe();
        // 👇 IMPORTANT: update React Query cache
        queryClient.setQueryData(["me"], user);
        toast.success("Login successful!");
        router.push("/dashboard");
        console.log("User/me >>>> ", user);
      } catch (err) {
        toast.error("Session error. Please login again.");
      }
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  // Submit handler >>>>>>>>>>>>
  const handleLoginSubmit = (data) => {
    loginMutation.mutate(data);
  };

  // Google login handler >>>>>>>>>>>>
  const handleGoogleLogin = async (response) => {
    const token = response.credential; // Google JWT

    const res = await fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    const data = await res.json();
    console.log("Google login response >>>> ", data);
    toast.success(data?.message || "Google login successful!");
    router.refresh();
  };

  const handleGoogleLoginFailed = () => {
    toast.error("Google login failed");
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto min-h-screen bg-[var(--color-bg)] text-white flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden border-r border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-[500px] h-[500px] blur-[100px] rounded-full"
            style={{ background: "rgba(255,87,34,0.07)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] blur-[80px] rounded-full"
            style={{ background: "rgba(255,112,67,0.05)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <Link href="/" className="flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-xl gradient-bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-white text-lg">
            Career<span className="gradient-text">Pilot</span>
          </span>
        </Link>

        <div className="z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-white leading-tight mb-3">
              Navigate your future
              <br />
              with <span className="gradient-text">AI precision</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Join 50,000+ professionals who use CareerPilot to land better
              jobs, faster.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,87,34,0.10)" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "var(--color-orange)" }}
                    />
                  </div>
                  <span className="text-zinc-300 text-sm">{h.text}</span>
                </div>
              );
            })}
          </div>

          {/* Testimonial */}
          <div className="glass-card rounded-2xl p-5 !h-auto">
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              "CareerPilot helped me go from 8% to 34% callback rate. Landed my
              dream job at Stripe in 6 weeks."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-bg-primary flex items-center justify-center">
                <span className="text-white text-xs font-black">SC</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Sarah Chen</p>
                <p className="text-[var(--color-text-secondary)] text-xs">
                  Software Engineer @ Stripe
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-zinc-700 text-xs z-10">
          © 2026 CareerPilot AI. All rights reserved.
        </p>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg gradient-bg-primary flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-white">
              Career<span className="gradient-text">Pilot</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
              Welcome back
            </h1>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Sign in to continue your career journey
            </p>
          </div>

          {/* Social */}
          {/* <div className="grid grid-cols-2 gap-3 mb-6">
            {["Google", "GitHub"].map((provider) => (
              <button
                key={provider}
                className="btn-secondary !h-11 !text-sm !w-full !justify-center"
              >
                {provider}
              </button>
            ))}
          </div> */}
          <div className="mb-5 google-btn">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleGoogleLoginFailed}
              text="continue_with"
            />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-zinc-600 text-xs">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          <form
            onSubmit={handleSubmit(handleLoginSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                Email
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={16} />}
                {...register("email")}
                error={errors.email?.message}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs hover:opacity-80 transition-colors"
                  style={{ color: "var(--color-orange)" }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  icon={<Lock size={16} />}
                  {...register("password")}
                  error={errors.password?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-zinc-300 transition-colors mt-0.5"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 shrink-0"
                style={{ accentColor: "var(--color-orange)" }}
              />
              <span className="text-zinc-400 text-sm">
                Remember me for 30 days
              </span>
            </label>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className={`btn-primary w-full justify-center h-11 mt-1 ${
                loginMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loginMutation.isPending ? (
                "Signing in..."
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
          <p className="text-[var(--color-text-secondary)] text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold transition-colors hover:opacity-80"
              style={{ color: "var(--color-orange)" }}
            >
              Create Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
