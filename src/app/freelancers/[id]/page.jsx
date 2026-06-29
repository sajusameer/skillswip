"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function FreelancerProfile() {
  const { id } = useParams();

  const [freelancer, setFreelancer] = useState(null);

  useEffect(() => {
    fetchFreelancer();
  }, [id]);

  const fetchFreelancer = async () => {
    const { data } = await axiosInstance.get(`/freelancers/${id}`);
    setFreelancer(data);
  };

  if (!freelancer)
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );

  return (
    <section className="max-w-5xl mx-auto py-10 px-5">

      <div className="bg-white rounded-2xl shadow border p-8">

        <div className="flex items-center gap-6">

          <img
            src={freelancer.image || "/avatar.png"}
            alt=""
            className="w-28 h-28 rounded-full object-cover"
          />

          <div>

            <h1 className="text-3xl font-bold">
              {freelancer.name}
            </h1>

            <p className="text-gray-500">
              {freelancer.email}
            </p>

            <span className="inline-block mt-2 bg-blue-100 text-blue-600 px-4 py-1 rounded-full">
              Freelancer
            </span>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="border rounded-xl p-5">
            <p className="text-gray-500">
              Skills
            </p>

            <h3 className="font-semibold">
              {freelancer.skills || "Not Added"}
            </h3>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500">
              Experience
            </p>

            <h3 className="font-semibold">
              {freelancer.experience || "Not Added"}
            </h3>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500">
              Location
            </p>

            <h3 className="font-semibold">
              {freelancer.location || "Not Added"}
            </h3>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500">
              Hourly Rate
            </p>

            <h3 className="font-semibold">
              ${freelancer.hourlyRate || 0}
            </h3>
          </div>

        </div>

        <div className="mt-8 border rounded-xl p-6">

          <h2 className="text-xl font-bold mb-3">
            About
          </h2>

          <p className="text-gray-600 leading-8">
            {freelancer.bio || "No bio available."}
          </p>

        </div>

      </div>

    </section>
  );
}