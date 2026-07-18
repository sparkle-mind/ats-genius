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
                <Link 
                  href="/dashboard" 
                  className="group relative block h-[45px] w-[45px] transition-transform duration-300 hover:scale-105"
                >
                  {/* Ping Radar Aura */}
                  <div className="absolute inset-0 rounded-full bg-orange-500/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500" />
                  
                  {/* Outer Orbit Glowing Border */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF5722] via-[#FFAB91] to-[#FF7043] animate-spin [animation-duration:6s] group-hover:[animation-duration:2s] transition-all duration-500 shadow-[0_0_12px_rgba(255,87,34,0.4)]" />
                  
                  {/* Inner Ring Spacer */}
                  <div className="absolute inset-[2px] rounded-full bg-[#080810] flex items-center justify-center border border-white/[0.04]">
                    {/* Inner Avatar Container */}
                    <div className="relative w-[37px] h-[37px] rounded-full overflow-hidden">
                      <Image
                        src={user?.profile?.avatar}
                        alt="avatar"
                        width={37}
                        height={37}
                        className="rounded-full object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Glass Shimmer Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
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
                 <div className="relative w-[30px] h-[30px] shrink-0">
                     <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF5722] via-[#FFAB91] to-[#FF7043] animate-spin [animation-duration:5s]" />
                     <div className="absolute inset-[1.5px] rounded-full bg-[#080810] flex items-center justify-center">
                       <Image
                         src={user?.profile?.avatar}
                         alt="avatar"
                         width={27}
                         height={27}
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
