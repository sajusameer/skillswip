"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [proposal, setProposal] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const { data } = await axiosInstance.get(`/tasks/${id}`);
      setTask(data);
    } catch (error) {
      toast.error("Failed to load task.");
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async (e) => {
    e.preventDefault();

    if (!proposal || !price || !days) {
      return toast.error("Please fill all fields.");
    }

    try {
      setSending(true);

      const bid = {
        taskId: task._id,
        taskTitle: task.title,

        clientEmail: task.clientEmail,
        clientName: task.clientName,

        freelancerEmail: session?.user?.email,
        freelancerName: session?.user?.name,

        proposal,
        price: Number(price),
        deliveryDays: Number(days),
      };

      const { data } = await axiosInstance.post("/bids", bid);

      if (data.insertedId) {
        toast.success("Proposal submitted successfully.");

        setProposal("");
        setPrice("");
        setDays("");
      }
    } catch (error) {
      toast.error("Submission failed.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="py-20 text-center">
        Task not found.
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Task Details */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow border p-8">

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {task.category}
          </span>

          <h1 className="text-4xl font-bold mt-5">
            {task.title}
          </h1>

          <p className="mt-6 text-gray-700 leading-8">
            {task.description}
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <div className="border rounded-xl p-5">
              <p className="text-gray-500">Budget</p>
              <h3 className="text-2xl font-bold text-green-600">
                ${task.budget}
              </h3>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-gray-500">Deadline</p>
              <h3 className="text-xl font-semibold">
                {task.deadline}
              </h3>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-gray-500">Client</p>
              <h3>{task.clientName}</h3>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-gray-500">Required Skills</p>
              <h3>{task.skills}</h3>
            </div>

          </div>

        </div>

        {/* Proposal */}

        <div className="bg-white rounded-2xl shadow border p-6">

          <h2 className="text-2xl font-bold mb-6">
            Submit Proposal
          </h2>

          <form
            onSubmit={handleBid}
            className="space-y-5"
          >

            <textarea
              rows={5}
              placeholder="Write your proposal..."
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Bid Amount"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Delivery Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              disabled={sending}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold"
            >
              {sending ? "Submitting..." : "Submit Proposal"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}