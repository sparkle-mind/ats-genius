"use client";
import React, { useState } from "react";
import { Tooltip, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebarTopNavigation } from "@/utils/RoutesMapper";
import {
  LayoutDashboard,
  FileUser,
  AudioWaveform,
  Video,
  ChartPie,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  ChevronLeft,
  ChevronRight,
  BellRing,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "@/services/authService";
import toast from "react-hot-toast";
import LogoutModal from "../LogoutModal";

const navItems = [
  { text: "Dashboard", icon: LayoutDashboard, idx: 0 },
  { text: "Resume Analysis", icon: FileUser, idx: 1 },
  { text: "Job Tracker", icon: AudioWaveform, idx: 2 },
  { text: "Interviews", icon: Video, idx: 3 },
  { text: "Analytics", icon: ChartPie, idx: 4 },
  { text: "Notifications", icon: BellRing, idx: 5 },
  { text: "Settings", icon: Settings, idx: 6 },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: logoutMutate, isPending: isLogoutLoading } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      // 💥 instantly remove user from cache
      queryClient.setQueryData(["me"], null);
      toast.success("Logout successful");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const SidebarContent = () => (
    <div
      className={`h-screen bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col transition-all duration-300 ${collapsed && !isMobile ? "w-[68px]" : "w-64"}`}
      style={{
        background:
          "linear-gradient(to bottom right, #18181b 0%,#09090b 50%,#000000 100%)",
      }}
    >
      {/* Header */}
      <div
        className={`flex items-center h-16 px-4 border-b border-[var(--color-border)] shrink-0 ${collapsed && !isMobile ? "justify-center" : "justify-between"}`}
      >
        {(!collapsed || isMobile) && (
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg gradient-bg-primary flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-white text-base">
              Career<span className="gradient-text">Pilot</span>
            </span>
          </Link>
        )}
        <div className="flex items-center gap-1">
          {isMobile ? (
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 transition-all"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const path = sidebarTopNavigation[item.idx]?.path;
          const active = pathname === path;
          return (
            <Tooltip
              key={item.text}
              title={collapsed && !isMobile ? item.text : ""}
              placement="right"
            >
              <Link
                href={path || "#"}
                onClick={isMobile ? () => setMobileOpen(false) : undefined}
                className={`flex items-center gap-3 h-10 rounded-xl px-3 transition-all duration-200 group ${
                  collapsed && !isMobile ? "justify-center" : ""
                } ${
                  active
                    ? "border"
                    : "text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.05]"
                }`}
                style={
                  active
                    ? {
                        background: "rgba(255,87,34,0.12)",
                        borderColor: "rgba(255,87,34,0.25)",
                        color: "#FFAB91",
                      }
                    : {}
                }
              >
                <Icon
                  className="w-4 h-4 shrink-0"
                  style={active ? { color: "var(--color-orange)" } : {}}
                />
                {(!collapsed || isMobile) && (
                  <span className="text-sm font-medium truncate">
                    {item.text}
                  </span>
                )}
              </Link>
            </Tooltip>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-[var(--color-border)] space-y-2 shrink-0">
        {(!collapsed || isMobile) && (
          <Link
            href="/resume-analysis"
            className="flex items-center justify-center gap-2 w-full h-9 rounded-xl border text-xs font-semibold transition-all hover:opacity-80"
            style={{
              background: "rgba(255,87,34,0.12)",
              borderColor: "rgba(255,87,34,0.25)",
              color: "#FFAB91",
            }}
          >
            <Zap className="w-3.5 h-3.5" /> Optimise Resume
          </Link>
        )}
        <Tooltip
          title={collapsed && !isMobile ? "Logout" : ""}
          placement="right"
        >
          <button
            onClick={() => setOpenLogoutModal(true)}
            className={`cursor-pointer justify-center bg-red-700 flex items-center gap-3 h-10 w-full rounded-xl px-3 hover:bg-red-800 transition-all ${collapsed && !isMobile ? "justify-center" : ""}`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {(!collapsed || isMobile) && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-[60px] glass-nav flex items-center justify-between px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg gradient-bg-primary flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" />
          </div>
          <span className="font-black text-white text-sm">
            Career<span className="gradient-text">Pilot</span>
          </span>
        </Link>
        <div className="w-9" />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full z-10">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block sticky top-0 h-screen shrink-0">
        <SidebarContent />
      </div>
      <LogoutModal
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onLogout={() => logoutMutate()}
        isLogoutLoading={isLogoutLoading}
      />
    </>
  );
}
