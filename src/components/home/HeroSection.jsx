"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50">

      {/* Animated Background */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
          >
            <span className="inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              🚀 Freelance Micro-Task Marketplace
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight"
          >
            Get your tasks done by{" "}

            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              skilled freelancers
            </span>

          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .3 }}
            className="mx-auto mt-8 max-w-3xl text-lg md:text-xl leading-8 text-gray-600"
          >
            Post your task, receive proposals from talented freelancers,
            compare offers, hire the perfect match, and complete your
            project quickly—all in one trusted marketplace.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .5 }}
            className="mt-12 flex flex-col justify-center gap-5 sm:flex-row"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{ scale: .95 }}
            >
              <Link
                href="/register"
                className="inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-lg transition-shadow hover:shadow-2xl"
              >
                Post a Task
              </Link>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{ scale: .95 }}
            >
              <Link
                href="/browse-tasks"
                className="inline-flex rounded-xl border border-blue-200 bg-white px-8 py-4 font-semibold text-gray-700 shadow-md hover:border-blue-600 hover:text-blue-600"
              >
                Browse Tasks
              </Link>
            </motion.div>
          </motion.div>

        </div>

      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-white to-transparent" />

    </section>
  );
}