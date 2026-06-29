// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSession } from "@/lib/auth-client";
// import {
//   LayoutDashboard,
//   CirclePlus,
//   ClipboardList,
//   Wallet,
//   Search,
//   Briefcase,
//   Users,
//   BarChart3,
// } from "lucide-react";

// export default function DashboardSidebar() {
//   const pathname = usePathname();

//   const { data: session, isPending } = useSession();

//   if (isPending) {
//     return (
//       <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r items-center justify-center">
//         <p>Loading...</p>
//       </aside>
//     );
//   }

//   if (!session?.user) return null;

//   const role = session.user.role;

//   const clientMenu = [
//     {
//       name: "Dashboard",
//       href: "/dashboard/client",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Add Task",
//       href: "/dashboard/client/add-task",
//       icon: CirclePlus,
//     },
//     {
//       name: "My Tasks",
//       href: "/dashboard/client/my-tasks",
//       icon: ClipboardList,
//     },
//     {
//       name: "Payments",
//       href: "/dashboard/client/payments",
//       icon: Wallet,
//     },
//   ];

//   const freelancerMenu = [
//     {
//       name: "Dashboard",
//       href: "/dashboard/freelancer",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Browse Tasks",
//       href: "/dashboard/freelancer/browse-tasks",
//       icon: Search,
//     },
//     {
//       name: "My Bids",
//       href: "/dashboard/freelancer/my-bids",
//       icon: Briefcase,
//     },
//   ];

//   const adminMenu = [
//     {
//       name: "Dashboard",
//       href: "/dashboard/admin",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Statistics",
//       href: "/dashboard/admin/statistics",
//       icon: BarChart3,
//     },
//     {
//       name: "Manage Users",
//       href: "/dashboard/admin/users",
//       icon: Users,
//     },
//     {
//       name: "Manage Tasks",
//       href: "/dashboard/admin/tasks",
//       icon: ClipboardList,
//     },
//   ];

//   let menu = [];

//   if (role === "admin") {
//     menu = adminMenu;
//   } else if (role === "freelancer") {
//     menu = freelancerMenu;
//   } else {
//     menu = clientMenu;
//   }

//   return (
//     <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 flex-col">

//       <div className="h-20 flex items-center justify-center border-b">

//         <Link
//           href="/"
//           className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
//         >
//           SkillSwap
//         </Link>

//       </div>

//       <div className="flex-1 px-5 py-8">

//         <div className="space-y-2">

//           {menu.map((item) => {
//             const Icon = item.icon;

//             const active = pathname === item.href;

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
//                   active
//                     ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 <Icon size={20} />
//                 {item.name}
//               </Link>
//             );
//           })}

//         </div>

//       </div>

//     </aside>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

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

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { data: session, isPending } = useSession();

  // NEW
  const [role, setRole] = useState("");

  // NEW
  useEffect(() => {
    if (!session?.user?.email) return;

    const getUser = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/users/${session.user.email}`
        );

        setRole(data.role);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [session]);

  if (isPending) {
    return (
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r items-center justify-center">
        <p>Loading...</p>
      </aside>
    );
  }

  if (!session?.user) return null;

  // NEW
  if (!role) {
    return (
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r items-center justify-center">
        <p>Loading...</p>
      </aside>
    );
  }

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
    {
      name: "My Profile",
      href: "/dashboard/freelancer/profile",
      icon: Users,
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

  let menu = [];

  if (role === "admin") {
    menu = adminMenu;
  } else if (role === "freelancer") {
    menu = freelancerMenu;
  } else {
    menu = clientMenu;
  }

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
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
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