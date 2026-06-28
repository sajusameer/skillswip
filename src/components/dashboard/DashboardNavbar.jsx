// "use client";

// import { Bell } from "lucide-react";
// import { Avatar } from "@heroui/react";
// import { useRouter } from "next/navigation";

// import { signOut, useSession } from "@/lib/auth-client";

// export default function DashboardNavbar() {
//   const router = useRouter();

//   const { data: session } = useSession();

//   const user = session?.user;

//   const handleLogout = async () => {
//     await signOut();

//     router.push("/");

//     router.refresh();
//   };
//   const role = user?.role;

// const title =
//   role === "admin"
//     ? "Admin Dashboard"
//     : role === "freelancer"
//     ? "Freelancer Dashboard"
//     : "Client Dashboard";

//   return (
//     <header className="sticky top-0 z-40 h-20 bg-white border-b flex items-center justify-between px-8">

//       <div>

//         <h2 className="text-2xl font-bold">
//           Dashboard
//         </h2>
        

//         <p className="text-gray-500 text-sm">
//           Welcome back 👋
//         </p>

//       </div>

//       <div className="flex items-center gap-6">

//         <button className="relative">

//           <Bell size={22} />

//           <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>

//         </button>

//         <div className="flex items-center gap-3">

//           <Avatar
//             src={user?.image || undefined}
//             name={user?.name || "User"}
//           />

//           <div className="hidden md:block">

//             <h4 className="font-semibold">
//               {user?.name}
//             </h4>

//             <p className="text-sm text-gray-500">
//               {user?.email}
//             </p>

//           </div>

//         </div>

//         <button
//           onClick={handleLogout}
//           className="rounded-xl bg-red-500 text-white px-5 py-2 hover:bg-red-600 transition"
//         >
//           Logout
//         </button>

//       </div>

//     </header>
//   );
// }   

// "use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";

import { signOut, useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

export default function DashboardNavbar() {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const user = session?.user;

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

  const title =
    role === "admin"
      ? "Admin Dashboard"
      : role === "freelancer"
      ? "Freelancer Dashboard"
      : "Client Dashboard";

  const handleLogout = async () => {
    await signOut();

    localStorage.removeItem("userRole");

    router.push("/");
    router.refresh();
  };

  if (isPending || !role) {
    return (
      <header className="sticky top-0 z-40 h-20 bg-white border-b flex items-center justify-between px-8">
        <p>Loading...</p>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 h-20 bg-white border-b px-8 flex items-center justify-between">

      {/* Left */}

      <div>

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-gray-500 text-sm">
          Welcome back, {user?.name || "User"} 👋
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Notification */}

        <button className="relative rounded-full p-2 hover:bg-gray-100 transition">

          <Bell size={22} />

          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <Avatar
            src={user?.image || undefined}
            name={user?.name || "User"}
            size="md"
          />

          <div className="hidden md:block">

            <h4 className="font-semibold">
              {user?.name}
            </h4>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>

            <span className="inline-block mt-1 rounded-full bg-blue-100 text-blue-700 text-xs px-2 py-1 capitalize">
              {role}
            </span>

          </div>

        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-500 px-5 py-2 text-white font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </header>
  );
}