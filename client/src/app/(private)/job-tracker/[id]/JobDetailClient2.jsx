"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Globe,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Star,
  XCircle,
  ExternalLink,
  Save,
  CheckCircle,
  Sparkles,
  Bookmark,
  Building,
  CheckSquare,
  AlertCircle,
  Copy,
  Edit2,
} from "lucide-react";

// Columns configuration matching Kanban Board
const columns = {
  applied: {
    label: "Applied",
    icon: Clock,
    color: "text-amber-400 border-amber-400/20 bg-amber-400/10",
  },
  interview: {
    label: "Interview",
    icon: MessageSquare,
    color: "text-orange-400 border-orange-400/20 bg-orange-400/10",
  },
  offer: {
    label: "Offer",
    icon: Star,
    color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-400 border-red-400/20 bg-red-400/10",
  },
};

// Rich Mock Data Pool matching existing jobs and adding exhaustive details
const mockJobsData = {
  1: {
    id: 1,
    company: "Stripe",
    role: "Senior Frontend Engineer",
    location: "Remote",
    salary: "$160k–$200k",
    status: "applied",
    date: "Jun 12",
    priority: "high",
    email: "careers@stripe.com",
    url: "https://stripe.com/jobs/senior-frontend",
    platform: "LinkedIn",
    jobType: "Full-time",
    description:
      "Stripe is looking for a Senior Frontend Engineer to join our dashboard team. You will lead the design and implementation of highly interactive tools that merchants around the world rely on daily. You will collaborate with design partners to build intuitive APIs, robust components, and micro-frontend structures.\n\nRequirements:\n• 5+ years of experience with React, TypeScript, and modern state-management structures.\n• Strong design sense and experience crafting smooth, pixel-perfect user experiences.\n• Experience with performance optimization for high-throughput web applications.",
    notes:
      "Applied via LinkedIn with referral from Rahul. Strong match for core Next.js & UI engineering requirements. Need to follow up by next week if no response.",
    checklists: [
      { id: 1, label: "Submit Resume & Portfolio", done: true },
      { id: 2, label: "Optimize LinkedIn Profile", done: true },
      { id: 3, label: "Initial HR Screen", done: false },
      { id: 4, label: "Technical Live Coding Session", done: false },
      { id: 5, label: "System Design Round", done: false },
      { id: 6, label: "Bar Raiser Interview", done: false },
    ],
    interviewPrep: {
      focus: "UI Architecture, Performance, Component Design Pattern",
      questions: [
        {
          q: "How would you design a virtualized list in React from scratch?",
          a: "Explain how to calculate window offset, visible items container height, absolute positioning of child items, and handling dynamic row heights with resize observers.",
        },
        {
          q: "How does Stripe optimize API call performance and reliability?",
          a: "Discuss idempotency keys, robust client retries with exponential backoff, caching strategies, and localized edge workers.",
        },
        {
          q: "Describe your approach to state management in large scale micro-frontends.",
          a: "Talk about custom events, RxJS, lightweight atomic state tools like Jotai/Zustand, or clean React context splits to minimize rerenders.",
        },
      ],
    },
  },
  2: {
    id: 2,
    company: "Vercel",
    role: "Staff Engineer",
    location: "San Francisco, CA",
    salary: "$180k–$220k",
    status: "interview",
    date: "Jun 10",
    priority: "high",
    email: "jobs@vercel.com",
    url: "https://vercel.com/careers/staff-engineer",
    platform: "Company website",
    jobType: "Full-time",
    description:
      "Vercel is looking for a Staff Engineer to join our Core Frameworks group. You will guide the architectural future of Next.js, improve build times, and build next-generation compilation tools. You will act as a force multiplier for web developers worldwide.",
    notes:
      "Completed initial recruiter phone call. Hiring manager screen scheduled for this coming Thursday. Need to review Next.js Server Components, Turbopack, and rendering strategies.",
    checklists: [
      { id: 1, label: "Submit Resume & Portfolio", done: true },
      { id: 2, label: "Initial HR Screen", done: true },
      { id: 3, label: "Hiring Manager Conversation", done: false },
      { id: 4, label: "System Design & Turbopack Deep Dive", done: false },
      { id: 5, label: "Behavioral & Leadership panel", done: false },
    ],
    interviewPrep: {
      focus:
        "Next.js Core Architecture, Server Component Lifecycles, Edge Runtime",
      questions: [
        {
          q: "Explain the visual stream & suspense rendering pipeline in Next.js App Router.",
          a: "Discuss how server-side renders chunks of HTML, stream them over HTTP as RSC payloads, and how React hydrates placeholders progressively.",
        },
        {
          q: "What are the performance differences between static generation, server rendering, and PPR?",
          a: "Explain Partial Prerendering, combining static shell compiles with dynamic server-rendered chunks at runtime, minimizing time to first byte.",
        },
      ],
    },
  },
  3: {
    id: 3,
    company: "Linear",
    role: "Product Engineer",
    location: "Remote",
    salary: "$140k–$170k",
    status: "applied",
    date: "Jun 8",
    priority: "medium",
    email: "careers@linear.app",
    url: "https://linear.app/careers/product-engineer",
    platform: "LinkedIn",
    jobType: "Full-time",
    description:
      "We are seeking a Product Engineer to craft incredibly responsive user interfaces. Linear prioritizes keyboard shortcuts, near-instantaneous page transitions, and offline-first robust database syncing.",
    notes:
      "Applied directly on their careers page. Added a personalized cover note about my passion for high performance keyboard-driven productivity software.",
    checklists: [
      { id: 1, label: "Submit Resume & Cover Letter", done: true },
      { id: 2, label: "Take-home Coding challenge", done: false },
      { id: 3, label: "Technical Code Review", done: false },
      { id: 4, label: "Founder Chat", done: false },
    ],
    interviewPrep: {
      focus: "Offline-First Data Sync, UI Responsiveness, Keyboard Shortcuts",
      questions: [
        {
          q: "How would you implement keyboard navigation and hotkeys cleanly in React?",
          a: "Discuss custom hooks tracking global keydown listeners, managing focus rings dynamically, and mapping commands cleanly.",
        },
      ],
    },
  },
  5: {
    id: 5,
    company: "Notion",
    role: "Software Engineer",
    location: "Remote",
    salary: "$150k–$185k",
    status: "interview",
    date: "Jun 3",
    priority: "high",
    email: "recruiters@makenotion.com",
    url: "https://notion.so/careers",
    platform: "Indeed",
    jobType: "Full-time",
    description:
      "Notion is looking for engineers to design collaborative block-based document tools. You will solve issues surrounding multiplayer collaborative editors, rich canvas styling, and high-performance offline indexing.",
    notes:
      "Ready for round 2 technical interview. Prep questions on collaborative sync, CRDTs, and block editor architecture.",
    checklists: [
      { id: 1, label: "Submit Application", done: true },
      { id: 2, label: "Recruiter Intro", done: true },
      { id: 3, label: "Live Data Structures Assessment", done: true },
      { id: 4, label: "Collaborative Editing / Blocks Screen", done: false },
      { id: 5, label: "Architecture and Fit Interview", done: false },
    ],
    interviewPrep: {
      focus: "Collaborative editor sync, operational transform (OT) vs CRDTs",
      questions: [
        {
          q: "How do you handle real-time collaborative syncing for block documents?",
          a: "Discuss operational transform or conflict-free replicated data types, tracking local edits with lamport timestamps, and rendering remote cursors.",
        },
      ],
    },
  },
  6: {
    id: 6,
    company: "Loom",
    role: "React Developer",
    location: "Remote",
    salary: "$120k–$150k",
    status: "offer",
    date: "May 28",
    priority: "high",
    email: "talent@loom.com",
    url: "https://loom.com/careers",
    platform: "LinkedIn",
    jobType: "Full-time",
    description:
      "Join Loom to revolutionize work communication through fast, screen-sharing records. Focus on video player pipelines, interactive canvas drawings, and cloud storage streaming.",
    notes:
      "Offer letter received! $145k base salary + substantial equity. Reviewing terms and comparing details before making final decision.",
    checklists: [
      { id: 1, label: "Submit Application", done: true },
      { id: 2, label: "First Screen", done: true },
      { id: 3, label: "Technical Project Presentation", done: true },
      { id: 4, label: "Virtual Onsite Panel", done: true },
      { id: 5, label: "Negotiate Offer Details", done: true },
    ],
    interviewPrep: {
      focus: "Video streaming, Canvas overlays, Media APIs",
      questions: [
        {
          q: "How does browser screen capture work via WebRTC/MediaStream APIs?",
          a: "Talk about getUserMedia and getDisplayMedia, handling video resolutions, frames-per-second options, and pushing tracks into MediaRecorders.",
        },
      ],
    },
  },
};

