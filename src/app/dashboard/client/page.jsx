
// import { ClipboardList, Wallet, CirclePlus, CheckCircle2 } from "lucide-react";

// const stats = [
//   {
//     title: "Total Tasks",
//     value: 12,
//     icon: ClipboardList,
//   },
//   {
//     title: "Open Tasks",
//     value: 5,
//     icon: CirclePlus,
//   },
//   {
//     title: "Completed",
//     value: 7,
//     icon: CheckCircle2,
//   },
//   {
//     title: "Payments",
//     value: "$450",
//     icon: Wallet,
//   },
// ];

// export default function ClientDashboard() {
//   return (
//     <section>

//       <h1 className="text-3xl font-bold mb-8">
//         Dashboard
//       </h1>

//       <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

//         {stats.map((item) => (
//           <div
//             key={item.title}
//             className="bg-white rounded-2xl shadow-sm border p-6"
//           >

//             <item.icon className="text-blue-600 mb-4" size={35} />

//             <h3 className="text-gray-500">
//               {item.title}
//             </h3>

//             <p className="text-3xl font-bold mt-2">
//               {item.value}
//             </p>

//           </div>
//         ))}

//       </div>

//     </section>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";
import {
  ClipboardList,
  Wallet,
  CirclePlus,
  CheckCircle2,
} from "lucide-react";

export default function ClientDashboard() {
  const { data: session } = useSession();

  const [stats, setStats] = useState({
    totalTasks: 0,
    openTasks: 0,
    completedTasks: 0,
    totalPayments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchDashboard();
    }
  }, [session]);

  const fetchDashboard = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/dashboard/client/${session.user.email}`
      );

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: ClipboardList,
    },
    {
      title: "Open Tasks",
      value: stats.openTasks,
      icon: CirclePlus,
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
    },
    {
      title: "Payments",
      value: `$${stats.totalPayments}`,
      icon: Wallet,
    },
  ];

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {dashboardStats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl shadow-sm border p-6"
          >
            <item.icon
              className="text-blue-600 mb-4"
              size={35}
            />

            <h3 className="text-gray-500">
              {item.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {loading ? "..." : item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}