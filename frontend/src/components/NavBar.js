import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isAdminPath = location.pathname.startsWith("/admin");

  const NavItem = (path, label) => (
    <Link
      to={path}
      onClick={() => setOpen(false)}
      className={`relative px-2 py-2 transition-all duration-200 
        ${location.pathname === path
          ? "text-white font-semibold after:w-full after:bg-cyan-400"
          : "text-gray-300 hover:text-white after:w-0 hover:after:w-full"}
        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full after:transition-all`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-[#0A0D16] text-white border-b border-white/10 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🏸</span>
          <h1 className="text-xl font-bold tracking-wide">Court Booker</h1>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-lg font-medium">

          {NavItem("/", "Book Court")}
          {NavItem("/history", "Booking History")}

          <Link
            to="/admin"
            className={`px-2 py-2 transition-all duration-200 relative ${
              isAdminPath
                ? "text-white font-semibold after:w-full after:bg-cyan-400"
                : "text-gray-300 hover:text-white after:w-0 hover:after:w-full"
            } 
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full after:transition-all`}
          >
            Admin Panel →
          </Link>
        </div>
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
        >
          <span className={`h-[3px] w-7 bg-white rounded transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`h-[3px] w-7 bg-white rounded transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`h-[3px] w-7 bg-white rounded transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <div
        className={`md:hidden bg-[#101624] border-t border-white/10 overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 py-3" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 text-lg font-medium">
          {NavItem("/", "Book Court")}
          {NavItem("/history", "Booking History")}

          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className={`transition-all ${
              isAdminPath ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }`}
          >
            Admin Panel →
          </Link>
        </div>
      </div>
    </nav>
  );
}