// Generic Fallback generator for other IDs
const generateFallbackJob = (id) => {
  const genericCompanies = [
    "Google",
    "Meta",
    "Netflix",
    "Amazon",
    "Apple",
    "Airbnb",
    "Uber",
    "Lyft",
  ];
  const genericRoles = [
    "Senior Frontend Developer",
    "Full Stack Engineer",
    "Software Engineer",
    "React Architect",
  ];
  const genericLocations = [
    "Remote",
    "New York, NY",
    "Austin, TX",
    "Seattle, WA",
    "Remote (US/Canada)",
  ];
  const genericSalaries = [
    "$130k–$160k",
    "$140k–$180k",
    "$150k–$190k",
    "$160k–$210k",
  ];
  const genericPlatforms = [
    "LinkedIn",
    "Indeed",
    "Glassdoor",
    "Company website",
  ];

  const seed = parseInt(id) || 1;
  const company = genericCompanies[seed % genericCompanies.length];
  const role = genericRoles[seed % genericRoles.length];
  const location = genericLocations[seed % genericLocations.length];
  const salary = genericSalaries[seed % genericSalaries.length];
  const platform = genericPlatforms[seed % genericPlatforms.length];

  return {
    id: seed,
    company,
    role,
    location,
    salary,
    status: "applied",
    date: "Recently",
    priority: "medium",
    email: `careers@${company.toLowerCase().replace(/\s/g, "")}.com`,
    url: `https://${company.toLowerCase().replace(/\s/g, "")}.com/careers`,
    platform,
    jobType: "Full-time",
    description: `We are looking for a brilliant ${role} to join our engineering organization at ${company}. You will build and scale high-fidelity user interfaces, write highly testable components, and work alongside world-class designers and engineers.\n\nRequirements:\n• Solid experience in JavaScript/TypeScript, React, and modern web styles.\n• Passionate about micro-interactions and performance optimization.`,
    notes:
      "Added to tracker. Preparing custom portfolio updates and tailing my cover letter to match core competencies.",
    checklists: [
      { id: 1, label: "Submit Resume & Cover Letter", done: true },
      { id: 2, label: "Recruiter Screen", done: false },
      { id: 3, label: "Coding Hackerrank", done: false },
      { id: 4, label: "Onsite Panel", done: false },
    ],
    interviewPrep: {
      focus:
        "General Web fundamentals, React hooks, CSS layouts, and System Design",
      questions: [
        {
          q: "How do React hooks track state across separate component renders?",
          a: "Explain fiber nodes, internal linked lists inside functional components, and why rules of hooks require static declarations.",
        },
        {
          q: "Explain the box model, flexbox, and CSS grid responsiveness.",
          a: "Detail content, padding, border, margins, auto-scaling grids, and flex directions.",
        },
      ],
    },
  };
};

