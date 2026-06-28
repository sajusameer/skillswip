"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export default function UpdateTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [task, setTask] = useState({
    title: "",
    category: "",
    description: "",
    budget: "",
    deadline: "",
  });

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const { data } = await axiosInstance.get(`/tasks/${id}`);

      setTask({
        title: data.title,
        category: data.category,
        description: data.description,
        budget: data.budget,
        deadline: data.deadline,
      });
    } catch (error) {
      toast.error("Failed to load task.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !task.title ||
      !task.category ||
      !task.description ||
      !task.budget ||
      !task.deadline
    ) {
      return toast.error("Please fill all fields.");
    }

    try {
      setSaving(true);

      const { data } = await axiosInstance.put(
        `/tasks/${id}`,
        task
      );

      if (data.modifiedCount > 0) {
        toast.success("Task updated successfully.");

        router.push("/dashboard/client/my-tasks");
      }
    } catch (error) {
      toast.error("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-10">

      <div className="bg-white rounded-2xl shadow border p-8">

        <h1 className="text-3xl font-bold mb-8">
          Update Task
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 font-medium">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              name="category"
              value={task.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >

              <option>Web Development</option>
              <option>Mobile App</option>
              <option>Graphic Design</option>
              <option>UI/UX Design</option>
              <option>Writing</option>
              <option>Marketing</option>
              <option>Other</option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
            </div>
            <div>

            <label className="block mb-2 font-medium">
              Budget (USD)
            </label>

            <input
              type="number"
              name="budget"
              value={task.budget}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div className="flex items-center justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() => router.push("/dashboard/client/my-tasks")}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update Task"}
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}