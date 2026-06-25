import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-violet-50" />

      {/* Blur Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-violet-300/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">

          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
            Freelance Micro-Task Marketplace
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Get your tasks done by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              skilled freelancers
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Post tasks, receive proposals from talented freelancers,
            hire the best match, and get work done faster.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/browse-tasks"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:scale-105 transition"
            >
              Browse Tasks
            </Link>

            <Link
              href="/register"
              className="px-8 py-4 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100 transition"
            >
              Become a Freelancer
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}