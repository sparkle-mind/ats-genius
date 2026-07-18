import SettingsHead from "@/components/SettingsHead";
import SettingsTabs from "@/components/SettingsTabs";

/* ─── Page ───────────────────────────────────────────────────── */
export default function SettingsPage() {
  return (
    <div className="animate-fade-in-up">
      <SettingsHead />
      <SettingsTabs />
    </div>
  );
}
