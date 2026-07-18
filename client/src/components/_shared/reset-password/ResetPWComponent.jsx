"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  CheckCircle,
  Shield,
} from "lucide-react";
import Input from "@/components/atoms/input/Input";
import { resetPasswordAPI } from "@/services/authService";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ chars", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const barColors = ["bg-red-500", "bg-amber-500", "bg-emerald-500"];
  const labels = ["Weak", "Fair", "Strong"];
  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${i < score ? barColors[score - 1] : "bg-zinc-800"}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {checks.map((c) => (
            <span
              key={c.label}
              className={`text-[10px] flex items-center gap-1 ${c.pass ? "text-emerald-400" : "text-zinc-600"}`}
            >
              <CheckCircle className="w-2.5 h-2.5" /> {c.label}
            </span>
          ))}
        </div>
        {score > 0 && (
          <span
            className={`text-[10px] font-bold ${barColors[score - 1].replace("bg-", "text-")}`}
          >
            {labels[score - 1]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ResetPWComponent({ token }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { mutate: resetPWmutate, isPending } = useMutation({
    mutationFn: resetPasswordAPI,
    onSuccess: () => {
      toast.success("Password reset successfully");
      setSuccess(true);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.password || formData.password !== formData.confirmPassword)
      return;
    resetPWmutate({
      token,
      password: formData.password,
    });
  };

  const mismatch =
    formData.confirmPassword && formData.password !== formData.confirmPassword;
  return (
    <>
      <div className="max-w-[1400px] w-full mx-auto min-h-screen bg-[var(--color-bg)] text-white flex">
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden border-r border-[var(--color-border)]">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] blur-[100px] rounded-full"
              style={{ background: "rgba(255,87,34,0.07)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-[400px] h-[400px] blur-[80px] rounded-full"
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
                Set a strong
                <br />
                <span className="gradient-text">new password</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                Choose a secure password to protect your AI-powered career
                journey.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                "Use 8+ characters with uppercase and numbers",
                "Avoid reusing passwords from other sites",
                "Consider using a password manager",
              ].map((tip) => (
                <div key={tip} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,87,34,0.10)" }}
                  >
                    <Shield
                      className="w-4 h-4"
                      style={{ color: "var(--color-orange)" }}
                    />
                  </div>
                  <span className="text-zinc-300 text-sm">{tip}</span>
                </div>
              ))}
            </div>

            <div className="glass-card !h-auto rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,87,34,0.12)" }}
                >
                  <Shield
                    className="w-3.5 h-3.5"
                    style={{ color: "var(--color-orange)" }}
                  />
                </div>
                <p className="text-white text-sm font-semibold">Security tip</p>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                A strong password is your first line of defence. Use a mix of
                letters, numbers, and symbols.
              </p>
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

            {success ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border"
                  style={{
                    background: "rgba(255,87,34,0.10)",
                    borderColor: "rgba(255,87,34,0.25)",
                  }}
                >
                  <CheckCircle
                    className="w-8 h-8"
                    style={{ color: "var(--color-orange)" }}
                  />
                </div>
                <h3 className="text-white font-black text-xl mb-2">
                  Password updated!
                </h3>
                <p className="text-zinc-400 text-sm mb-6">
                  Your account is secure. You can now sign in with your new
                  password.
                </p>
                <Link
                  href="/login"
                  className="btn-primary !w-full !justify-center"
                >
                  Sign In <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
                    Reset password
                  </h1>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    Create a new secure password for your account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="Create a strong password"
                        icon={<Lock size={16} />}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-zinc-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    <PasswordStrength password={formData.password} />
                  </div>

                  <div>
                    <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Repeat your password"
                        icon={<Lock size={16} />}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-zinc-300 transition-colors"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {mismatch && (
                      <p className="text-red-400 text-xs mt-1.5">
                        Passwords do not match.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending || !formData.password || mismatch}
                    className={`btn-primary !w-full !justify-center !h-11 mt-1 ${isPending || !formData.password || mismatch ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isPending ? (
                      "Updating..."
                    ) : (
                      <>
                        <span>Update Password</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}

            <p className="text-[var(--color-text-secondary)] text-sm text-center mt-6">
              Back to{" "}
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
    </>
  );
}
