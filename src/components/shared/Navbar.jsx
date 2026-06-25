"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);

 
  const isLoggedIn = false;

  return (
   <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
            >
            SkillSwap
            </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link
              href="/browse-tasks"
              className="hover:text-blue-600"
            >
              Browse Tasks
            </Link>

            <Link
              href="/freelancers"
              className="hover:text-blue-600"
            >
              Freelancers
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg border"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:scale-105 transition"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard/client"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Dashboard
                </Link>

                <button className="px-4 py-2 rounded-lg border">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/">Home</Link>

            <Link href="/browse-tasks">
              Browse Tasks
            </Link>

            <Link href="/freelancers">
              Freelancers
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="border rounded-lg px-4 py-2 text-center"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 text-center"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard/client"
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 text-center"
                >
                  Dashboard
                </Link>

                <button className="border rounded-lg px-4 py-2">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}