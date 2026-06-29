// "use client";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "@/components/payment/CheckoutForm";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PK
// );

// export default function PaymentPage() {
//   return (
//     <div className="max-w-xl mx-auto py-16 px-4">
//       <div className="bg-white rounded-2xl shadow border p-8">
//         <h1 className="text-3xl font-bold mb-8">
//           Complete Payment
//         </h1>

//         <Elements stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       </div>
//     </div>
//   );
// }

"use client";

import { useParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/payment/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PK
);

export default function PaymentPage() {
  const { id } = useParams();

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <div className="bg-white rounded-2xl shadow border p-8">

        <h1 className="text-3xl font-bold mb-8">
          Complete Payment
        </h1>

        <Elements stripe={stripePromise}>
          <CheckoutForm bidId={id} />
        </Elements>

      </div>
    </div>
  );
}