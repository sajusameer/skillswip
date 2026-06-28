import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-blue-100 bg-gradient-to-br from-blue-50 via-white to-violet-50">
      {/* Background Blur */}
      <div className="absolute -top-20 left-10 w-72 h-72 rounded-full bg-blue-300/20 blur-3xl"></div>
      <div className="absolute -bottom-20 right-10 w-72 h-72 rounded-full bg-violet-300/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              SkillSwap
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Connect with skilled freelancers, post tasks, hire talent,
              and grow your business with confidence.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Explore
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>

              <Link
                href="/browse-tasks"
                className="hover:text-blue-600 transition"
              >
                Browse Tasks
              </Link>

              <Link
                href="/freelancers"
                className="hover:text-blue-600 transition"
              >
                Freelancers
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link href="#" className="hover:text-blue-600 transition">
                About Us
              </Link>

              <Link href="#" className="hover:text-blue-600 transition">
                Contact
              </Link>

              <Link href="#" className="hover:text-blue-600 transition">
                Privacy Policy
              </Link>

              <Link href="#" className="hover:text-blue-600 transition">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-900 hover:text-white transition"
              >
                <FaXTwitter />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center hover:bg-blue-700 hover:text-white transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-900 hover:text-white transition"
              >
                <FaGithub />
              </a>

            </div>

            <p className="mt-6 text-gray-600">
              📧 support@skillswap.com
            </p>
          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-blue-100 mt-14 pt-6  items-center text-center">

          <p className="text-gray-500 text-sm">
            © 2026 SkillSwap. All Rights Reserved.
          </p>

         

        </div>

      </div>
    </footer>
  );
}