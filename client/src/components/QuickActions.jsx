import { Grid } from "@mui/material";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const QuickActions = ({ data }) => {
  const quickActions = data;
  return (
    <>
      <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
      <Grid container spacing={2}>
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Grid key={action.label} size={{ xs: 12, sm: 6, xl: 3 }}>
              <Link
                href={action.href}
                className={`glass-card rounded-xl p-4 flex items-center gap-4 group transition-all duration-300 border border-transparent ${action.border} hover:translate-y-[-2px]`}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {action.label}
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-xs mt-0.5 truncate">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto shrink-0" />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default QuickActions;
