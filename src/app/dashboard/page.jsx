// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "@/lib/auth-client";

// export default function DashboardPage() {
//   const router = useRouter();

//   const { data: session, isPending } = useSession();

//   useEffect(() => {
//     if (isPending) return;

//     // Not logged in
//     if (!session?.user) {
//       router.replace("/login");
//       return;
//     }

//     const role = session.user.role || "client";

//     switch (role) {
//       case "admin":
//         router.replace("/dashboard/admin");
//         break;

//       case "freelancer":
//         router.replace("/dashboard/freelancer");
//         break;

//       default:
//         router.replace("/dashboard/client");
//     }
//   }, [session, isPending, router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-lg font-medium">Loading Dashboard...</p>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const getUser = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/users/${session.user.email}`
        );

        switch (data.role) {
          case "admin":
            router.replace("/dashboard/admin");
            break;

          case "freelancer":
            router.replace("/dashboard/freelancer");
            break;

          default:
            router.replace("/dashboard/client");
        }
      } catch (error) {
        console.log(error);

        router.replace("/dashboard/client");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [session, isPending, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium">
        {loading ? "Loading Dashboard..." : "Redirecting..."}
      </p>
    </div>
  );
}