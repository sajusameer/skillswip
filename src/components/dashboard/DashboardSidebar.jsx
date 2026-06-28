"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CirclePlus,
  ClipboardList,
  Wallet,
  Search,
  Briefcase,
  Users,
  BarChart3,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const role = session?.user?.role || "client";

  const clientMenu = [
    {
      name: "Dashboard",
      href: "/dashboard/client",
      icon: LayoutDashboard,
    },
    {
      name: "Add Task",
      href: "/dashboard/client/add-task",
      icon: CirclePlus,
    },
    {
      name: "My Tasks",
      href: "/dashboard/client/my-tasks",
      icon: ClipboardList,
    },
    {
      name: "Payments",
      href: "/dashboard/client/payments",
      icon: Wallet,
    },
  ];

  const freelancerMenu = [
    {
      name: "Dashboard",
      href: "/dashboard/freelancer",
      icon: LayoutDashboard,
    },
    {
      name: "Browse Tasks",
      href: "/dashboard/freelancer/browse-tasks",
      icon: Search,
    },
    {
      name: "My Bids",
      href: "/dashboard/freelancer/my-bids",
      icon: Briefcase,
    },
  ];

  const adminMenu = [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Statistics",
      href: "/dashboard/admin/statistics",
      icon: BarChart3,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Manage Tasks",
      href: "/dashboard/admin/tasks",
      icon: ClipboardList,
    },
  ];

  let menu = clientMenu;

  if (role === "freelancer") menu = freelancerMenu;

  if (role === "admin") menu = adminMenu;

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 flex-col">

      <div className="h-20 flex items-center justify-center border-b">

        <Link
          href="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
        >
          SkillSwap
        </Link>

      </div>

      <div className="flex-1 px-5 py-8">

        <div className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition

                ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />

                {item.name}
              </Link>
            );
          })}
        </div>

      </div>

    </aside>
  );
}