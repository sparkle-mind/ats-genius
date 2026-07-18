"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowRight,
  Zap,
  CheckCircle2,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";
import Input from "@/components/atoms/input/Input";
import { forgotPasswordAPI } from "@/services/authService";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const highlights = [
  { icon: Shield, text: "Secure encrypted reset link" },
  { icon: TrendingUp, text: "Back to your career journey in minutes" },
  { icon: Users, text: "50,000+ professionals trust us" },
];

export default function ForgotPWComponent() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutate: forgotPWmutate, isPending } = useMutation({
    mutationFn: forgotPasswordAPI,
    onSuccess: (res) => {
      toast.success("Password reset link sent successfully");
      setSubmitted(true);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    forgotPWmutate(email);
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
              Recover your account
              <br />
              in <span className="gradient-text">seconds</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Enter your email and we'll send a secure reset link straight to
              your inbox.
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

          <div className="glass-card rounded-2xl p-5 !h-auto">
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              "Reset took 30 seconds. I was back to my job search immediately."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-bg-primary flex items-center justify-center">
                <span className="text-white text-xs font-black">MJ</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">
                  Marcus Johnson
                </p>
                <p className="text-[var(--color-text-secondary)] text-xs">
                  Product Manager @ Vercel
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
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg gradient-bg-primary flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-white">
              Career<span className="gradient-text">Pilot</span>
            </span>
          </Link>

          {submitted ? (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border"
                style={{
                  background: "rgba(255,87,34,0.10)",
                  borderColor: "rgba(255,87,34,0.25)",
                }}
              >
                <CheckCircle2
                  className="w-8 h-8"
                  style={{ color: "var(--color-orange)" }}
                />
              </div>
              <h3 className="text-white font-black text-xl mb-2">
                Check your inbox
              </h3>
              <p className="text-zinc-400 text-sm mb-2">
                We sent a reset link to
              </p>
              <p
                className="font-semibold text-sm mb-6"
                style={{ color: "var(--color-orange)" }}
              >
                {email}
              </p>
              <p className="text-[var(--color-text-secondary)] text-xs mb-6">
                Didn't receive it? Check your spam folder or try again.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-secondary !w-full !justify-center"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
                  Forgot password?
                </h1>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  No worries — we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    icon={<Mail size={16} />}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending || !email}
                  className={`btn-primary !w-full !justify-center !h-11 mt-1 ${!email || isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          <p className="text-[var(--color-text-secondary)] text-sm text-center mt-6">
            Remember your password?{" "}
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
