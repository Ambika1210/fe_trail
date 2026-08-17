import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "../../../utils/toast.jsx";

const SuperAdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  const getNavLinkClass = ({ isActive }) =>
    `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all whitespace-nowrap ${
      isActive
        ? "bg-sky-50 text-sky-600 border border-sky-200/80 font-bold shadow-xs"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
    }`;

  return (
    <aside className="w-52 flex-shrink-0 bg-white border-r border-sky-100 flex flex-col justify-between p-3 shadow-sm z-20">
      <div>
        {/* Logo / Title */}
        <div className="flex items-center gap-2.5 px-2 py-3 border-b border-sky-100 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 via-sky-600 to-blue-600 flex items-center justify-center font-bold text-white text-base shadow-sm shadow-sky-500/25">
            SA
          </div>
          <div className="overflow-hidden">
            <h2 className="font-extrabold text-slate-900 text-sm leading-tight">Super Admin</h2>
            <span className="text-[10px] text-sky-600 font-semibold block">Control Center</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          <NavLink to="/super-admin/overview" className={getNavLinkClass}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Overview
          </NavLink>

          <NavLink to="/super-admin/hotels" className={getNavLinkClass}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0v-4m0 4h5m-5 0v-4m5 4v-4m-5-4h5" />
            </svg>
            Hotels Management
          </NavLink>

          <NavLink to="/super-admin/users" className={getNavLinkClass}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Users & Admins
          </NavLink>
        </nav>
      </div>

      {/* Footer / Back home */}
      <div className="pt-3 border-t border-sky-100 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-sky-600 px-2 py-1.5 rounded-lg hover:bg-sky-50 transition font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Public Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-1.5 text-[11px] text-rose-600 hover:text-rose-700 px-2 py-1.5 rounded-lg hover:bg-rose-50 transition font-bold cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SuperAdminSidebar;
