"use client";

import { Bell } from "lucide-react";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";

import { signOut, useSession } from "@/lib/auth-client";

export default function DashboardNavbar() {
  const router = useRouter();

  const { data: session } = useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await signOut();

    router.push("/");

    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 h-20 bg-white border-b flex items-center justify-between px-8">

      <div>

        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-gray-500 text-sm">
          Welcome back 👋
        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell size={22} />

          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <Avatar
            src={user?.image || undefined}
            name={user?.name || "User"}
          />

          <div className="hidden md:block">

            <h4 className="font-semibold">
              {user?.name}
            </h4>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-500 text-white px-5 py-2 hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </header>
  );
}