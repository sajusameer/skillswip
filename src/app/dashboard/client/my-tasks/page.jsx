"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

export default function MyTasksPage() {
  const { data: session } = useSession();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = session?.user?.email;

  useEffect(() => {
    if (email) {
      fetchTasks();
    }
  }, [email]);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(
        `/tasks/client/${email}`
      );

      setTasks(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axiosInstance.delete(`/tasks/${id}`);

      if (data.deletedCount > 0) {
        toast.success("Task deleted successfully.");

        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <section>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          My Tasks
        </h1>

        <Link
          href="/dashboard/client/add-task"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Task
        </Link>

      </div>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center">

          <h2 className="text-2xl font-semibold">
            No Tasks Found
          </h2>

          <p className="text-gray-500 mt-3">
            Create your first task.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Title
                </th>

                <th className="text-left p-4">
                  Category
                </th>

                <th className="text-left p-4">
                  Budget
                </th>

                <th className="text-left p-4">
                  Deadline
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-center p-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr
                  key={task._id}
                  className="border-t"
                >

                  <td className="p-4 font-medium">
                    {task.title}
                  </td>

                  <td className="p-4">
                    {task.category}
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

                  <td className="p-4">

                    <div className="flex gap-2 justify-center">

                      <button>
                     <Link
                    href={`/dashboard/client/update-task/${task._id}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                    >
                    Update
                    </Link>
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(task._id)
                        }
                        className="bg-red-600 text-white px-3 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                      <button
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                      >
                        View Bids
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </section>
  );
}