"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Zap } from "lucide-react";
import Input from "@/components/atoms/input/Input";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validation/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { registerUserAPI } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // React-quey mutation >>>>>>>>>>>>
  const registerMutation = useMutation({
    mutationFn: registerUserAPI,
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful!");
      router.push("/login");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  // Submit handler >>>>>>>>>>>>
  const handleRegisterSubmit = (data) => {
    registerMutation.mutate(data);
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
            className="absolute top-0 right-0 w-[500px] h-[500px] blur-[100px] rounded-full"
            style={{ background: "rgba(255,112,67,0.07)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] blur-[80px] rounded-full"
            style={{ background: "rgba(255,87,34,0.05)" }}
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
              Build your future
              <br />
              with <span className="gradient-text">AI precision</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Everything you need to land your dream job — resume scoring, job
              tracking, interview prep, and more.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { v: "50K+", l: "Users" },
              { v: "3.2x", l: "Faster" },
              { v: "4.9★", l: "Rating" },
            ].map((s) => (
              <div key={s.l} className="glass-card rounded-xl p-3 text-center">
                <p className="text-lg font-black gradient-text">{s.v}</p>
                <p className="text-[var(--color-text-secondary)] text-xs">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-zinc-700 text-xs z-10">
          © 2026 CareerPilot AI. All rights reserved.
        </p>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
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
              Create your account
            </h1>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Start your AI-powered career journey — free forever
            </p>
          </div>

          <div className=" mb-6 google-btn">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={handleGoogleLoginFailed}
                text="signup_with"
              />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-zinc-600 text-xs">or sign up with email</span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          <form
            onSubmit={handleSubmit(handleRegisterSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                Full Name
              </label>
              <Input
                name="fullName"
                placeholder="Alex Johnson"
                icon={<User size={16} />}
                {...register("fullName")}
                error={errors.fullName?.message}
              />
            </div>

            <div>
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                icon={<Mail size={16} />}
                {...register("email")}
                error={errors.email?.message}
              />
            </div>

            <div>
              <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
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

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-zinc-700 bg-zinc-800 shrink-0"
                style={{ accentColor: "var(--color-orange)" }}
                {...register("agreeToTerms")}
              />
              <span className="text-zinc-400 text-sm">
                I agree to the{" "}
                <Link
                  href="#"
                  className="hover:opacity-80"
                  style={{ color: "var(--color-orange)" }}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="hover:opacity-80"
                  style={{ color: "var(--color-orange)" }}
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeToTerms?.message && (
              <p className="!text-red-500 text-sm mt-2">
                {errors.agreeToTerms?.message}
              </p>
            )}

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className={`btn-primary !w-full !justify-center !h-11 mt-1 ${
                registerMutation.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {registerMutation.isPending ? (
                "Creating account..."
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-[var(--color-text-secondary)] text-sm text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold transition-colors hover:opacity-80"
              style={{ color: "var(--color-orange)" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
