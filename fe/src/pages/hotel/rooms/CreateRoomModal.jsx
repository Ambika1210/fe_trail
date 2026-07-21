import { useState } from "react";
import { createRoomApi } from "../../../services/coreService";
import { toast } from "../../../utils/toast.jsx";

const CreateRoomModal = ({ isOpen, onClose, onRoomCreated, activeHotel }) => {
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    roomType: "Deluxe Ocean View",
    price: "",
    isOccupied: false,
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRoom.roomNumber) {
      toast.error("Please enter room number");
      return;
    }

    setSubmitting(true);
    try {
      await createRoomApi({
        roomNumber: newRoom.roomNumber,
        roomType: newRoom.roomType || "Standard",
        price: Number(newRoom.price) || 0,
        isOccupied: Boolean(newRoom.isOccupied),
        hotelId: activeHotel?._id,
      });

      toast.success("Room created successfully!");
      setNewRoom({ roomNumber: "", roomType: "Deluxe Ocean View", price: "", isOccupied: false });
      onClose();
      onRoomCreated();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create room");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Create New Room (POST API)</h3>
            <p className="text-xs text-sky-600 font-semibold">Add room to {activeHotel?.name || "Hotel"}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Room Number *</label>
            <input
              type="text"
              required
              placeholder="e.g. 101, 102-A"
              value={newRoom.roomNumber}
              onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Room Category / Type</label>
            <select
              value={newRoom.roomType}
              onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            >
              <option value="Deluxe Ocean View">Deluxe Ocean View</option>
              <option value="Presidential Suite">Presidential Suite</option>
              <option value="Executive Suite">Executive Suite</option>
              <option value="Standard Room">Standard Room</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Price per Night (₹)</label>
            <input
              type="number"
              placeholder="e.g. 4500"
              value={newRoom.price}
              onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Room Status (Occupancy Flag)</label>
            <select
              value={newRoom.isOccupied ? "true" : "false"}
              onChange={(e) => setNewRoom({ ...newRoom, isOccupied: e.target.value === "true" })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            >
              <option value="false">Khali / Available (isOccupied: false)</option>
              <option value="true">Occupied / Bhara Hua (isOccupied: true)</option>
            </select>
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
              disabled={submitting}
              className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Creating..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
