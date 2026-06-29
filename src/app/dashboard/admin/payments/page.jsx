"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data } = await axiosInstance.get("/payments");

      setPayments(data);
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <section>

      <h1 className="text-3xl font-bold mb-8">
        Payment History
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow border">

        <table className="table">

          <thead>

            <tr>
              <th>Transaction ID</th>
              <th>Client</th>
              <th>Freelancer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="px-6">{payment.transactionId}</td>
                <td className="px-6">{payment.clientEmail}</td>
                <td className="px-6">{payment.freelancerEmail}</td>
                <td className="px-6">${payment.amount}</td>
                <td className="px-6">{payment.status}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}