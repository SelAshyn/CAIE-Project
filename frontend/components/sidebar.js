"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdOutlineQuiz, MdBarChart, MdSettings, MdLogout } from "react-icons/md";

const navItems = [
  { label: "Dashboard", href: "/main", icon: MdDashboard },
  { label: "Practice", href: "/main/practice", icon: MdOutlineQuiz },
  { label: "Results", href: "/main/results", icon: MdBarChart },
  { label: "Settings", href: "/main/settings", icon: MdSettings },
];

export function SideBar() {
  const pathname = usePathname();

  return (
    <div className="h-full w-72 bg-gray-900 flex flex-col items-center mt-4 text-white p-4">

      <h1 className="text-xl font-bold">MCQPrep</h1>
      <p className="text-xs m-1 text-gray-500">
        Best prep for MCQ's
      </p>

      <hr className="w-full mt-2 border-white/20" />

      <div className="flex items-center gap-3 mt-4 bg-gray-800 p-3 rounded-xl w-full">
        <img
          src="https://t3.ftcdn.net/jpg/09/35/18/36/360_F_935183665_aDRAyJE5CmiVtt7pcsFC9h1SC5rgQvh2.jpg"
          className="rounded-full w-12 h-12 object-cover"
          alt="profile"
        />
        <div className="overflow-hidden">
          <h2 className="text-sm font-semibold">Rhishav Lamichhane</h2>
          <p className="text-xs text-gray-400 truncate">
            rhishavlamichhane@gmail.com
          </p>
        </div>
      </div>

      <nav className="mt-10 w-full">
        <ul className="space-y-2 w-full">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 p-3 rounded-lg w-full transition ${
                    isActive
                      ? "bg-white text-black font-semibold"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <Icon className="text-lg shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        onClick={() => console.log("logout")}
        className="mt-auto mb-4 flex items-center gap-3 p-3 rounded-lg w-full bg-gray-700 hover:bg-red-600 transition text-white"
      >
        <MdLogout className="text-lg shrink-0" />
        Logout
      </button>
    </div>
  );
}
