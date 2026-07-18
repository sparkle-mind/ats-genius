"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { User, Shield, Trash2, ChevronRight } from "lucide-react";
import PersonalInfo from "./PersonalInfo";
import Notifications from "./Notifications";
import Passwords from "./Passwords";
import Appearance from "./Appearance";
import Integrations from "./Integrations";
import DeleteAccountModal from "./DeleteAccountModal";

/* ─── Sidebar Tabs ───────────────────────────────────────────── */
const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
];
/* ─── Toggle Component ───────────────────────────────────────── */
function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-10 h-5 rounded-full transition-colors duration-300 shrink-0 ${
        on ? "bg-orange-500" : "bg-zinc-700"
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const handleOpenAccoundModal = () => {
    setIsDeleteAccountModalOpen(true);
  };
  const handleDeleteAccoundModalClose = () => {
    setIsDeleteAccountModalOpen(false);
  };
  return (
    <Grid container spacing={3} className="items-start">
      <Grid size={{ xs: 12, md: 3 }}>
        <div className="glass-card rounded-[15px] p-2 flex flex-col gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left ${
                  active
                    ? "bg-orange-500/15 text-orange-300 border border-orange-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            );
          })}

          <div className="mt-2 pt-2 border-t border-white/5">
            <button
              onClick={handleOpenAccoundModal}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-400/10 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4 shrink-0" />
              Delete Account
            </button>
          </div>

          <DeleteAccountModal
            open={isDeleteAccountModalOpen}
            onClose={handleDeleteAccoundModalClose}
          />
        </div>
      </Grid>

      <Grid size={{ xs: 12, md: 9 }}>
        {activeTab === "profile" && (
          <div className="flex flex-col gap-6">
            <PersonalInfo />
          </div>
        )}

        {activeTab === "notifications" && <Notifications Toggle={Toggle} />}
        {activeTab === "security" && <Passwords />}
      </Grid>
    </Grid>
  );
};

export default SettingsTabs;
