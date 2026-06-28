"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import {CardBody, Button, Card } from "@heroui/react";
import { Button, Card } from "@heroui/react";
// import { CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

export default function AddTaskPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const categories = [
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Graphic Design",
    "Writing",
    "Digital Marketing",
    "Video Editing",
    "Data Entry",
    "Other",
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const task = {
        ...data,
        budget: Number(data.budget),
        clientName: session?.user?.name,
        clientEmail: session?.user?.email,
      };

      const res = await axiosInstance.post("/tasks", task);

      if (res.data.insertedId) {
        toast.success("Task posted successfully.");
        reset();
        router.push("/dashboard/client/my-tasks");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto py-8">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <Card className="shadow-xl">

         <div className="bg-white rounded-2xl shadow-xl border p-8">

            <h1 className="text-3xl font-bold mb-2">
              Add New Task
            </h1>

            <p className="text-gray-500 mb-8">
              Fill in the information below to publish your task.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >

              <div>

                <label className="font-medium mb-2 block">
                  Task Title
                </label>

                <input
                  {...register("title", {
                    required: "Task title is required",
                  })}
                  placeholder="Build a React Website"
                  className="w-full border rounded-xl px-4 py-3"
                />

                {errors.title && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.title.message}
                  </p>
                )}

              </div>

              <div>

                <label className="font-medium mb-2 block">
                  Category
                </label>

                <select
                  {...register("category", {
                    required: "Select a category",
                  })}
                  className="w-full border rounded-xl px-4 py-3"
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}

                </select>

                {errors.category && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.category.message}
                  </p>
                )}

              </div>

              <div>

                <label className="font-medium mb-2 block">
                  Description
                </label>

                <textarea
                  rows={6}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Describe your project..."
                  className="w-full border rounded-xl px-4 py-3 resize-none"
                />

                {errors.description && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.description.message}
                  </p>
                )}

              </div>
                            {/* Budget */}

              <div>

                <label className="font-medium mb-2 block">
                  Budget ($)
                </label>

                <input
                  type="number"
                  {...register("budget", {
                    required: "Budget is required",
                    min: {
                      value: 1,
                      message: "Budget must be greater than 0",
                    },
                  })}
                  placeholder="500"
                  className="w-full border rounded-xl px-4 py-3"
                />

                {errors.budget && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.budget.message}
                  </p>
                )}

              </div>

              {/* Deadline */}

              <div>

                <label className="font-medium mb-2 block">
                  Deadline
                </label>

                <input
                  type="date"
                  {...register("deadline", {
                    required: "Deadline is required",
                  })}
                  className="w-full border rounded-xl px-4 py-3"
                />

                {errors.deadline && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.deadline.message}
                  </p>
                )}

              </div>

              {/* Skills */}

              <div>

                <label className="font-medium mb-2 block">
                  Required Skills
                </label>

                <input
                  {...register("skills", {
                    required: "Required skills are needed",
                  })}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full border rounded-xl px-4 py-3"
                />

                {errors.skills && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.skills.message}
                  </p>
                )}

              </div>

              {/* Client Information */}

              <div className="grid md:grid-cols-2 gap-5">

                <div>

                  <label className="font-medium mb-2 block">
                    Client Name
                  </label>

                  <input
                    value={session?.user?.name || ""}
                    readOnly
                    className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                  />

                </div>

                <div>

                  <label className="font-medium mb-2 block text-black">
                    Client Email
                  </label>

                  <input
                    value={session?.user?.email || ""}
                    readOnly
                    className="w-full bg-gray-100 border rounded-xl px-4 py-3"
                  />

                </div>

              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-4 pt-4">

                <Button
                  type="button"
                  variant="bordered"
                  onPress={() => reset()}
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  isLoading={loading}
                  className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8"
                >
                  Publish Task
                </Button>

              </div>

            </form>

          </div>

        </Card>

      </motion.div>

    </section>
  );
}