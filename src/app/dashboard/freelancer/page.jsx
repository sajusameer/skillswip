"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import {
  Briefcase,
  Search,
  DollarSign,
  Star,
  ArrowRight,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

export default function FreelancerDashboard() {
  const { data: session } = useSession();

  const user = session?.user;

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    totalBids: 0,
    completedJobs: 0,
    earnings: 0,
    availableTasks: 0,
    recentBids: [],
  });

  useEffect(() => {
    if (user?.email) {
      fetchDashboard();
    }
  }, [user]);

  const fetchDashboard = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/dashboard/freelancer/${user.email}`
      );

      setDashboard(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Welcome */}

      <Card className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
        <div className="p-8">
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name} 👋
          </h1>

          <p className="mt-2 text-blue-100">
            Ready to find your next freelance project?
          </p>
        </div>
      </Card>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">
                My Bids
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {loading ? "..." : dashboard.totalBids}
              </h2>
            </div>

            <Briefcase className="text-blue-600" size={38} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">
                Completed Jobs
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {loading ? "..." : dashboard.completedJobs}
              </h2>
            </div>

            <Star className="text-yellow-500" size={38} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">
                Total Earnings
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {loading ? "..." : `$${dashboard.earnings}`}
              </h2>
            </div>

            <DollarSign className="text-green-600" size={38} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-gray-500 text-sm">
                Available Tasks
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {loading ? "..." : dashboard.availableTasks}
              </h2>
            </div>

            <Search className="text-violet-600" size={38} />
          </div>
        </Card>

      </div>

      {/* Quick Actions */}

      <div className="grid gap-6 lg:grid-cols-2">

        <Card>
          <div className="space-y-5 p-6">

            <h2 className="text-xl font-bold">
              Quick Actions
            </h2>

            <Link href="/browse-tasks">
              <Button
                color="primary"
                fullWidth
                endContent={<ArrowRight size={18} />}
              >
                Browse Available Tasks
              </Button>
            </Link>

            <Link href="/dashboard/freelancer/my-bids">
              <Button
                variant="bordered"
                fullWidth
                endContent={<ArrowRight size={18} />}
              >
                View My Bids
              </Button>
            </Link>

          </div>
        </Card>

        <Card>
          <div className="p-6">

            <h2 className="text-xl font-bold mb-4">
              Recent Activity
            </h2>

            {dashboard.recentBids.length === 0 ? (
              <div className="border border-dashed rounded-xl py-12 text-center text-gray-500">
                No bids yet.
              </div>
            ) : (
              <div className="space-y-3">
                {dashboard.recentBids.map((bid) => (
                  <div
                    key={bid._id}
                    className="border rounded-lg p-3"
                  >
                    <p className="font-semibold">
                      {bid.taskTitle}
                    </p>

                    <p className="text-sm text-gray-500">
                      ${bid.price} • {bid.status}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </Card>

      </div>

      {/* Tips */}

      <Card>
        <div className="p-6">

          <h2 className="text-xl font-bold mb-4">
            💡 Freelancer Tips
          </h2>

          <ul className="space-y-3 text-gray-600 list-disc pl-5">
            <li>Apply to tasks that match your skills.</li>
            <li>Write a personalized proposal.</li>
            <li>Keep your profile updated.</li>
            <li>Complete tasks on time to improve your reputation.</li>
          </ul>

        </div>
      </Card>

    </div>
  );
}