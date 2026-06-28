"use client";

import Navbar from "../components/navbar";
import {
  MdShuffle,
  MdCheckCircle,
  MdBarChart,
  MdTrendingUp,
  MdLightbulb,
  MdMenuBook,
  MdArrowForward,
  MdStar,
  MdExpandMore,
} from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

// ── DATA ──────────────────────────────────────────────

const stats = [
  { value: "10,000+", label: "Real Past-Paper Questions" },
  { value: "2018–2025", label: "Year Coverage" },
  { value: "15+", label: "CAIE Subjects" },
  { value: "40", label: "Questions Per Test" },
];

const features = [
  {
    icon: MdShuffle,
    title: "Never Repeat the Same Test",
    desc: "Questions are drawn randomly from thousands of past-paper items across different years, sessions, and papers. Every practice session is unique.",
  },
  {
    icon: MdCheckCircle,
    title: "Instant Results & Source Tracing",
    desc: "Submit and immediately see your score. Each question shows your choice, the correct answer, and the exact source — year, session, and paper number.",
  },
  {
    icon: MdBarChart,
    title: "Topic-Level Weakness Tracking",
    desc: "Performance is broken down by topic. If your Mechanics accuracy is 55% and Waves is 60%, the dashboard tells you before the exam does.",
  },
  {
    icon: MdTrendingUp,
    title: "Progress Over Time",
    desc: "Track total quizzes, questions answered, accuracy trends, and your strongest and weakest areas — all in a single clean dashboard.",
  },
  {
    icon: MdLightbulb,
    title: "AI Step-by-Step Explanations",
    desc: "Stuck on a question? Hit Explain Answer and the AI walks through the reasoning step by step — not just the answer, but why it's correct.",
  },
  {
    icon: MdMenuBook,
    title: "Adaptive Quiz Generation",
    desc: "The system detects your weak topics and automatically increases their frequency in your next session — so you spend time where it counts.",
  },
];

const steps = [
  {
    n: "01",
    title: "Choose Your Subject & Level",
    desc: "Select from Physics, Chemistry, Mathematics, and more. Pick AS or A2. That's all the setup there is.",
  },
  {
    n: "02",
    title: "Generate a Unique Practice Test",
    desc: "The system instantly builds a randomised quiz from thousands of questions spanning 2010 to 2025. 10, 20, or 40 questions — your choice.",
  },
  {
    n: "03",
    title: "Attempt at Your Own Pace",
    desc: "No countdown timer forcing errors. Work through each question thoughtfully, just as you would in a real revision session.",
  },
  {
    n: "04",
    title: "Review, Score & Track Progress",
    desc: "See your results immediately. Every wrong answer links back to its source paper. Your weak topics update automatically after each session.",
  },
];

const subjects = [
  { code: "9702", name: "Physics", levels: "AS / A2" },
  { code: "9701", name: "Chemistry", levels: "AS / A2" },
  { code: "9709", name: "Mathematics", levels: "AS / A2" },
  { code: "9700", name: "Biology", levels: "AS / A2" },
  { code: "9608", name: "Computer Science", levels: "AS / A2" },
  { code: "9706", name: "Accounting", levels: "AS / A2" },
  { code: "9708", name: "Economics", levels: "AS / A2" },
  { code: "9093", name: "English Language", levels: "AS / A2" },
];

const reviewCards = [
  {
    q: "Which of the following is a vector quantity?",
    your: "B",
    correct: "D",
    source: "Physics 9702 · MJ 2022 · Paper 12",
    ok: false,
  },
  {
    q: "A wave has frequency 500 Hz and speed 340 m/s. What is its wavelength?",
    your: "C",
    correct: "C",
    source: "Physics 9702 · ON 2023 · Paper 11",
    ok: true,
  },
  {
    q: "Which resistor circuit has the greatest combined resistance?",
    your: "A",
    correct: "A",
    source: "Physics 9702 · MJ 2021 · Paper 13",
    ok: true,
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    highlight: false,
    perks: [
      "20 questions per day",
      "Basic score & answer review",
      "Access to 2 subjects",
      "Last 3 years of papers",
    ],
    cta: "Start Free",
  },
  {
    name: "Premium",
    price: "$5",
    period: "/ month",
    highlight: true,
    perks: [
      "Unlimited daily practice",
      "All subjects & both levels",
      "Full 2018–2025 coverage",
      "AI step-by-step explanations",
      "Weakness tracking by topic",
      "Adaptive quiz generation",
      "Detailed progress dashboard",
    ],
    cta: "Get Premium",
  },
];

