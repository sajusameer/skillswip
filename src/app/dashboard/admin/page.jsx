"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

import {
  Users,
  UserCheck,
  Briefcase,
  ClipboardList,
  Wallet,
  FileText,
} from "lucide-react";

const cards = [
  {
    key: "totalUsers",
    title: "Total Users",
    icon: Users,
    color: "text-blue-600",
  },
  {
    key: "totalClients",
    title: "Clients",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    key: "totalFreelancers",
    title: "Freelancers",
    icon: Briefcase,
    color: "text-violet-600",
  },
  {
    key: "totalTasks",
    title: "Tasks",
    icon: ClipboardList,
    color: "text-orange-600",
  },
  {
    key: "totalBids",
    title: "Bids",
    icon: FileText,
    color: "text-pink-600",
  },
  {
    key: "totalRevenue",
    title: "Revenue",
    icon: Wallet,
    color: "text-emerald-600",
  },
];

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await axiosInstance.get("/dashboard/admin");

      setDashboard(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor users, tasks, bids and revenue.
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card) => (
          <div
            key={card.key}
            className="bg-white rounded-2xl shadow-sm border p-6"
          >

            <card.icon
              size={38}
              className={`${card.color} mb-5`}
            />

            <p className="text-gray-500">
              {card.title}
            </p>

            <h2 className="text-4xl font-bold mt-2">

              {loading
                ? "..."
                : card.key === "totalRevenue"
                ? `$${dashboard[card.key] || 0}`
                : dashboard[card.key] || 0}

            </h2>

          </div>
        ))}

      </div>

      {/* Quick Links */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <a
          href="/dashboard/admin/users"
          className="bg-white border rounded-2xl p-6 hover:shadow-lg transition"
        >
          <Users className="text-blue-600 mb-4" />

          <h2 className="font-bold text-xl">
            Manage Users
          </h2>

          <p className="text-gray-500 mt-2">
            View, delete and change user roles.
          </p>
        </a>

        <a
          href="/dashboard/admin/tasks"
          className="bg-white border rounded-2xl p-6 hover:shadow-lg transition"
        >
          <ClipboardList className="text-green-600 mb-4" />

          <h2 className="font-bold text-xl">
            Manage Tasks
          </h2>

          <p className="text-gray-500 mt-2">
            Monitor every posted task.
          </p>
        </a>

        <a
          href="/dashboard/admin/bids"
          className="bg-white border rounded-2xl p-6 hover:shadow-lg transition"
        >
          <FileText className="text-violet-600 mb-4" />

          <h2 className="font-bold text-xl">
            Manage Bids
          </h2>

          <p className="text-gray-500 mt-2">
            Review all freelancer proposals.
          </p>
        </a>

        <a
          href="/dashboard/admin/payments"
          className="bg-white border rounded-2xl p-6 hover:shadow-lg transition"
        >
          <Wallet className="text-emerald-600 mb-4" />

          <h2 className="font-bold text-xl">
            Payments
          </h2>

          <p className="text-gray-500 mt-2">
            Track completed transactions.
          </p>
        </a>

      </div>

    </section>
  );
}