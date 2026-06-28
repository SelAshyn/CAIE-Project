"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Cantarell, Merriweather } from "next/font/google";
import { SideBar } from "../../components/sidebar";
import { useAuth } from "../../context/AuthContext";
import "../globals.css";

const cantarell = Cantarell({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-cantarell",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
});

export default function Layout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Show nothing while checking auth to avoid a flash
  if (loading || !user) return null;

  return (
    <div
      className={`${cantarell.variable} ${merriweather.variable} h-screen p-3 flex gap-3 bg-slate-100 text-slate-900`}
    >
      <div className="bg-white h-full w-1/5 min-w-[18rem] rounded-2xl overflow-hidden shadow-lg shadow-slate-300/70 border border-slate-200">
        <SideBar />
      </div>
      <main className="bg-white h-full w-full rounded-2xl overflow-auto border border-slate-200 shadow-lg shadow-slate-300/50">
        {children}
      </main>
    </div>
  );
}
