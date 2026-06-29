"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function TopFreelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const { data } = await axiosInstance.get("/freelancers");

      // Homepage এ শুধু 3 জন দেখাবে
      setFreelancers(data.slice(0, 3));
    } catch (error) {
      toast.error("Failed to load freelancers");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">

      <h2 className="text-4xl font-bold text-center mb-12">
        Top Freelancers
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {freelancers.map((freelancer) => (

          <div
            key={freelancer._id}
            className="border rounded-2xl p-6 text-center hover:shadow-xl transition"
          >
            <img
              src={
                freelancer.image ||
                "https://ui-avatars.com/api/?name=Freelancer"
              }
              alt={freelancer.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />

            <h3 className="font-bold text-xl">
              {freelancer.name}
            </h3>

            <p className="text-blue-600 mt-2">
              Freelancer
            </p>

            <p className="text-gray-500 mt-2 break-all">
              {freelancer.email}
            </p>

            <Link href={`/freelancers/${freelancer._id}`}>
              <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold py-2 rounded-lg hover:scale-105 transition">
                View Profile
              </button>
            </Link>

          </div>

        ))}

      </div>

      <div className="text-center mt-12">
        <Link href="/freelancers">
          <button className="px-8 py-3 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition">
            View All Freelancers
          </button>
        </Link>
      </div>

    </section>
  );
}