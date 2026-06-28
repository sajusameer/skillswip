"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, RadioGroup, Radio } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { signIn, signUp } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("client");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    const { name, email, image, password } = formData;

    if (!name || !email || !password) {
      return setError("Please fill all required fields.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (!/[A-Z]/.test(password)) {
      return setError(
        "Password must contain at least one uppercase letter."
      );
    }

    if (!/[a-z]/.test(password)) {
      return setError(
        "Password must contain at least one lowercase letter."
      );
    }

    try {
      setLoading(true);

      await signUp.email({
        name,
        email,
        password,
        image,
        callbackURL: "/",
      });

      await axiosInstance.post("/users", {
        name,
        email,
        image,
        role,
        });

        router.push(
        role === "freelancer"
            ? "/dashboard/freelancer"
            : "/"
        );

      router.push("/");
    } catch (err) {
      setError(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

 const handleGoogle = async () => {
  try {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    
  } catch (error) {
    console.log(error);
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

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join SkillSwap and start your freelancing journey.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* <RadioGroup
              label="Account Type"
              aria-label="Account Type"
              orientation="vertical"
              value={role}
              onValueChange={setRole}
            >
              <Radio value="client">
                Client
              </Radio>

              <Radio value="freelancer">
                Freelancer
              </Radio>
            </RadioGroup> */}

            <div className="space-y-3">
        <label className="flex items-center gap-3">
            <input
            type="checkbox"
            checked={role === "freelancer"}
            onChange={(e) =>
                setRole(e.target.checked ? "freelancer" : "client")
            }
            className="w-5 h-5 accent-blue-600"
            />
            <span>I want to register as a Freelancer</span>
        </label>

        <p className="text-sm text-gray-500">
            If unchecked, your account will be created as a Client.
        </p>
        </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">
                {error}
              </p>
            )}

            <Button
              type="submit"
              fullWidth
              isLoading={loading}
              className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold h-12"
            >
              Create Account
            </Button>

          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t"></div>

            <span className="text-sm text-gray-500">
              OR
            </span>

            <div className="flex-1 border-t"></div>
          </div>

          <Button
            fullWidth
            variant="bordered"
            startContent={<FcGoogle size={22} />}
            onPress={handleGoogle}
            className="h-12"
          >
            Continue with Google
          </Button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </motion.div>

    </section>
  );
}