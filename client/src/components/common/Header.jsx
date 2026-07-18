"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { useMe } from "@/services/useMe";
import Image from "next/image";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { isLoggedIn, user, isLoading } = useMe();
  console.log("user >>>>>>", user);
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-nav shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-xl gradient-bg-primary flex items-center justify-center glow-sm">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-white text-lg tracking-tight">
                Career<span className="gradient-text">Pilot</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              {isLoading ? null : isLoggedIn ? (
                <Link href="/dashboard" className="h-[45px] w-[45px]">
                  <div className="relative w-[45px] h-[45px]">
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-500 animate-spin [animation-duration:3s]" />

                    {/* Inner content */}
                    <div className="absolute inset-[2px] rounded-full bg-black flex items-center justify-center">
                      <Image
                        src={user?.profile?.avatar}
                        alt="avatar"
                        width={41}
                        height={41}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  Sign in
                </Link>
              )}
              {!isLoggedIn && (
                <Link
                  href="/register"
                  className="btn-primary !h-9 !px-5 !text-sm"
                >
                  Get Started Free
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "visible opacity-100 z-[99]" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#0f0f1a] border-l border-[var(--color-border)] p-6 transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-white font-bold">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 mb-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            {isLoading ? null : isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="btn-secondary !w-full !justify-center"
              >
                 <div className="relative w-[30px] h-[30px]">
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-500 animate-spin [animation-duration:3s]" />

                    {/* Inner content */}
                    <div className="absolute inset-[1px] rounded-full bg-black flex items-center justify-center">
                      <Image
                        src={user?.profile?.avatar}
                        alt="avatar"
                        width={30}
                        height={30}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-secondary !w-full !justify-center"
              >
                Sign in
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="btn-primary !w-full !justify-center"
              >
                Get Started Free
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
