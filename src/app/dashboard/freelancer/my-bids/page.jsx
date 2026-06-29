"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function MyBidsPage() {
  const { data: session } = useSession();

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchBids();
    }
  }, [session]);

  const fetchBids = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/bids/freelancer/${session.user.email}`
      );

      setBids(data);
    } catch (error) {
      toast.error("Failed to load bids.");
    } finally {
      setLoading(false);
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
    <section className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        My Bids
      </h1>

      {bids.length === 0 ? (
        <div className="bg-white rounded-xl border p-8 text-center">
          You haven't placed any bids yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border">

          <table className="table">

            <thead>
  <tr className="border-b">
    <th className="px-6 py-4 text-left">Task</th>
    <th className="px-6 py-4 text-left">Client</th>
    <th className="px-6 py-4 text-left">Price</th>
    <th className="px-6 py-4 text-left">Delivery</th>
    <th className="px-6 py-4 text-left">Status</th>
  </tr>
</thead>

            <tbody>

              {bids.map((bid) => (
                <tr key={bid._id} className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">{bid.taskTitle}</td>
      <td className="px-6 py-4">{bid.clientName}</td>
      <td className="px-6 py-4">${bid.price}</td>
      <td className="px-6 py-4">{bid.deliveryDays} Days</td>
      <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        bid.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : bid.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {bid.status}
                    </span>
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