import { useState, useEffect } from "react";
import { getAllRoomsApi, createBookingApi } from "../../../services/coreService";
import { toast } from "../../../utils/toast.jsx";

const AllotRoomModal = ({ isOpen, onClose, guest }) => {
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [bookingData, setBookingData] = useState({
    roomId: "",
    checkIn: new Date().toISOString().split("T")[0],
    checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  });

  const activeHotelStr = localStorage.getItem("activeHotel");
  const activeHotel = activeHotelStr ? JSON.parse(activeHotelStr) : null;
  const hotelId = activeHotel?._id;

  useEffect(() => {
    if (isOpen && hotelId) {
      const fetchRooms = async () => {
        setLoadingRooms(true);
        try {
          const response = await getAllRoomsApi(hotelId);
          if (response.data && response.data.data) {
            // Only show rooms that are not occupied
            const availableRooms = response.data.data.filter((r) => !r.isOccupied);
            setRooms(availableRooms);
            if (availableRooms.length > 0) {
              setBookingData((prev) => ({ ...prev, roomId: availableRooms[0]._id }));
            }
          }
        } catch (err) {
          console.error("Failed to fetch rooms", err);
          toast.error("Failed to load rooms.");
        } finally {
          setLoadingRooms(false);
        }
      };
      fetchRooms();
    }
  }, [isOpen, hotelId]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.roomId || !bookingData.checkIn || !bookingData.checkOut) {
      toast.error("Please fill all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        hotelId,
        guestId: guest._id,
        roomId: bookingData.roomId,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
      };

      const response = await createBookingApi(payload);
      if (response.data && response.data.success) {
        toast.success("Room allotted successfully!");
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to allot room.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Allot Room</h3>
            <p className="text-xs text-slate-500">Assign a room to guest: <span className="font-bold text-sky-600">{guest?.name}</span></p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
            disabled={submitting}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-600 font-bold block mb-1">Select Available Room *</label>
            {loadingRooms ? (
              <div className="text-xs text-slate-400 py-2">Loading available rooms...</div>
            ) : rooms.length === 0 ? (
              <div className="text-sm font-semibold text-rose-500 py-2">No available rooms found for this hotel!</div>
            ) : (
              <select
                disabled={submitting}
                value={bookingData.roomId}
                onChange={(e) => setBookingData({ ...bookingData, roomId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
              >
                {rooms.map((r) => (
                  <option key={r._id} value={r._id}>
                    Room #{r.roomNumber} - {r.roomType || "Standard"} (₹{r.price}/night)
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-600 font-bold block mb-1">Check-In Date *</label>
              <input
                type="date"
                required
                disabled={submitting}
                value={bookingData.checkIn}
                onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="text-xs text-slate-600 font-bold block mb-1">Check-Out Date *</label>
              <input
                type="date"
                required
                disabled={submitting}
                value={bookingData.checkOut}
                onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || rooms.length === 0}
              className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 cursor-pointer disabled:opacity-50"
            >
              {submitting ? "Allotting..." : "Allot Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllotRoomModal;
