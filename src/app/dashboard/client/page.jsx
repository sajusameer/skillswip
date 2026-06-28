
import { ClipboardList, Wallet, CirclePlus, CheckCircle2 } from "lucide-react";

const stats = [
  {
    title: "Total Tasks",
    value: 12,
    icon: ClipboardList,
  },
  {
    title: "Open Tasks",
    value: 5,
    icon: CirclePlus,
  },
  {
    title: "Completed",
    value: 7,
    icon: CheckCircle2,
  },
  {
    title: "Payments",
    value: "$450",
    icon: Wallet,
  },
];

export default function ClientDashboard() {
  return (
    <section>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl shadow-sm border p-6"
          >

            <item.icon className="text-blue-600 mb-4" size={35} />

            <h3 className="text-gray-500">
              {item.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {item.value}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}