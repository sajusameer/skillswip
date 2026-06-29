"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { Avatar } from "@heroui/react";

import { useSession, signOut } from "@/lib/auth-client";

export default function AppNavbar() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await signOut();

    router.push("/");
    router.refresh();
  };

  const dashboardPath =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "freelancer"
      ? "/dashboard/freelancer"
      : "/dashboard/client";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
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

          <div className="hidden md:flex items-center gap-8 font-medium">

            <Link
              href="/"
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              href="/browse-tasks"
              className="hover:text-blue-600 transition"
            >
              Browse Tasks
            </Link>

           <Link
            href="/freelancers"
            className="hover:text-blue-600"
          >
            Browse Freelancers
          </Link>

          </div>

          {/* Desktop Right */}

          <div className="hidden md:flex items-center gap-3">

            {isPending ? null : !user ? (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:scale-105 transition"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={dashboardPath}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold"
                >
                  Dashboard
                </Link>

                <Avatar
                  src={user.image || undefined}
                  name={user.name}
                  size="sm"
                  className="cursor-pointer"
                />

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-red-50 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}

          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Menu */}

        {isOpen && (

          <div className="md:hidden py-5 border-t flex flex-col gap-4">

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/browse-tasks"
              onClick={() => setIsOpen(false)}
            >
              Browse Tasks
            </Link>

            <Link
              href="/freelancers"
              onClick={() => setIsOpen(false)}
            >
              Freelancers
            </Link>

            {isPending ? null : !user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="border rounded-xl px-4 py-3 text-center"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-violet-600"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">

                  <Avatar
                src={user.image || undefined}
                    name={user.name}
                  />
                  {/* <Avatar
  src={user?.image || undefined}
  name={user?.name || "User"}
  showFallback
/> */}      
{/* <Avatar
  name={user?.name || "User"}
  size="sm"
/> console.log(user); */}

                  <div>

                    <h3 className="font-semibold">
                      {user.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>

                  </div>

                </div>

                <Link
                  href={dashboardPath}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-violet-600"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border px-4 py-3 hover:bg-red-50 hover:text-red-600 transition"
                >
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