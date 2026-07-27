import { useState } from "react";
import { Link } from "react-router-dom";
import { useHotelSwitch } from "../../hooks/useHotelSwitch";

// Independent Self-Contained Domain Modules
import HotelDashboard from "./dashboard/HotelDashboard";
import HotelRooms from "./rooms/HotelRooms";
import HotelBookings from "./bookings/HotelBookings";

const HotelPanel = () => {
  const { handleSwitchBack } = useHotelSwitch();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeHotel] = useState(() => {
    try {
      const saved = localStorage.getItem("activeHotel");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  return (
    <div className="flex h-screen bg-sky-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-sky-100 flex flex-col justify-between p-4 shadow-sm z-20">
        <div>
          {/* Logo / Hotel Title */}
          <div className="flex items-center gap-3 px-3 py-4 border-b border-sky-100 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-sky-600 to-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-md shadow-sky-500/25">
              {activeHotel?.name ? activeHotel.name.charAt(0) : "H"}
            </div>
            <div className="overflow-hidden">
              <h2 className="font-extrabold text-slate-900 text-base leading-tight truncate">
                {activeHotel ? activeHotel.name : "Hotel Panel"}
              </h2>
              <span className="text-xs text-sky-600 font-semibold block truncate">
                {activeHotel?.address || "Hotel Admin Portal"}
              </span>
            </div>
          </div>

          {/* Module Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all whitespace-nowrap ${
                activeTab === "dashboard"
                  ? "bg-sky-50 text-sky-600 border border-sky-200/80 font-bold shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Hotel Dashboard
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all whitespace-nowrap ${
                activeTab === "bookings"
                  ? "bg-sky-50 text-sky-600 border border-sky-200/80 font-bold shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Bookings & Guests
            </button>

            <button
              onClick={() => setActiveTab("rooms")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all whitespace-nowrap ${
                activeTab === "rooms"
                  ? "bg-sky-50 text-sky-600 border border-sky-200/80 font-bold shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0v-4m0 4h5m-5 0v-4m5 4v-4m-5-4h5" />
              </svg>
              Rooms Management
            </button>
          </nav>
        </div>

        {/* Back link & Switch to Super Admin */}
        <div className="pt-4 border-t border-sky-100 space-y-2">
          <button
            onClick={handleSwitchBack}
            className="w-full flex items-center gap-2 text-xs text-sky-700 hover:text-sky-800 bg-sky-100 hover:bg-sky-200 border border-sky-200 px-3 py-2.5 rounded-xl transition font-bold cursor-pointer"
          >
            🛡️ Switch to Super Admin
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-sky-600 px-3 py-2 rounded-lg hover:bg-sky-50 transition font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Public Website
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-sky-50">
        {/* Top Header */}
        <header className="border-b border-sky-100 bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-xs">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight capitalize">
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "bookings" && "Reservations & Bookings"}
              {activeTab === "rooms" && "Room Inventory Management"}
            </h1>
            <p className="text-xs text-sky-600 font-semibold mt-0.5">{activeHotel ? activeHotel.name : "Grand Palace Resort"} • Admin Operations</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSwitchBack}
              className="px-3.5 py-2 bg-sky-100 hover:bg-sky-200 border border-sky-200 text-sky-700 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              🛡️ Super Admin
            </button>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              HA
            </div>
          </div>
        </header>

        {/* Render Independent Domain Modules */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {activeTab === "dashboard" && (
            <HotelDashboard
              activeHotel={activeHotel}
              onNavigateToBookings={() => setActiveTab("bookings")}
            />
          )}

          {activeTab === "bookings" && <HotelBookings />}

          {activeTab === "rooms" && <HotelRooms activeHotel={activeHotel} />}
        </div>
      </main>
    </div>
  );
};

export default HotelPanel;
