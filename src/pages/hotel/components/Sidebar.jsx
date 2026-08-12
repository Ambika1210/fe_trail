import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ activeHotel, handleSwitchBack }) => {
  const getNavLinkClass = ({ isActive }) =>
    `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all whitespace-nowrap ${
      isActive
        ? "bg-sky-50 text-sky-600 border border-sky-200/80 font-bold shadow-xs"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
    }`;

  return (
    <aside className="w-52 flex-shrink-0 bg-white border-r border-sky-100 flex flex-col justify-between p-3 shadow-sm z-20">
      <div>
        {/* Logo / Hotel Title */}
        <div className="flex items-center gap-2.5 px-2 py-3 border-b border-sky-100 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 via-sky-600 to-blue-600 flex items-center justify-center font-bold text-white text-base shadow-sm shadow-sky-500/25">
            {activeHotel?.name ? activeHotel.name.charAt(0) : "H"}
          </div>
          <div className="overflow-hidden">
            <h2 className="font-extrabold text-slate-900 text-sm leading-tight truncate">
              {activeHotel ? activeHotel.name : "Hotel Panel"}
            </h2>
            <span className="text-[10px] text-sky-600 font-semibold block truncate">
              {activeHotel?.address || "Hotel Admin Portal"}
            </span>
          </div>
        </div>

        {/* Module Links */}
        <nav className="space-y-1">
          <NavLink to="/hotel-panel/dashboard" className={getNavLinkClass}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Hotel Dashboard
          </NavLink>

          <NavLink to="/hotel-panel/bookings" className={getNavLinkClass}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Bookings & Guests
          </NavLink>

          <NavLink to="/hotel-panel/rooms" className={getNavLinkClass}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0v-4m0 4h5m-5 0v-4m5 4v-4m-5-4h5" />
            </svg>
            Rooms Management
          </NavLink>
        </nav>
      </div>

      {/* Back link & Switch to Super Admin */}
      <div className="pt-3 border-t border-sky-100 space-y-1.5">
        <button
          onClick={handleSwitchBack}
          className="w-full flex items-center justify-center gap-1.5 text-[11px] text-sky-700 hover:text-sky-800 bg-sky-100 hover:bg-sky-200 border border-sky-200 px-2 py-2 rounded-lg transition font-bold cursor-pointer"
        >
          🛡️ Switch to Super Admin
        </button>

        <Link
          to="/"
          className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-sky-600 px-2 py-1.5 rounded-lg hover:bg-sky-50 transition font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Public Website
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
