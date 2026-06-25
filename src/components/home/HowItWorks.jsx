const steps = [
  "Post a Task",
  "Get Proposals",
  "Hire & Pay",
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step}
              className="bg-white rounded-2xl p-8 text-center border"
            >
              <div className="text-5xl font-bold text-blue-600 mb-4">
                {index + 1}
              </div>

              <h3 className="font-semibold text-xl">
                {step}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}