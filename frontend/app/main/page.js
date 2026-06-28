"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import {
  MdOutlineQuiz,
  MdBarChart,
  MdTrendingUp,
  MdArrowForward,
  MdCheckCircle,
  MdCancel,
  MdAccessTime,
  MdAutoAwesome,
} from "react-icons/md";

// ── MOCK DATA (replace with real API calls) ───────────

const subjectOptions = [
  { code: "9702", name: "Physics" },
  { code: "9701", name: "Chemistry" },
  { code: "9700", name: "Biology" },
  
];

const recentSessions = [
  { subject: "Physics", level: "AS", score: 28, total: 40, date: "Today, 2:14 PM" },
  { subject: "Mathematics", level: "AS", score: 35, total: 40, date: "2 days ago" },
];

const topicProgress = [
  { topic: "Mechanics", pct: 72, color: "bg-blue-500" },
  { topic: "Electricity", pct: 85, color: "bg-green-500" },
  { topic: "Waves", pct: 54, color: "bg-amber-400" },
  { topic: "Thermal Physics", pct: 61, color: "bg-purple-500" },
  { topic: "Particle Physics", pct: 40, color: "bg-rose-400" },
];

const statCards = [
  { label: "Quizzes Taken", value: "24", icon: MdOutlineQuiz, color: "bg-blue-50 text-blue-600" },
  { label: "Questions Solved", value: "860", icon: MdBarChart, color: "bg-green-50 text-green-600" },
  { label: "Overall Accuracy", value: "68%", icon: MdTrendingUp, color: "bg-purple-50 text-purple-600" },
  { label: "Avg. Time / Q", value: "42s", icon: MdAccessTime, color: "bg-amber-50 text-amber-600" },
];

// ── SUB-COMPONENTS ────────────────────────────────────

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="text-xl" />
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900 leading-tight">{value}</p>
      </div>
    </div>
  );
}

function QuickGenerate() {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-1">
        <MdAutoAwesome className="text-amber-400 text-lg" />
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Quick Generate</span>
      </div>
      <h2 className="text-xl font-bold mb-5">Start a practice test</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">Subject</label>
          <select className="bg-slate-800 text-white text-sm rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {subjectOptions.map(({ code, name }) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">Level</label>
          <select className="bg-slate-800 text-white text-sm rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>AS Level</option>
          </select>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">Questions</label>
          <select className="bg-slate-800 text-white text-sm rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>10 questions</option>
            <option>20 questions</option>
            <option>40 questions</option>
          </select>
        </div>
      </div>

      <Link
        href="/main/practice"
        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition text-sm mt-1"
      >
        Generate Test <MdArrowForward />
      </Link>
    </div>
  );
}

function RecentSessions() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-900">Recent Sessions</h3>
        <Link href="/main/results" className="text-xs text-blue-600 hover:underline font-medium">
          View all
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {recentSessions.map(({ subject, level, score, total, date }, i) => {
          const pct = Math.round((score / total) * 100);
          const good = pct >= 70;
          return (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${good ? "bg-green-50" : "bg-rose-50"}`}>
                {good
                  ? <MdCheckCircle className="text-green-500 text-lg" />
                  : <MdCancel className="text-rose-400 text-lg" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{subject}
                  <span className="ml-2 text-xs font-normal text-slate-400">{level}</span>
                </p>
                <p className="text-xs text-slate-400">{date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-slate-900">{score}/{total}</p>
                <p className={`text-xs font-semibold ${good ? "text-green-500" : "text-rose-400"}`}>{pct}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopicBreakdown() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-900">Topic Accuracy</h3>
        <span className="text-xs text-slate-400">Physics · AS</span>
      </div>

      <div className="flex flex-col gap-4">
        {topicProgress.map(({ topic, pct, color }) => (
          <div key={topic}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-700 font-medium">{topic}</span>
              <span className={`font-bold ${pct >= 70 ? "text-green-600" : pct >= 55 ? "text-amber-500" : "text-rose-500"}`}>
                {pct}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${color}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-5 leading-relaxed">
        Topics below 60% will appear more frequently in your next adaptive quiz.
      </p>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuth();

  const firstName = user?.name?.split(" ")[0] ?? "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Here's your revision overview. Pick up where you left off.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {statCards.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Quick generate — full width */}
      <div className="mb-6">
        <QuickGenerate />
      </div>

      {/* Bottom two columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentSessions />
        <TopicBreakdown />
      </div>

    </div>
  );
}
