import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
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