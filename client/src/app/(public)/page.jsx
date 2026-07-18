import Link from "next/link";
import {
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  ChevronDown,
  FileText,
  BarChart2,
  MessageSquare,
  Briefcase,
  TrendingUp,
  Shield,
  Users,
  Award,
  Play,
  Mail,
  Share2,
  Link2,
  GitBranch,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────────────── */
const features = [
  {
    icon: FileText,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    title: "AI Resume Scoring",
    desc: "Get instant ATS scores, keyword analysis, and actionable suggestions to make your resume stand out.",
  },
  {
    icon: Briefcase,
    color: "text-orange-300",
    bg: "bg-orange-400/10",
    title: "Smart Job Tracker",
    desc: "Organise every application in a visual kanban board. Never lose track of a promising opportunity.",
  },
  {
    icon: MessageSquare,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    title: "Interview Prep AI",
    desc: "Practice with our AI interviewer, get real-time feedback, and walk into every interview with confidence.",
  },
  {
    icon: BarChart2,
    color: "text-orange-200",
    bg: "bg-orange-300/10",
    title: "Career Analytics",
    desc: "Deep insights into your application funnel, response rates, and skill gaps vs market demand.",
  },
  {
    icon: TrendingUp,
    color: "text-amber-300",
    bg: "bg-amber-400/10",
    title: "Market Intelligence",
    desc: "Real-time salary benchmarks, in-demand skills, and company insights tailored to your profile.",
  },
  {
    icon: Shield,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    title: "Privacy First",
    desc: "Your data is encrypted end-to-end. We never sell your information or share it with employers.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer @ Stripe",
    avatar: "SC",
    rating: 5,
    quote:
      "CareerPilot helped me land my dream job in 6 weeks. The AI resume scoring was a game-changer — my callback rate went from 8% to 34%.",
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager @ Vercel",
    avatar: "MJ",
    rating: 5,
    quote:
      "The interview prep AI is incredible. I practiced 20+ mock interviews and walked into every real one feeling completely prepared.",
  },
  {
    name: "Priya Nair",
    role: "Data Scientist @ Notion",
    avatar: "PN",
    rating: 5,
    quote:
      "The analytics dashboard showed me exactly which skills I was missing. I upskilled in 3 weeks and got 4 offers simultaneously.",
  },
  {
    name: "Alex Rivera",
    role: "Frontend Dev @ Linear",
    avatar: "AR",
    rating: 5,
    quote:
      "I was applying blindly for months. CareerPilot's job tracker and market intelligence completely transformed my strategy.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for getting started with your job search.",
    features: [
      "5 resume analyses/month",
      "Basic job tracker (10 jobs)",
      "Interview prep (3 sessions)",
      "Email support",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    desc: "Everything you need to land your next role faster.",
    features: [
      "Unlimited resume analyses",
      "Unlimited job tracking",
      "Unlimited AI mock interviews",
      "Career analytics dashboard",
      "Market intelligence reports",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    desc: "For career coaches and recruiting teams.",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared analytics dashboard",
      "Custom branding",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const faqs = [
  {
    q: "How does the AI resume scoring work?",
    a: "Our AI analyses your resume against thousands of job descriptions, checking for ATS compatibility, keyword density, formatting, and quantified achievements. You get a score out of 100 with specific, actionable suggestions.",
  },
  {
    q: "Is my data safe and private?",
    a: "Absolutely. All data is encrypted at rest and in transit using AES-256. We never share your information with employers or third parties. You can delete your account and all data at any time.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel at any time with no questions asked. Your Pro features remain active until the end of your billing period.",
  },
  {
    q: "How accurate is the AI interview feedback?",
    a: "Our AI is trained on thousands of real interview transcripts and feedback from hiring managers at top tech companies. It evaluates clarity, structure, relevance, and confidence indicators.",
  },
  {
    q: "Does CareerPilot work for non-tech roles?",
    a: "Yes! While we have deep expertise in tech roles, CareerPilot works for any professional role — finance, marketing, design, operations, and more.",
  },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "3.2x", label: "Faster Job Search" },
  { value: "89%", label: "Interview Success Rate" },
  { value: "4.9★", label: "Average Rating" },
];

/* ── FAQ Item ─────────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  return (
    <details className="group glass-card rounded-2xl overflow-hidden">
      <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none">
        <span className="text-white font-semibold text-sm sm:text-base">
          {q}
        </span>
        <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5">
        <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
      </div>
    </details>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
            style={{ background: "rgba(255,87,34,0.07)" }}
          />
          <div
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
            style={{ background: "rgba(255,112,67,0.05)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px]"
            style={{ background: "rgba(255,138,101,0.04)" }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container relative z-10 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 badge badge-primary mb-6 animate-fade-in-up">
              <Zap className="w-3 h-3" />
              AI-Powered Career Intelligence Platform
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 animate-fade-in-up delay-100">
              Land your <span className="gradient-text">dream job</span>
              <br />
              3x faster with AI
            </h1>

            {/* Subheadline */}
            <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up delay-200">
              CareerPilot uses advanced AI to optimise your resume, track
              applications, prep for interviews, and surface the right
              opportunities — all in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
              <Link
                href="/register"
                className="btn-primary !h-12 !px-8 !text-base glow-sm w-full sm:w-auto"
              >
                Start for Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#features"
                className="btn-secondary !h-12 !px-8 !text-base w-full sm:w-auto"
              >
                <Play className="w-4 h-4" /> See How It Works
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-secondary)] animate-fade-in-up delay-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> No credit
                card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Free plan
                forever
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Cancel
                anytime
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto animate-fade-in-up delay-500">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-card rounded-2xl p-5 text-center"
              >
                <p className="text-2xl sm:text-3xl font-black gradient-text">
                  {s.value}
                </p>
                <p className="text-[var(--color-text-secondary)] text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <div className="badge badge-primary inline-flex mb-4">
              <Zap className="w-3 h-3" /> Features
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Everything you need to{" "}
              <span className="gradient-text">accelerate</span> your career
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Six powerful AI tools working together to give you an unfair
              advantage in your job search.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="glass-card card-hover rounded-2xl p-6 group"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {f.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container">
          <div className="text-center mb-16">
            <div className="badge badge-primary inline-flex mb-4">
              <Play className="w-3 h-3" /> How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              From signup to <span className="gradient-text">offer letter</span>{" "}
              in 4 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Upload Your Resume",
                desc: "Drop in your existing resume and get an instant AI-powered score and analysis.",
                icon: FileText,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
              },
              {
                step: "02",
                title: "Optimise & Apply",
                desc: "Follow AI suggestions to boost your ATS score, then track every application.",
                icon: TrendingUp,
                color: "text-orange-300",
                bg: "bg-orange-400/10",
              },
              {
                step: "03",
                title: "Prep for Interviews",
                desc: "Practice with our AI interviewer tailored to the specific role and company.",
                icon: MessageSquare,
                color: "text-amber-400",
                bg: "bg-amber-500/10",
              },
              {
                step: "04",
                title: "Land the Offer",
                desc: "Use salary insights and negotiation tips to secure the best possible package.",
                icon: Award,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative glass-card rounded-2xl p-6 card-hover"
                >
                  <div className="absolute top-4 right-4 text-4xl font-black text-white/5">
                    {item.step}
                  </div>
                  <div
                    className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <div className="badge badge-primary inline-flex mb-4">
              <Star className="w-3 h-3" /> Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Loved by <span className="gradient-text">50,000+</span>{" "}
              professionals
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Real stories from real people who transformed their careers with
              CareerPilot.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="glass-card card-hover rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg-primary flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-black">
                      {t.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-[var(--color-text-secondary)] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section
        id="pricing"
        className="section-padding bg-[var(--color-surface)]"
      >
        <div className="container">
          <div className="text-center mb-16">
            <div className="badge badge-primary inline-flex mb-4">
              <Zap className="w-3 h-3" /> Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Simple, <span className="gradient-text">transparent</span> pricing
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Start free. Upgrade when you're ready. No hidden fees, ever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col gap-5 ${
                  plan.highlight ? "glow-border border" : "glass-card"
                }`}
                style={
                  plan.highlight
                    ? {
                        background:
                          "linear-gradient(to bottom, rgba(255,87,34,0.10), rgba(255,112,67,0.04))",
                        borderColor: "rgba(255,87,34,0.30)",
                      }
                    : {}
                }
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge badge-primary text-[10px] px-3 py-1">
                      Most Popular
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-zinc-400 text-sm font-semibold mb-1">
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-white">
                      {plan.price}
                    </span>
                    <span className="text-[var(--color-text-secondary)] text-sm mb-1">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-xs mt-2">{plan.desc}</p>
                </div>

                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-zinc-300"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={
                    plan.highlight
                      ? "btn-primary !w-full !justify-center"
                      : "btn-secondary !w-full !justify-center"
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section-padding">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <div className="badge badge-primary inline-flex mb-4">FAQ</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section-padding">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden glass-card p-10 sm:p-16 text-center">
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[80px] rounded-full"
                style={{ background: "rgba(255,87,34,0.08)" }}
              />
            </div>
            <div className="relative z-10">
              <div className="badge badge-primary inline-flex mb-6">
                <Zap className="w-3 h-3" /> Limited Time — Free Pro Trial
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                Ready to land your{" "}
                <span className="gradient-text">dream job?</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
                Join 50,000+ professionals who are already using CareerPilot to
                accelerate their careers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="btn-primary !h-12 !px-10 !text-base glow-md w-full sm:w-auto"
                >
                  Start for Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="btn-secondary !h-12 !px-10 !text-base w-full sm:w-auto"
                >
                  Sign In
                </Link>
              </div>
              <p className="text-zinc-600 text-xs mt-5">
                No credit card required · Free plan forever · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="p-10 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="container py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg gradient-bg-primary flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-black text-white">CareerPilot</span>
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
                AI-powered career intelligence to help you land your dream job
                faster.
              </p>
              <div className="flex items-center gap-3">
                {[Share2, Link2, GitBranch].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-white/10 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Changelog", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press"],
              },
              {
                title: "Legal",
                links: [
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Security",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-white text-sm font-semibold mb-3">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-[var(--color-text-secondary)] text-sm hover:text-zinc-300 transition-colors"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-zinc-600 text-xs">
              © 2026 CareerPilot AI. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
              <Mail className="w-3 h-3" />
              <Link
                href="mailto:hello@careerpilot.ai"
                className="hover:text-zinc-400 transition-colors"
              >
                hello@careerpilot.ai
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
