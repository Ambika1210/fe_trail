import { useLocation } from "react-router-dom";

const Header = ({ activeHotel, handleSwitchBack }) => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.endsWith("/bookings")) {
      return "Reservations & Bookings";
    }
    if (location.pathname.endsWith("/rooms")) {
      return "Room Inventory Management";
    }
    return "Dashboard Overview";
  };

  return (
    <header className="border-b border-sky-100 bg-white px-6 py-2 flex items-center justify-between sticky top-0 z-10 shadow-xs">
      <div>
        <h1 className="!text-base !font-extrabold text-slate-900 tracking-tight capitalize !m-0 !leading-tight">
          {getTitle()}
        </h1>
        <p className="text-[10px] text-sky-600 font-semibold mt-0.5">
          {activeHotel ? activeHotel.name : "Grand Palace Resort"} • Admin Operations
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSwitchBack}
          className="px-2.5 py-1 bg-sky-100 hover:bg-sky-200 border border-sky-200 text-sky-700 text-[11px] font-bold rounded-md transition cursor-pointer flex items-center gap-1"
        >
          🛡️ Super Admin
        </button>

        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
          HA
        </div>
      </div>
    </header>
  );
};

export default Header;