const JobDetailClient2 = ({ id }) => {
  // Try to load job, fallback to generated template
  const initialJobData = mockJobsData[id] || generateFallbackJob(id);

  const [job, setJob] = useState(initialJobData);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesText, setNotesText] = useState(job.notes || "");
  const [copiedLink, setCopiedLink] = useState(false);

  const handlePriorityChange = (newPriority) => {
    setJob((prev) => ({ ...prev, priority: newPriority }));
  };

  const saveNotes = () => {
    setJob((prev) => ({ ...prev, notes: notesText }));
    setIsEditingNotes(false);
  };

  const toggleChecklistItem = (itemId) => {
    setJob((prev) => ({
      ...prev,
      checklists: prev.checklists.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item,
      ),
    }));
  };

  const addChecklistItem = (label) => {
    if (!label.trim()) return;
    const newItem = {
      id: Date.now(),
      label,
      done: false,
    };
    setJob((prev) => ({
      ...prev,
      checklists: [...prev.checklists, newItem],
    }));
  };

  const copyJobLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const StatusIcon = columns[job.status]?.icon || Clock;
  const statusConfig = columns[job.status] || columns.applied;

  const priorityBadgeStyle = {
    high: "bg-red-500/10 border-red-500/30 text-red-400",
    medium: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    low: "bg-zinc-500/10 border-zinc-500/30 text-zinc-400",
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between pb-2">
        <Link
          href="/job-tracker"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Kanban Board</span>
        </Link>

        <button
          onClick={copyJobLink}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-zinc-300 hover:border-orange-500/30 hover:text-white transition-all duration-200 text-xs cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>{copiedLink ? "Copied!" : "Share Link"}</span>
        </button>
      </div>

      {/* Main Glassmorphic Header Card */}
      <div className="glass-card relative rounded-2xl p-6 md:p-8 overflow-hidden ">
        {/* Glow backdrop decorator */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start md:items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-orange-500/20 to-orange-400/5 border border-orange-500/30 flex items-center justify-center text-orange-400 font-extrabold text-2xl shadow-inner shrink-0">
              {job.company?.[0]}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {job.company}
                </h1>
                <span className="text-zinc-600 px-1">•</span>
                <span className="text-sm text-zinc-400 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {job.location}
                </span>
              </div>
              <p className="text-zinc-300 text-lg font-medium mt-1">
                {job.role}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="badge badge-primary font-semibold text-xs tracking-wide">
                  {job.jobType}
                </span>
                <span
                  className={`badge border text-xs font-semibold ${priorityBadgeStyle[job.priority]}`}
                >
                  {job.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-4 md:pt-0 md:border-0 shrink-0">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                Application Status
              </label>
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${statusConfig.color} font-bold text-sm`}
              >
                <StatusIcon className="w-4 h-4 shrink-0" />
                <span>{statusConfig.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Secondary Metadata Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            Estimated Salary
          </span>
          <span className="text-white text-base md:text-lg font-bold mt-2 truncate">
            {job.salary || "Not Specified"}
          </span>
        </div>

        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            Applied Date
          </span>
          <span className="text-white text-base md:text-lg font-bold mt-2 truncate">
            {job.date ? `Applied ${job.date}` : "Not Tracked"}
          </span>
        </div>

        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            Platform Source
          </span>
          <span className="text-white text-base md:text-lg font-bold mt-2 truncate">
            {job.platform || "Direct"}
          </span>
        </div>

        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            Contact Email
          </span>
          <a
            href={job.email ? `mailto:${job.email}` : "#"}
            className="text-orange-400 hover:text-orange-300 text-sm md:text-base font-bold mt-2 truncate underline decoration-orange-500/30"
          >
            {job.email || "No Email Provided"}
          </a>
        </div>
      </div>

      {/* Main Tabbed Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column - 2/3 Width: Interactive Tabs & Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Custom Tabs Navigation */}
          <div className="flex border-b border-white/5 bg-black/20 p-1.5 rounded-xl gap-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === "profile"
                  ? "bg-gradient-to-tr from-orange-500 to-orange-600 text-white shadow-md glow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Job Profile
            </button>
            <button
              onClick={() => setActiveTab("checklist")}
              className={`flex-1 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === "checklist"
                  ? "bg-gradient-to-tr from-orange-500 to-orange-600 text-white shadow-md glow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Notes & Checklist
            </button>
            <button
              onClick={() => setActiveTab("prep")}
              className={`flex-1 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === "prep"
                  ? "bg-gradient-to-tr from-orange-500 to-orange-600 text-white shadow-md glow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Interview Prep Guide
            </button>
          </div>

          {/* TAB CONTENT: PROFILE */}
          {activeTab === "profile" && (
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Building className="w-5 h-5 text-orange-500" />
                  Job Description
                </h3>
                <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-black/20 p-4 rounded-xl border border-white/5">
                  {job.description || "No job description added yet."}
                </div>
              </div>

              {job.url && (
                <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-gradient-bg-card">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-sky-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Original Posting URL
                      </h4>
                      <p className="text-xs text-zinc-500 truncate max-w-[200px] md:max-w-md">
                        {job.url}
                      </p>
                    </div>
                  </div>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg text-xs font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <span>Visit Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: CHECKLIST & NOTES */}
          {activeTab === "checklist" && (
            <div className="space-y-6">
              {/* Detailed Notes Editor */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-orange-500" />
                    Application Notes
                  </h3>
                  {!isEditingNotes ? (
                    <button
                      onClick={() => setIsEditingNotes(true)}
                      className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit Notes
                    </button>
                  ) : (
                    <button
                      onClick={saveNotes}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Changes
                    </button>
                  )}
                </div>

                {isEditingNotes ? (
                  <div className="space-y-3">
                    <textarea
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                      className="w-full h-36 bg-black/40 border border-white/10 rounded-xl text-white p-3 text-sm focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-zinc-600"
                      placeholder="Type details, referrals, interview stages details or follow ups here..."
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setNotesText(job.notes || "");
                          setIsEditingNotes(false);
                        }}
                        className="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-xs rounded-lg font-semibold hover:bg-zinc-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveNotes}
                        className="px-3 py-1.5 bg-orange-500 text-white text-xs rounded-lg font-semibold hover:bg-orange-600 cursor-pointer"
                      >
                        Save Notes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-zinc-300 text-sm leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5 min-h-[80px]">
                    {job.notes ? (
                      job.notes
                    ) : (
                      <span className="text-zinc-500 italic">
                        No notes created yet. Click 'Edit Notes' to add your
                        custom tracking records.
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Milestones / Checklist */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-orange-500" />
                  Application Checklist & Milestones
                </h3>

                <div className="space-y-2.5">
                  {job.checklists && job.checklists.length > 0 ? (
                    job.checklists.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-black/10 cursor-pointer hover:border-orange-500/25 transition-all duration-200 ${
                          item.done ? "opacity-60" : ""
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                            item.done
                              ? "bg-emerald-500 border-emerald-600 text-white"
                              : "border-white/20 text-transparent"
                          }`}
                        >
                          <svg
                            className="w-3 h-3 stroke-[3]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span
                          className={`text-sm text-zinc-300 font-medium ${
                            item.done ? "line-through text-zinc-500" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-500 text-sm italic">
                      No custom milestone items created.
                    </p>
                  )}
                </div>

                {/* Add Quick Checklist Item */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.target.elements.newItem;
                    addChecklistItem(input.value);
                    input.value = "";
                  }}
                  className="mt-4 flex gap-2"
                >
                  <input
                    name="newItem"
                    type="text"
                    placeholder="Add a new tracking milestone (e.g. Follow-up email sent)..."
                    className="flex-1 bg-black/35 border border-white/10 rounded-xl text-white px-3.5 py-2 text-xs focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-zinc-800 border border-white/5 text-white text-xs font-bold rounded-xl hover:bg-orange-500 hover:border-orange-600 transition-all duration-200 cursor-pointer shrink-0"
                  >
                    Add Item
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB CONTENT: AI INTERVIEW PREP */}
          {activeTab === "prep" && (
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-bold text-white">
                  AI-Tailored Interview Prep
                </h3>
              </div>

              <div className="p-4 rounded-xl border border-orange-500/10 bg-orange-500/5 text-zinc-300 text-sm leading-relaxed flex gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block mb-0.5">
                    Automated Role Analysis
                  </span>
                  Based on the job title{" "}
                  <span className="text-orange-300 font-semibold">
                    {job.role}
                  </span>
                  , we suggest preparing details about:{" "}
                  <span className="font-bold text-zinc-200">
                    {job.interviewPrep?.focus ||
                      "Core system concepts, React APIs, and responsive design systems."}
                  </span>
                </div>
              </div>

              {job.interviewPrep?.questions &&
              job.interviewPrep.questions.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-400">
                    Role-Specific Questions & Suggested Responses
                  </h4>

                  {job.interviewPrep.questions.map((qItem, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-white/5 bg-black/20 space-y-2.5 hover:border-orange-500/10 transition-colors"
                    >
                      <div className="flex gap-2">
                        <span className="text-orange-400 font-extrabold text-sm shrink-0">
                          Q{index + 1}:
                        </span>
                        <h5 className="text-white font-bold text-sm leading-snug">
                          {qItem.q}
                        </h5>
                      </div>
                      <div className="flex gap-2 text-zinc-300 text-xs pl-5 border-l border-white/5 ml-2.5">
                        <div className="space-y-1">
                          <span className="text-emerald-400 font-bold block uppercase tracking-wider text-[10px]">
                            Recommended Approach:
                          </span>
                          <p className="leading-relaxed text-zinc-400">
                            {qItem.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 italic text-sm">
                  No specific questions configured for this role template.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column - 1/3 Width: Quick Tips, Priorities & Progress Summary */}
        <div className="space-y-6">
          {/* Priority Card */}
          <div className="glass-card rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              Tracking Priorities
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Mark how high of a priority this role is in your current search.
            </p>

            <div className="flex gap-2 pt-1">
              {["low", "medium", "high"].map((p) => (
                <button
                  key={p}
                  onClick={() => handlePriorityChange(p)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
                    job.priority === p
                      ? p === "high"
                        ? "bg-red-500/20 border-red-500/50 text-red-400 font-extrabold shadow-sm"
                        : p === "medium"
                          ? "bg-amber-500/20 border-amber-500/50 text-amber-400 font-extrabold shadow-sm"
                          : "bg-zinc-500/20 border-zinc-500/50 text-zinc-300 font-extrabold shadow-sm"
                      : "bg-black/10 border-white/5 text-zinc-500 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Tracking Checklist Progress */}
          <div className="glass-card rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Milestone Progress
            </h4>

            {job.checklists && job.checklists.length > 0 ? (
              <div className="space-y-2">
                {(() => {
                  const completed = job.checklists.filter(
                    (item) => item.done,
                  ).length;
                  const total = job.checklists.length;
                  const percentage =
                    total > 0 ? Math.round((completed / total) * 100) : 0;

                  return (
                    <>
                      <div className="flex justify-between text-xs font-semibold text-zinc-400">
                        <span>Stages Complete</span>
                        <span className="text-white font-extrabold">
                          {percentage}% ({completed}/{total})
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800/80 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="progress-bar"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <p className="text-zinc-500 text-xs italic">No stages tracked.</p>
            )}
          </div>

          {/* Pro tips banner */}
          <div className="glass-card rounded-xl p-5 border-l-2 border-l-orange-500 bg-gradient-bg-card space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Developer Pro-Tip
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              When applying to roles, always follow up with direct hiring
              managers on LinkedIn or via email exactly 5 business days after
              submission. It boosts your call-back rate by 45%!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailClient2;
