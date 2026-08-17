import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "../../../utils/toast.jsx";
import {
  MdDashboard,
  MdPeople,
  MdKingBed,
  MdAdminPanelSettings,
  MdArrowBack,
  MdLogout,
  MdReceiptLong,
} from "react-icons/md";

const navItems = [
  {
    label: "Hotel Dashboard",
    path: "/hotel-panel/dashboard",
    icon: MdDashboard,
  },
  {
    label: "Guests List",
    path: "/hotel-panel/guests",
    icon: MdPeople,
  },
  {
    label: "Rooms Management",
    path: "/hotel-panel/rooms",
    icon: MdKingBed,
  },
  {
    label: "Bookings",
    path: "/hotel-panel/bookings",
    icon: MdReceiptLong,
  }
];

const Sidebar = ({ activeHotel, handleSwitchBack }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getNavLinkClass = ({ isActive }) =>
    `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all whitespace-nowrap ${isActive
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
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={getNavLinkClass}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Back link & Switch to Super Admin */}
      <div className="pt-3 border-t border-sky-100 space-y-1.5">
        {localStorage.getItem("originalRole") === "SUPER_ADMIN" && (
          <button
            onClick={handleSwitchBack}
            className="w-full flex items-center justify-center gap-1.5 text-[11px] text-sky-700 hover:text-sky-800 bg-sky-100 hover:bg-sky-200 border border-sky-200 px-2 py-2 rounded-lg transition font-bold cursor-pointer"
          >
            <MdAdminPanelSettings className="w-3.5 h-3.5 flex-shrink-0" />
            Switch to Super Admin
          </button>
        )}

        <Link
          to="/"
          className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-sky-600 px-2 py-1.5 rounded-lg hover:bg-sky-50 transition font-medium"
        >
          <MdArrowBack className="w-3.5 h-3.5 flex-shrink-0" />
          Back to Public Website
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-1.5 text-[11px] text-rose-600 hover:text-rose-700 px-2 py-1.5 rounded-lg hover:bg-rose-50 transition font-bold cursor-pointer"
        >
          <MdLogout className="w-3.5 h-3.5 flex-shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
