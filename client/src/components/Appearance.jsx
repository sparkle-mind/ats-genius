"use client";

import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import { Check } from "lucide-react";
import { useState } from "react";
/* ─── Accent Colours ─────────────────────────────────────────── */
const accentColors = [
  { label: "Orange", value: "bg-orange-500" },
  { label: "Amber", value: "bg-amber-500" },
  { label: "Red", value: "bg-red-500" },
  { label: "Emerald", value: "bg-emerald-500" },
  { label: "Sky", value: "bg-sky-500" },
  { label: "Zinc", value: "bg-zinc-500" },
];
const Appearance = ({ Toggle }) => {
  const [selectedAccent, setSelectedAccent] = useState("bg-orange-500");

  return (
    <>
      <div className="flex flex-col gap-6">
        <CardWrp className="mt-0">
          <h2 className="text-base font-bold text-white mb-5">Theme</h2>
          <Grid container spacing={2}>
            {[
              { label: "Dark", desc: "Default dark theme", active: true },
              {
                label: "Darker",
                desc: "Pure black background",
                active: false,
              },
              {
                label: "System",
                desc: "Follows OS preference",
                active: false,
              },
            ].map((theme) => (
              <Grid key={theme.label} size={{ xs: 12, sm: 4 }}>
                <button
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    theme.active
                      ? "border-white/[0.06] bg-white/[0.02]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                  }`}
                  style={
                    theme.active
                      ? {
                          borderColor: "rgba(255,87,34,0.40)",
                          background: "rgba(255,87,34,0.08)",
                        }
                      : {}
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white text-sm font-semibold">
                      {theme.label}
                    </p>
                    {theme.active && (
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "var(--color-orange)" }}
                      >
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-xs">
                    {theme.desc}
                  </p>
                </button>
              </Grid>
            ))}
          </Grid>
        </CardWrp>

        <CardWrp className="mt-0">
          <h2 className="text-base font-bold text-white mb-2">Accent Colour</h2>
          <p className="text-[var(--color-text-secondary)] text-sm mb-5">
            Personalise the highlight colour across the dashboard.
          </p>
          <div className="flex flex-wrap gap-3">
            {accentColors.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedAccent(c.value)}
                className={`w-9 h-9 rounded-xl ${c.value} flex items-center justify-center transition-all hover:scale-110 ${
                  selectedAccent === c.value
                    ? "ring-2 ring-white/40 ring-offset-2 ring-offset-[#161618] scale-110"
                    : ""
                }`}
                title={c.label}
              >
                {selectedAccent === c.value && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            ))}
          </div>
        </CardWrp>

        <CardWrp className="mt-0">
          <h2 className="text-base font-bold text-white mb-5">
            Display Preferences
          </h2>
          <div className="flex flex-col gap-3">
            {[
              {
                label: "Compact sidebar",
                description: "Show icons only in the sidebar by default",
              },
              {
                label: "Animated gradients",
                description: "Enable gradient animations across the UI",
              },
              {
                label: "Reduce motion",
                description: "Minimise animations for accessibility",
              },
            ].map((pref) => (
              <div
                key={pref.label}
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02]"
              >
                <div>
                  <p className="text-white text-sm font-semibold">
                    {pref.label}
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">
                    {pref.description}
                  </p>
                </div>
                <Toggle />
              </div>
            ))}
          </div>
        </CardWrp>
      </div>
    </>
  );
};

export default Appearance;
