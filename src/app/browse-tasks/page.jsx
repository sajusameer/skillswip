

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function BrowseTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");

  // useEffect(() => {
  //   fetchTasks();
  // }, [page]);
useEffect(() => {
  fetchTasks();
}, [page, search, category]);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      // const { data } = await axiosInstance.get(
      //   `/tasks?page=${page}&limit=9`
      // );

      const { data } = await axiosInstance.get(
  `/tasks?page=${page}&limit=9&search=${search}&category=${category}`
);

      setTasks(data.tasks);
      setTotalPages(data.totalPages);

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
      <div className="flex flex-col md:flex-row gap-4 mb-8">

  <input
    type="text"
    placeholder="Search by title..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    className="border rounded-xl px-4 py-3 flex-1"
  />

  <select
    value={category}
    onChange={(e) => {
      setCategory(e.target.value);
      setPage(1);
    }}
    className="border rounded-xl px-4 py-3"
  >
 <option value="All">All Categories</option>
<option value="Web Development">Web Development</option>
<option value="Mobile App">Mobile App</option>
<option value="UI/UX Design">UI/UX Design</option>
<option value="Graphic Design">Graphic Design</option>
<option value="Writing">Writing</option>
<option value="Digital Marketing">Digital Marketing</option>
<option value="Video Editing">Video Editing</option>
<option value="Data Entry">Data Entry</option>
<option value="Other">Other</option>
  </select>

</div>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center">
          No Open Tasks Available
        </div>
      ) : (
        <>
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

          {/* Pagination */}

          <div className="flex justify-center items-center gap-2 mt-12">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-40"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (

              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`w-10 h-10 rounded-lg font-semibold ${
                  page === index + 1
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>

            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-40"
            >
              Next
            </button>

          </div>
        </>
      )}

    </section>
  );
}