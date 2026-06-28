"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

import { signIn } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      return setError("Please fill in all fields.");
    }

    // try {
    //   setLoading(true);

    //   // Better Auth Login
    //   await signIn.email({
    //     email: formData.email,
    //     password: formData.password,
    //   });

    //   // Get User Role
    //   const { data } = await axiosInstance.get(
    //     `/users/${formData.email}`
    //   );

    //   if (data?.role === "admin") {
    //     router.push("/dashboard/admin");
    //   } else if (data?.role === "freelancer") {
    //     router.push("/dashboard/freelancer");
    //   } else {
    //     router.push("/");
    //   }
    // } catch (err) {
    //   console.log(err);
    //   setError("Invalid email or password.");
    // } finally {
    //   setLoading(false);
    // }
    try {
  setLoading(true);

  const result = await signIn.email({
    email: formData.email,
    password: formData.password,
  });

  console.log("Login Result:", result);

  const { data } = await axiosInstance.get(`/users/${formData.email}`);
router.push('/')
//   if (data?.role === "admin") {
//     router.push("/dashboard/admin");
//   } else if (data?.role === "freelancer") {
//     router.push("/dashboard/freelancer");
//   } else {
//     router.push("/");
//   }
// test@test.com || TestTest$1

} catch (err) {
  console.log("========== LOGIN ERROR ==========");
  console.log(err);
  console.log("message:", err?.message);
  console.log("response:", err?.response?.data);

  setError(err?.response?.data?.message || err?.message || "Login failed");
} finally {
  setLoading(false);
}
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.log(err);
      setError("Google Login Failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center px-4 py-12">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
        className="w-full max-w-lg"
      >

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">

          {/* Heading */}

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 mt-3">
              Login to continue using SkillSwap.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />

            </div>

            {/* Password */}

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />

            </div>

            {/* Error */}

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}

            <Button
              type="submit"
              fullWidth
              isLoading={loading}
              className="h-12 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold"
            >
              Login
            </Button>

          </form>

          {/* Divider */}

          <div className="flex items-center gap-4 my-7">

            <div className="flex-1 border-t"></div>

            <span className="text-sm text-gray-500">
              OR
            </span>

            <div className="flex-1 border-t"></div>

          </div>

          {/* Google */}

          <Button
            fullWidth
            variant="bordered"
            startContent={<FcGoogle size={22} />}
            onPress={handleGoogleLogin}
            isLoading={googleLoading}
            className="h-12"
          >
            Continue with Google
          </Button>

          {/* Register */}

          <p className="mt-7 text-center text-gray-600">

            Don't have an account?{" "}

            <Link
              href="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </motion.div>

    </section>
  );
}