"use client";

import { useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function CheckoutForm({ bidId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [bid, setBid] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= Fetch Bid =================

  useEffect(() => {
    const fetchBid = async () => {
      try {
        const { data } = await axiosInstance.get(`/bids/${bidId}`);
        setBid(data);
      } catch (error) {
        toast.error("Failed to load payment details.");
      }
    };

    if (bidId) {
      fetchBid();
    }
  }, [bidId]);

  // ================= Create Payment Intent =================

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await axiosInstance.post(
          "/create-payment-intent",
          {
            amount: Number(bid.price),
          }
        );

        setClientSecret(data.clientSecret);
      } catch (error) {
        toast.error("Failed to initialize payment.");
      }
    };

    if (bid) {
      createPaymentIntent();
    }
  }, [bid]);

  // ================= Handle Payment =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const card = elements.getElement(CardElement);

    if (!card) {
      setLoading(false);
      return;
    }

    const { error, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        await axiosInstance.post("/payments", {
          transactionId: paymentIntent.id,

          bidId: bid._id,
          taskId: bid.taskId,

          clientEmail: bid.clientEmail,
          freelancerEmail: bid.freelancerEmail,

          amount: bid.price,

          status: "paid",
        });

        toast.success("Payment Successful");
      } catch (err) {
        toast.error("Payment saved failed.");
      }
    }

    setLoading(false);
  };

  if (!bid) {
    return (
      <div className="text-center py-10">
        Loading payment details...
      </div>
    );
  }

  return (
    <div>

      <div className="mb-6 space-y-2 border rounded-xl p-5">

        <h2 className="text-xl font-bold">
          {bid.taskTitle}
        </h2>

        <p>
          Freelancer :
          <span className="font-semibold">
            {" "}
            {bid.freelancerName}
          </span>
        </p>

        <p>
          Amount :
          <span className="font-bold text-green-600">
            {" "}
            ${bid.price}
          </span>
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="border rounded-xl p-4">
          <CardElement />
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret || loading}
          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 rounded-xl disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : `Pay $${bid.price}`}
        </button>
      </form>

    </div>
  );
}