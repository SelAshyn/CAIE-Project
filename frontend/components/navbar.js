"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdMenu, MdClose, MdPerson } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Past Papers Coverage", href: "#subjects" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm border-b border-gray-200"
          : "bg-white/80 backdrop-blur"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 tracking-tight">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">MCQ</span>
          PrepCAIE
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-gray-500 hover:text-gray-900 transition font-medium"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href="/main" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium">
                <MdPerson className="text-base" />
                {user.name.split(" ")[0]}
              </Link>
              <button
                onClick={logout}
                className="text-sm border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition font-medium"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition font-medium">
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Sign up free
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-900"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <MdClose size={22} /> : <MdMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-md">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              {label}
            </a>
          ))}
          {user ? (
            <>
              <Link href="/main" onClick={() => setOpen(false)} className="text-sm text-gray-700 font-medium">
                Go to App ({user.name.split(" ")[0]})
              </Link>
              <button
                onClick={() => { setOpen(false); logout(); }}
                className="text-sm text-red-500 font-medium text-left"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="text-sm bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-center"
              >
                Sign up free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
