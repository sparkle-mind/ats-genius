import { Check, ExternalLink, GitBranch, Globe } from "lucide-react";
import CardWrp from "./CardWrp";
import SecondaryButton from "./atoms/buttons/SecondaryButton";
/* ─── Integrations ───────────────────────────────────────────── */
const integrations = [
  {
    name: "GitHub",
    description: "Showcase your repositories and contributions",
    icon: GitBranch,
    connected: true,
    color: "text-zinc-300",
    bg: "bg-zinc-500/10",
  },
  {
    name: "LinkedIn",
    description: "Sync your profile and import work history",
    icon: ExternalLink,
    connected: false,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    name: "Google Calendar",
    description: "Sync interview schedules automatically",
    icon: Globe,
    connected: true,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];
const Integrations = () => {
  return (
    <CardWrp className="mt-0">
      <h2 className="text-base font-bold text-white mb-2">Connected Apps</h2>
      <p className="text-[var(--color-text-secondary)] text-sm mb-6">
        Link external services to enhance your CareerPilot experience.
      </p>
      <div className="flex flex-col gap-3">
        {integrations.map((int) => {
          const Icon = int.icon;
          return (
            <div
              key={int.name}
              className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-xl ${int.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${int.color}`} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{int.name}</p>
                  <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">
                    {int.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {int.connected ? (
                  <>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Connected
                    </span>
                    <button className="text-xs text-[var(--color-text-secondary)] hover:text-red-400 font-semibold transition-colors">
                      Disconnect
                    </button>
                  </>
                ) : (
                  <SecondaryButton href="#">Connect</SecondaryButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CardWrp>
  );
};

export default Integrations;
