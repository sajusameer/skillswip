export default function Statistics() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-violet-50">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            Trusted by Clients & Freelancers
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Join thousands of clients and freelancers who use SkillSwap
            to complete projects, collaborate efficiently, and grow their careers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <h3 className="text-5xl font-bold text-blue-600">
              500+
            </h3>
            <p className="mt-3 text-gray-600">
              Tasks Posted
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <h3 className="text-5xl font-bold text-blue-600">
              250+
            </h3>
            <p className="mt-3 text-gray-600">
              Freelancers
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <h3 className="text-5xl font-bold text-blue-600">
              $20K+
            </h3>
            <p className="mt-3 text-gray-600">
              Payouts
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}