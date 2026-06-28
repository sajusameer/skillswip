"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function BrowseTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axiosInstance.get("/tasks");
      setTasks(data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Browse Tasks
        </h1>

        <p className="text-gray-500 mt-2">
          Find freelance jobs and submit your proposal.
        </p>

      </div>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center">
          No Open Tasks Available
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white rounded-2xl shadow border p-6 flex flex-col"
            >

              <div className="flex justify-between items-start">

                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                  {task.category}
                </span>

                <span className="font-bold text-green-600">
                  ${task.budget}
                </span>

              </div>

              <h2 className="text-xl font-bold mt-5">
                {task.title}
              </h2>

              <p className="text-gray-600 mt-3 line-clamp-3">
                {task.description}
              </p>

              <div className="mt-5 space-y-2 text-sm">

                <p>
                  <strong>Client:</strong> {task.clientName}
                </p>

                <p>
                  <strong>Deadline:</strong> {task.deadline}
                </p>

                <p>
                  <strong>Status:</strong>

                  <span className="ml-2 text-blue-600 capitalize">
                    {task.status}
                  </span>

                </p>

              </div>

              <div className="mt-auto pt-6">

                <Link
                  href={`/browse-tasks/${task._id}`}
                  className="block text-center bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 rounded-xl font-semibold"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}