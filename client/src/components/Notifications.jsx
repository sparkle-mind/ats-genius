"use client";

import PrimaryButton from "./atoms/buttons/PrimaryButton";
import CardWrp from "./CardWrp";
/* ─── Notification Toggles ───────────────────────────────────── */
const notificationGroups = [
  {
    group: "Applications",
    items: [
      {
        label: "Application status updates",
        description: "When a company changes your application status",
        defaultOn: true,
      },
      {
        label: "New job matches",
        description: "AI-matched roles based on your profile",
        defaultOn: true,
      },
      {
        label: "Application reminders",
        description: "Follow-up reminders for pending applications",
        defaultOn: false,
      },
    ],
  },
  {
    group: "Interviews",
    items: [
      {
        label: "Interview scheduled",
        description: "When a new interview is booked",
        defaultOn: true,
      },
      {
        label: "Interview reminders",
        description: "24h and 1h before each interview",
        defaultOn: true,
      },
      {
        label: "Feedback received",
        description: "When interview feedback is available",
        defaultOn: true,
      },
    ],
  },
  {
    group: "Platform",
    items: [
      {
        label: "Weekly career digest",
        description: "Summary of your career progress every Monday",
        defaultOn: false,
      },
      {
        label: "Product updates",
        description: "New features and improvements",
        defaultOn: false,
      },
    ],
  },
];
const Notifications = ({ Toggle }) => {
  return (
    <>
      <CardWrp className="mt-0">
        <h2 className="text-base font-bold text-white mb-6">
          Notification Preferences
        </h2>
        <div className="flex flex-col gap-8">
          {notificationGroups.map((group) => (
            <div key={group.group}>
              <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">
                {group.group}
              </p>
              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  >
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {item.label}
                      </p>
                      <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <Toggle defaultOn={item.defaultOn} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <PrimaryButton href="#">Save Preferences</PrimaryButton>
        </div>
      </CardWrp>
    </>
  );
};

export default Notifications;
