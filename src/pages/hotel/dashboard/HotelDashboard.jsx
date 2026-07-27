import { useState, useEffect } from "react";
import { getAllRoomsApi } from "../../../services/coreService";

const HotelDashboard = ({ activeHotel, onNavigateToBookings }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getAllRoomsApi(activeHotel?._id);
        if (response.data && response.data.data) {
          setRooms(response.data.data);
        }
      } catch (err) {
        console.error("Dashboard failed to fetch rooms", err);
      }
    };
    fetchRooms();
  }, [activeHotel]);

  const availableRoomsCount = rooms.filter((r) => !r.isOccupied).length;
  const occupiedRoomsCount = rooms.filter((r) => r.isOccupied).length;

  const [recentBookings] = useState([
    { id: "BK-101", guest: "Rohan Verma", room: "104 (Deluxe)", checkIn: "2026-07-21", amount: "₹12,500", status: "Checked-In" },
    { id: "BK-102", guest: "Priya Nair", room: "202 (Suite)", checkIn: "2026-07-22", amount: "₹24,000", status: "Confirmed" },
    { id: "BK-103", guest: "Amit Patel", room: "305 (Executive)", checkIn: "2026-07-20", amount: "₹18,200", status: "Checked-Out" },
    { id: "BK-104", guest: "Sneha Roy", room: "110 (Standard)", checkIn: "2026-07-21", amount: "₹8,900", status: "Checked-In" },
  ]);

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5 hover:shadow-md transition">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Rooms</span>
            <span className="p-2 rounded-xl bg-sky-50 text-sky-600 text-lg">🛏️</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{rooms.length} Rooms</h3>
          <span className="text-xs text-sky-600 font-semibold mt-2 block">Live DB Rooms</span>
        </div>

        <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5 hover:shadow-md transition">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available (Khali)</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 text-lg">✅</span>
          </div>
          <h3 className="text-3xl font-black text-emerald-600">{availableRoomsCount}</h3>
          <span className="text-xs text-emerald-600 font-semibold mt-2 block">Ready for Guests</span>
        </div>

        <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5 hover:shadow-md transition">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Occupied (Bhara)</span>
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600 text-lg">🔴</span>
          </div>
          <h3 className="text-3xl font-black text-rose-600">{occupiedRoomsCount}</h3>
          <span className="text-xs text-rose-600 font-semibold mt-2 block">Active Stays</span>
        </div>

        <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5 hover:shadow-md transition">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Revenue</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 font-extrabold text-lg">₹</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">₹84,500</h3>
          <span className="text-xs text-emerald-600 font-semibold mt-2 block">↑ 14% vs yesterday</span>
        </div>
      </div>

      {/* Recent Reservations Table */}
      <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-slate-900">Recent Guest Reservations</h3>
          <button
            onClick={onNavigateToBookings}
            className="text-xs text-sky-600 hover:text-sky-700 font-bold cursor-pointer"
          >
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase text-slate-600 border-b border-sky-100 font-bold">
              <tr>
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">Guest Name</th>
                <th className="px-4 py-3">Room Assigned</th>
                <th className="px-4 py-3">Check-In</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-sky-50/40 transition">
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">{b.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{b.guest}</td>
                  <td className="px-4 py-3 text-slate-600">{b.room}</td>
                  <td className="px-4 py-3 text-slate-500">{b.checkIn}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600">{b.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        b.status === "Checked-In"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : b.status === "Confirmed"
                          ? "bg-sky-50 text-sky-700 border border-sky-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HotelDashboard;
