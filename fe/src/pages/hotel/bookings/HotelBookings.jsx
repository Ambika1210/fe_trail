import { useState } from "react";
import CreateBookingModal from "./CreateBookingModal";

const HotelBookings = () => {
  const [bookings, setBookings] = useState([
    { id: "BK-101", guest: "Rohan Verma", room: "104 (Deluxe)", checkIn: "2026-07-21", checkOut: "2026-07-24", amount: "₹12,500", status: "Checked-In" },
    { id: "BK-102", guest: "Priya Nair", room: "202 (Suite)", checkIn: "2026-07-22", checkOut: "2026-07-25", amount: "₹24,000", status: "Confirmed" },
    { id: "BK-103", guest: "Amit Patel", room: "305 (Executive)", checkIn: "2026-07-20", checkOut: "2026-07-22", amount: "₹18,200", status: "Checked-Out" },
    { id: "BK-104", guest: "Sneha Roy", room: "110 (Standard)", checkIn: "2026-07-21", checkOut: "2026-07-23", amount: "₹8,900", status: "Checked-In" },
  ]);

  const [showAddBookingModal, setShowAddBookingModal] = useState(false);

  const handleAddBooking = (newBooking) => {
    setBookings([
      {
        id: `BK-${Math.floor(100 + Math.random() * 900)}`,
        guest: newBooking.guest,
        room: newBooking.room || "101 (Standard)",
        checkIn: "2026-07-21",
        checkOut: "2026-07-23",
        amount: newBooking.amount || "₹9,500",
        status: "Confirmed",
      },
      ...bookings,
    ]);
  };

  return (
    <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Full Reservations Directory</h2>
          <p className="text-xs text-slate-500">Manage all guest check-ins, check-outs, and active stays</p>
        </div>
        <button
          onClick={() => setShowAddBookingModal(true)}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 cursor-pointer"
        >
          + Add Booking
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs uppercase text-slate-600 border-b border-sky-100 font-bold">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Guest Name</th>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Check-In</th>
              <th className="px-4 py-3">Check-Out</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-sky-50/40 transition">
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{b.id}</td>
                <td className="px-4 py-3 font-bold text-slate-900">{b.guest}</td>
                <td className="px-4 py-3">{b.room}</td>
                <td className="px-4 py-3 text-slate-500">{b.checkIn}</td>
                <td className="px-4 py-3 text-slate-500">{b.checkOut}</td>
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

      <CreateBookingModal
        isOpen={showAddBookingModal}
        onClose={() => setShowAddBookingModal(false)}
        onAddBooking={handleAddBooking}
      />
    </div>
  );
};

export default HotelBookings;