const faqs = [
  {
    q: "Where do the questions come from?",
    a: "All questions are sourced directly from official Cambridge International AS & A Level past papers (2018–2025). They are processed and stored in a structured database — no manual entry.",
  },
  {
    q: "Is this affiliated with Cambridge Assessment?",
    a: "No. MCQPrepCAIE is an independent study tool built to help students practice using publicly available past-paper content. It is not affiliated with or endorsed by Cambridge Assessment International Education.",
  },
  {
    q: "How is this different from downloading past papers?",
    a: "Past papers give you one paper at a time in a fixed order. MCQPrepCAIE mixes questions from across 7+ years and multiple papers into a single personalised session — and tracks what you get wrong.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Yes. The platform is fully responsive and works on any device — phone, tablet, or desktop.",
  },
  {
    q: "What subjects are available?",
    a: "Physics, Chemistry, Mathematics, Biology, Computer Science, Accounting, Economics, and English Language are live. More subjects are added regularly.",
  },
  {
    q: "When do AI explanations become available?",
    a: "AI explanations are a Premium feature and are available on the current plan. Each explanation is generated on demand for the specific question you're reviewing.",
  },
];

// ── SECTION LABEL ─────────────────────────────────────

function Label({ children }) {
  return (
    <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

// ── HERO ──────────────────────────────────────────────

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 pb-20 bg-white relative overflow-hidden">
      {/* Soft background blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
          <MdStar size={13} />
          Cambridge AS &amp; A Level · Past Papers 2018–2025
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
          Practice Smarter.<br />
          <span className="text-blue-600">Score Higher.</span>
        </h1>

        <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          MCQPrepCAIE builds personalised practice tests from thousands of real Cambridge past-paper questions.
          Select your subject, pick your level, and get a unique test every time.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="/main"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition text-sm shadow-md shadow-blue-200"
          >
            Generate a Free Test <MdArrowForward />
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900 bg-white px-7 py-3.5 rounded-xl transition text-sm"
          >
            See All Features
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROBLEM STRIP ─────────────────────────────────────

function ProblemStrip() {
  const problems = [
    "Downloading dozens of past papers",
    "Searching manually for relevant questions",
    "Repeating the same papers over and over",
    "No visibility into weak topics",
  ];
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-14 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Label>The Problem</Label>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Traditional MCQ revision is inefficient
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {problems.map((p) => (
            <div key={p} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 text-left">
              <span className="w-2 h-2 bg-red-400 rounded-full shrink-0" />
              <span className="text-sm text-gray-600">{p}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-8">
          MCQPrepCAIE replaces all of this with one platform that does the heavy lifting for you.
        </p>
      </div>
    </section>
  );
}

// ── FEATURES ──────────────────────────────────────────

function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Label>Features</Label>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything built around how students improve
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-base">
            Not another PDF library. A system designed specifically for targeted, measurable revision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md hover:shadow-blue-50 transition group bg-white"
            >
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
                <Icon className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-gray-900 font-semibold text-base mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HOW IT WORKS ──────────────────────────────────────

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-gray-50 border-b border-gray-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Label>How it Works</Label>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From subject selection to detailed results in minutes
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">No downloads, no setup. Just open and start practising.</p>
        </div>

        <div className="flex flex-col">
          {steps.map(({ n, title, desc }, i) => (
            <div key={n} className="flex gap-8 items-start">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md shadow-blue-200">
                  {n}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-blue-100 my-2 min-h-[52px]" />
                )}
              </div>
              <div className="pb-10">
                <h3 className="text-gray-900 font-semibold text-base mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── REVIEW PREVIEW ────────────────────────────────────

function ReviewPreview() {
  return (
    <section className="py-24 px-6 bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Label>Answer Review</Label>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Know exactly where you went wrong — and why
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Every question reveals your answer, the correct one, and the original source paper with a single click.
          </p>
        </div>

        {/* Score banner */}
        <div className="bg-blue-600 rounded-2xl p-6 mb-4 flex flex-wrap gap-6 items-center justify-between text-white shadow-lg shadow-blue-200">
          <div>
            <div className="text-xs text-blue-200 uppercase tracking-wider mb-1">Your Score</div>
            <div className="text-4xl font-bold">28 <span className="text-blue-300 text-xl font-normal">/ 40</span></div>
          </div>
          <div className="flex gap-10">
            <div className="text-center">
              <div className="text-3xl font-bold">70%</div>
              <div className="text-xs text-blue-200 mt-1">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">40</div>
              <div className="text-xs text-blue-200 mt-1">Questions</div>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="flex flex-col gap-3">
          {reviewCards.map(({ q, your, correct, source, ok }, i) => (
            <div
              key={i}
              className={`border rounded-xl p-5 bg-white ${
                ok ? "border-green-300" : "border-red-300"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="text-gray-800 text-sm">{q}</p>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                    ok
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-red-50 text-red-500 border border-red-200"
                  }`}
                >
                  {ok ? "Correct" : "Incorrect"}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                <span>
                  Your answer:{" "}
                  <span className={ok ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                    {your}
                  </span>
                </span>
                <span>
                  Correct: <span className="text-green-600 font-semibold">{correct}</span>
                </span>
                <span className="text-gray-300">Source: {source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SUBJECTS ──────────────────────────────────────────

function Subjects() {
  return (
    <section id="subjects" className="py-24 px-6 bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Label>Past Papers Coverage</Label>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All major CAIE subjects, both levels
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Full AS and A2 coverage. More subjects added regularly as papers are processed.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map(({ code, name, levels }) => (
            <div
              key={code}
              className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-50 rounded-2xl p-5 transition cursor-pointer group"
            >
              <div className="text-xs text-blue-600 font-mono font-semibold mb-2">{code}</div>
              <div className="text-gray-900 font-semibold text-sm mb-1">{name}</div>
              <div className="text-gray-400 text-xs">{levels}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PRICING ───────────────────────────────────────────

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Label>Pricing</Label>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, honest pricing</h2>
          <p className="text-gray-500">Start free. Upgrade when you want the full experience.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {plans.map(({ name, price, period, highlight, perks, cta }) => (
            <div
              key={name}
              className={`rounded-2xl p-8 border ${
                highlight
                  ? "bg-blue-600 border-blue-600 shadow-2xl shadow-blue-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`font-bold text-xl ${highlight ? "text-white" : "text-gray-900"}`}>
                  {name}
                </h3>
                {highlight && (
                  <span className="text-xs bg-white/20 text-white px-3 py-0.5 rounded-full font-semibold border border-white/30">
                    Most Popular
                  </span>
                )}
              </div>

              <div className="mb-8">
                <span className={`text-5xl font-bold ${highlight ? "text-white" : "text-gray-900"}`}>
                  {price}
                </span>
                <span className={`text-sm ml-1 ${highlight ? "text-blue-200" : "text-gray-400"}`}>
                  {period}
                </span>
              </div>

              <ul className="flex flex-col gap-3 mb-8">
                {perks.map((f) => (
                  <li key={f} className={`flex items-center gap-2.5 text-sm ${highlight ? "text-blue-100" : "text-gray-600"}`}>
                    <MdCheckCircle className={`${highlight ? "text-white" : "text-blue-500"} shrink-0 text-base`} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/main"
                className={`block text-center font-semibold text-sm py-3 rounded-xl transition ${
                  highlight
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-24 px-6 bg-gray-50 border-b border-gray-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Label>FAQ</Label>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Common questions</h2>
          <p className="text-gray-500">Everything you need to know before getting started.</p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-gray-900 font-medium text-sm">{q}</span>
                <MdExpandMore
                  className={`text-gray-400 shrink-0 text-xl transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA BANNER ────────────────────────────────────────

function CTABanner() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your next exam is closer than you think.
        </h2>
        <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
          Join CAIE students who trade endless PDF downloads for targeted, measurable practice
          that shows exactly what to fix.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/main"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition text-base shadow-lg shadow-blue-200"
          >
            Start Practising Free <MdArrowForward size={18} />
          </a>
          <a
            href="#pricing"
            className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900 bg-white px-8 py-4 rounded-xl transition text-base"
          >
            View Pricing
          </a>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-gray-200 py-10 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-2 font-bold text-gray-800">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">MCQ</span>
          PrepCAIE
        </div>
        <p>© 2025 MCQPrepCAIE. Independent study tool for CAIE students.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-700 transition">Privacy</a>
          <a href="#" className="hover:text-gray-700 transition">Terms</a>
          <a href="#" className="hover:text-gray-700 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/main");
    }
  }, [user, loading, router]);

  // Avoid flashing the landing page while checking auth
  if (loading || user) return null;

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <ProblemStrip />
        <Features />
        <HowItWorks />
        <ReviewPreview />
        <Subjects />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
