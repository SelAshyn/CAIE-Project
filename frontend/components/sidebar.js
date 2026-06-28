"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdOutlineQuiz, MdBarChart, MdSettings, MdLogout } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/main", icon: MdDashboard },
  { label: "Practice", href: "/main/practice", icon: MdOutlineQuiz },
  { label: "Results", href: "/main/results", icon: MdBarChart },
  { label: "Settings", href: "/main/settings", icon: MdSettings },
];

export function SideBar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Derive initials for avatar fallback
  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "??";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white px-4 py-4 text-slate-900">
      <div className="border-b border-slate-200 pb-4 text-center">
        <h1 className="text-[2rem] font-black leading-none tracking-tight text-slate-900">
          MCQPrep
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Best prep for MCQ's
        </p>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 shadow-sm ring-1 ring-slate-200">
        {user?.avatar ? (
          <img
            src={user.avatar}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-200"
            alt="profile"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-slate-200 shrink-0">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-slate-900">{user?.name ?? "—"}</h2>
          <p className="truncate text-xs text-slate-500">{user?.email ?? ""}</p>
        </div>
      </div>

      <nav className="mt-8 w-full flex-1">
        <ul className="space-y-3">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-4 text-base transition duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white font-semibold shadow-lg shadow-slate-300/60"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="shrink-0 text-lg" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        onClick={logout}
        className="mt-6 flex w-full items-center gap-3 rounded-xl bg-slate-100 px-4 py-4 text-left text-slate-700 transition hover:bg-rose-50 hover:text-rose-700"
      >
        <MdLogout className="shrink-0 text-lg" />
        Logout
      </button>
    </div>
  );
}
