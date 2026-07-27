import { useState } from "react";

const CreateBookingModal = ({ isOpen, onClose, onAddBooking }) => {
  const [newBooking, setNewBooking] = useState({ guest: "", room: "", amount: "" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBooking.guest) return;
    onAddBooking(newBooking);
    setNewBooking({ guest: "", room: "", amount: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-900">New Reservation Entry</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Guest Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={newBooking.guest}
              onChange={(e) => setNewBooking({ ...newBooking, guest: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Room Category / Number</label>
            <input
              type="text"
              placeholder="e.g. 102 (Deluxe)"
              value={newBooking.room}
              onChange={(e) => setNewBooking({ ...newBooking, room: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Total Booking Amount</label>
            <input
              type="text"
              placeholder="e.g. ₹10,500"
              value={newBooking.amount}
              onChange={(e) => setNewBooking({ ...newBooking, amount: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 cursor-pointer"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingModal;
