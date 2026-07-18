"use client";

import { useQuery } from "@tanstack/react-query";
import { Bell, Building2 } from "lucide-react";
import { fetchNotifications } from "@/services/notificationService";
import LoadingWrpNew from "./LoadingWrpNew";

export default function NotificationComponent() {
  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  if (isLoading) {
    return <LoadingWrpNew />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-400">
          Failed to load notifications.
        </div>
      </div>
    );
  }

  return (
    <div className=" px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-2xl bg-cyan-500/10 p-4 ring-1 ring-cyan-500/30">
            <Bell className="h-8 w-8 text-[var(--color-orange)]" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            <p className="text-gray-400">Keep track of your latest updates</p>
          </div>
        </div>

        {/* Empty State */}
        {notifications.length === 0 ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-12 text-center backdrop-blur-md shadow-2xl">
            <Bell className="mx-auto mb-4 h-14 w-14 text-slate-600" />

            <h2 className="text-2xl font-semibold text-white">
              No Notifications
            </h2>

            <p className="mt-2 text-slate-400">You're all caught up 🎉</p>
          </div>
        ) : (
          <div className="space-y-5">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="group relative overflow-hidden rounded-[10px] border border-slate-700 bg-[var(--color-neutral)] p-[10px_20px] backdrop-blur-md transition-all duration-300 hover:border-[var(--color-orange)] hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:-translate-y-1"
              >
                {/* Accent Line */}
                <div className="absolute left-0 top-0 h-full w-1 bg-[var(--color-orange)]"></div>

                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-white">
                        {notification.title}
                      </h2>

                      <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-[var(--color-orange)]">
                        NEW
                      </span>
                    </div>

                    <p className="mt-3 text-gray-300 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
