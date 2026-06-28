"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function FreelancersPage() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const { data } = await axiosInstance.get("/freelancers");
      setFreelancers(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load freelancers.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading freelancers...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Browse Freelancers
        </h1>

        <p className="text-gray-500 mt-3">
          Find talented freelancers for your next project.
        </p>
      </div>

      {freelancers.length === 0 ? (
        <div className="bg-white rounded-2xl border p-10 text-center">
          No freelancers found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {freelancers.map((user) => (

            <div
              key={user._id}
              className="bg-white rounded-2xl border shadow p-6 hover:shadow-xl transition"
            >

              <div className="flex justify-center">

                <img
                  src={
                    user.image ||
                    "https://ui-avatars.com/api/?name=Freelancer"
                  }
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border"
                />

              </div>

              <div className="text-center mt-5">

                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p className="text-blue-600 font-medium mt-1">
                  Freelancer
                </p>

                <p className="text-gray-500 mt-2 break-all">
                  {user.email}
                </p>

                <div className="mt-6">

                  <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 text-white font-semibold">
                    View Profile
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}