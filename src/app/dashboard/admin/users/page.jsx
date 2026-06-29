"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/users");
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, role) => {
    try {
      await axiosInstance.patch(`/admin/users/${id}`, {
        role,
      });

      toast.success("Role Updated");

      fetchUsers();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await axiosInstance.delete(`/admin/users/${id}`);

      toast.success("User Deleted");

      fetchUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section>

      <h1 className="text-3xl font-bold mb-8">
        Manage Users
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl border shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id} className="border-t">

                <td className="p-4">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4 capitalize">
                  {user.role}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2 flex-wrap">

                    <button
                      onClick={() => changeRole(user._id, "client")}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Client
                    </button>

                    <button
                      onClick={() => changeRole(user._id, "freelancer")}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Freelancer
                    </button>

                    <button
                      onClick={() => changeRole(user._id, "admin")}
                      className="px-3 py-2 bg-violet-600 text-white rounded-lg"
                    >
                      Admin
                    </button>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}