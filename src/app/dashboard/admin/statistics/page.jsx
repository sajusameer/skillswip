"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function StatisticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/dashboard/admin/statistics"
      );

      setStats(data);
    } catch {
      toast.error("Failed");
    }
  };

  if (!stats) return <div className="py-20 text-center">Loading...</div>;

  const cards = [
    ["Total Users", stats.totalUsers],
    ["Clients", stats.totalClients],
    ["Freelancers", stats.totalFreelancers],
    ["Tasks", stats.totalTasks],
    ["Open Tasks", stats.openTasks],
    ["Completed Tasks", stats.completedTasks],
    ["Payments", stats.totalPayments],
    ["Revenue", `$${stats.totalRevenue}`],
  ];

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8">
        Statistics
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map(([title, value]) => (
          <div
            key={title}
            className="bg-white rounded-xl border shadow p-6"
          >
            <h3 className="text-gray-500">
              {title}
            </h3>

            <p className="text-3xl font-bold mt-3">
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}