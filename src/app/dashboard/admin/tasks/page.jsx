"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/tasks");
      setTasks(data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axiosInstance.delete(`/tasks/${id}`);

      if (data.deletedCount > 0) {
        toast.success("Task deleted");

        setTasks((prev) =>
          prev.filter((task) => task._id !== id)
        );
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <section>

      <h1 className="text-3xl font-bold mb-8">
        Manage Tasks
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow border">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Budget</th>
              <th className="p-4 text-left">Deadline</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {tasks.map((task) => (

              <tr
                key={task._id}
                className="border-t"
              >
                <td className="p-4">
                  {task.title}
                </td>

                <td className="p-4">
                  {task.clientName}
                </td>

                <td className="p-4">
                  ${task.budget}
                </td>

                <td className="p-4">
                  {task.deadline}
                </td>

                <td className="p-4 capitalize">
                  {task.status}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}