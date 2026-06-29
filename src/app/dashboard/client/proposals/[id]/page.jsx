"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ProposalPage() {
  const { id } = useParams();

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const { data } = await axiosInstance.get(`/bids/task/${id}`);

      setBids(data);
    } catch (err) {
      toast.error("Failed to load proposals");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }
  const handleAccept = async (id) => {
  try {
    const { data } = await axiosInstance.patch(`/bids/accept/${id}`);

    toast.success(data.message);

    fetchBids(); 
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed");
  }
};

const handleReject = async (id) => {
  try {
    const { data } = await axiosInstance.patch(`/bids/reject/${id}`);

    toast.success(data.message);

    fetchBids();
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed");
  }
};

  return (
    <section className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Proposals
      </h1>

      {bids.length === 0 ? (
        <div className="bg-white rounded-xl border p-8 text-center">
          No proposal submitted yet.
        </div>
      ) : (
        <div className="space-y-6">

          {bids.map((bid) => (

            <div
              key={bid._id}
              className="bg-white rounded-xl shadow border p-6"
            >

              <h2 className="text-2xl font-bold">
                {bid.freelancerName}
              </h2>

              <p className="text-gray-500 mb-5">
                {bid.freelancerEmail}
              </p>

              <div className="grid md:grid-cols-3 gap-5">

                <div>
                  <p className="text-gray-500">
                    Bid Amount
                  </p>

                  <h3 className="font-bold text-green-600 text-xl">
                    ${bid.price}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Delivery
                  </p>

                  <h3>
                    {bid.deliveryDays} Days
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Status
                  </p>

                  <h3 className="capitalize">
                    {bid.status}
                  </h3>
                </div>

              </div>

              <div className="mt-6">

                <p className="font-semibold mb-2">
                  Proposal
                </p>

                <p className="text-gray-700">
                  {bid.proposal}
                </p>

              </div>

              {/* <div className="flex gap-3 mt-8">

                <button
                onClick={() => handleAccept(bid._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                >
                  Accept
                </button>

                <button
                onClick={() => handleReject(bid._id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg"
                >
                  Reject
                </button>

              </div> */}
              <div className="flex gap-3 mt-8">

  {bid.status === "pending" && (
    <>
      <button
        onClick={() => handleAccept(bid._id)}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
      >
        Accept
      </button>

      <button
        onClick={() => handleReject(bid._id)}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
      >
        Reject
      </button>
    </>
  )}

  {bid.status === "accepted" && (
     <Link href={`/payment/${bid._id}`}>
    <button
    
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg"
    >
      Pay Now
    </button>
    </Link>
  )}

  {bid.status === "rejected" && (
    <button
      disabled
      className="bg-gray-400 text-white px-3 py-2 rounded-lg cursor-not-allowed"
    >
      Rejected
    </button>
  )}

</div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}