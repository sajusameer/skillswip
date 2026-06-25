const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Owner",
    review:
      "SkillSwap helped me find talented freelancers quickly. The process was smooth and professional.",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Freelancer",
    review:
      "I found multiple clients through SkillSwap and increased my earnings significantly.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Startup Founder",
    review:
      "The platform made hiring freelancers simple and efficient.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            What Our Users Say
          </h2>
          <p className="text-gray-600 mt-4">
            Hear from clients and freelancers who trust SkillSwap.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-sm border"
            >
              <p className="text-gray-600 mb-4">
                {item.review}
              </p>

              <h3 className="font-bold">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.role}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}