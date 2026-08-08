import { useState } from "react";
import { createGuestApi } from "../../../services/coreService";
import { toast } from "../../../utils/toast.jsx";

const CreateBookingModal = ({ isOpen, onClose, onAddGuest }) => {
  const [guestData, setGuestData] = useState({
    name: "",
    mobile: "",
    address: "",
    idType: "AADHAAR",
    idNumber: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestData.name || !guestData.mobile || !guestData.address || !guestData.idNumber) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const activeHotelStr = localStorage.getItem("activeHotel");
      if (!activeHotelStr) {
        toast.error("No active hotel selected.");
        return;
      }
      const activeHotel = JSON.parse(activeHotelStr);
      const hotelId = activeHotel?._id;
      if (!hotelId) {
        toast.error("Active hotel ID not found.");
        return;
      }

      setLoading(true);
      const response = await createGuestApi({
        ...guestData,
        hotelId,
      });

      if (response.data && response.data.success) {
        toast.success(response.data.message || "Guest created successfully");
        onAddGuest(response.data.data);
        setGuestData({
          name: "",
          mobile: "",
          address: "",
          idType: "AADHAAR",
          idNumber: "",
        });
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create guest");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-900">New Guest Entry</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Guest Full Name *</label>
            <input
              type="text"
              required
              disabled={loading}
              placeholder="e.g. Rahul Sharma"
              value={guestData.name}
              onChange={(e) => setGuestData({ ...guestData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Mobile Number *</label>
            <input
              type="tel"
              required
              disabled={loading}
              placeholder="e.g. +91 9876543210"
              value={guestData.mobile}
              onChange={(e) => setGuestData({ ...guestData, mobile: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Address *</label>
            <input
              type="text"
              required
              disabled={loading}
              placeholder="e.g. Sector 15, Rohini, New Delhi"
              value={guestData.address}
              onChange={(e) => setGuestData({ ...guestData, address: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-600 font-bold block mb-1">ID Type *</label>
              <select
                disabled={loading}
                value={guestData.idType}
                onChange={(e) => setGuestData({ ...guestData, idType: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition disabled:opacity-50"
              >
                <option value="AADHAAR">Aadhaar</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVING_LICENSE">Driving License</option>
                <option value="VOTER_ID">Voter ID</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600 font-bold block mb-1">ID Number *</label>
              <input
                type="text"
                required
                disabled={loading}
                placeholder="e.g. 1234-5678-9012"
                value={guestData.idNumber}
                onChange={(e) => setGuestData({ ...guestData, idNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Saving..." : "Confirm Guest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingModal;
