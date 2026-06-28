
"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const { isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600 font-medium">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <DashboardSidebar />

        <div className="flex-1 lg:ml-72">
          <DashboardNavbar />

          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

