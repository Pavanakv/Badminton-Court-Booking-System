import { Outlet, Link, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const location = useLocation();

  const Item = (path, label) => {
    const active = location.pathname.startsWith(path);

    return (
      <Link
        to={path}
        className={`
          block px-4 py-3 rounded-lg font-medium transition-all duration-200
          ${
            active
              ? "bg-cyan-600 text-white"       
              : "text-gray-300 hover:bg-white/10"
          }
        `}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#05070F] text-white">
      <aside
        className="
          w-full md:w-64
          bg-[#0F1320]
          p-6 md:min-h-screen
          border-r border-white/10
          space-y-4
        "
      >
        <h1 className="text-2xl font-bold mb-6 tracking-wide">⚙️ Admin Panel</h1>

        <nav className="space-y-2">
          {Item("/admin", "Dashboard")}
          {Item("/admin/bookings", "All Bookings")}
          {Item("/admin/courts", "Manage Courts")}
          {Item("/admin/equipment", "Manage Equipment")}
          {Item("/admin/coaches", "Manage Coaches")}
          {Item("/admin/pricing", "Pricing Rules")}
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
