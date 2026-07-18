import {
  FileText,
  Briefcase,
  BarChart2,
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";

import DashboardBanner from "@/components/DashboardBanner";
import StatsCards from "@/components/StatsCards";
import CardWrp from "@/components/CardWrp";
import QuickActions from "@/components/QuickActions";
import ResumeHistory from "@/components/ResumeHistory";
import ResumeScore from "@/components/ResumeScore";

/* ─── Quick Action Cards ─────────────────────────────────────── */
const quickActions = [
  {
    label: "Resume Analysis",
    description: "AI-powered resume scoring",
    href: "/resume-analysis",
    icon: FileText,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "hover:border-orange-500/40",
  },
  {
    label: "Job Tracker",
    description: "Track your applications",
    href: "/job-tracker",
    icon: Briefcase,
    color: "text-orange-300",
    bg: "bg-orange-400/10",
    border: "hover:border-orange-400/40",
  },
  {
    label: "Analytics",
    description: "Career performance insights",
    href: "/analytics",
    icon: BarChart2,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    label: "Interviews",
    description: "Prep & schedule sessions",
    href: "/interviews",
    icon: MessageSquare,
    color: "text-orange-200",
    bg: "bg-orange-300/10",
    border: "hover:border-orange-300/40",
  },
];

/* ─── Recent Activity ────────────────────────────────────────── */
const recentActivity = [
  {
    type: "applied",
    company: "Stripe",
    role: "Senior Frontend Engineer",
    time: "2h ago",
    status: "pending",
    icon: Clock,
    statusColor: "text-amber-400",
    statusBg: "bg-amber-400/10",
  },
  {
    type: "interview",
    company: "Vercel",
    role: "Staff Engineer",
    time: "Yesterday",
    status: "scheduled",
    icon: CheckCircle,
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-400/10",
  },
  {
    type: "applied",
    company: "Linear",
    role: "Product Engineer",
    time: "3 days ago",
    status: "reviewed",
    icon: Star,
    statusColor: "text-orange-400",
    statusBg: "bg-orange-400/10",
  },
  {
    type: "applied",
    company: "Figma",
    role: "Frontend Developer",
    time: "5 days ago",
    status: "pending",
    icon: Clock,
    statusColor: "text-amber-400",
    statusBg: "bg-amber-400/10",
  },
];
/* ─── Page ───────────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div className="animate-fade-in-up flex flex-col gap-[20px] md:gap-[30px]">
      <DashboardBanner />
      <CardWrp>
        <StatsCards />
      </CardWrp>
      <CardWrp>
        <QuickActions data={quickActions} />
      </CardWrp>
      <CardWrp>
        <ResumeScore />
      </CardWrp>
      <ResumeHistory />
    </div>
  );
}
