"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function FreelancerProfilePage() {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    bio: "",
    skills: "",
    experience: "",
    location: "",
    hourlyRate: "",
  });

  useEffect(() => {
    if (session?.user?.email) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/users/${session.user.email}`
      );

      setFormData({
        name: data.name || "",
        image: data.image || "",
        bio: data.bio || "",
        skills: data.skills || "",
        experience: data.experience || "",
        location: data.location || "",
        hourlyRate: data.hourlyRate || "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await axiosInstance.put(
        `/profile/${session.user.email}`,
        formData
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto">

      <div className="bg-white rounded-2xl shadow border p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>
            <label className="font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Profile Image URL
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Bio
            </label>

            <textarea
              rows={4}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              placeholder="React, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="font-medium">
                Experience
              </label>

              <input
                type="text"
                name="experience"
                placeholder="2 Years"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Hourly Rate ($)
              </label>

              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 mt-2"
              />
            </div>

          </div>

          <div>
            <label className="font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 text-white font-semibold"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </form>

      </div>

    </section>
  );
}