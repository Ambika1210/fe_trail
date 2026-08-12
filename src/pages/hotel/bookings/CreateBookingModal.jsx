import { useState, useEffect } from "react";
import { createGuestApi, getAllRoomsApi, createBookingApi } from "../../../services/coreService";
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
  const [assignRoom, setAssignRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [bookingData, setBookingData] = useState({
    roomId: "",
    checkIn: new Date().toISOString().split("T")[0],
    checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  });

  const activeHotelStr = localStorage.getItem("activeHotel");
  const activeHotel = activeHotelStr ? JSON.parse(activeHotelStr) : null;
  const hotelId = activeHotel?._id;

  useEffect(() => {
    if (isOpen && hotelId && assignRoom) {
      const fetchRooms = async () => {
        setLoadingRooms(true);
        try {
          const response = await getAllRoomsApi(hotelId);
          if (response.data && response.data.data) {
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
  }, [isOpen, hotelId, assignRoom]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestData.name || !guestData.mobile || !guestData.address || !guestData.idNumber) {
      toast.error("Please fill all required fields");
      return;
    }

    if (assignRoom && (!bookingData.roomId || !bookingData.checkIn || !bookingData.checkOut)) {
      toast.error("Please fill all room stay details");
      return;
    }

    try {
      if (!hotelId) {
        toast.error("Active hotel ID not found.");
        return;
      }

      setLoading(true);
      // 1. Create Guest
      const guestResponse = await createGuestApi({
        ...guestData,
        hotelId,
      });

      if (guestResponse.data && guestResponse.data.success) {
        const newGuest = guestResponse.data.data;
        
        // 2. Allot Room & Check-In if requested
        if (assignRoom) {
          const bookingResponse = await createBookingApi({
            hotelId,
            guestId: newGuest._id,
            roomId: bookingData.roomId,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
          });

          if (bookingResponse.data && bookingResponse.data.success) {
            toast.success("Guest created and Room allotted successfully!");
          } else {
            toast.warning("Guest created, but room allotment failed.");
          }
        } else {
          toast.success(guestResponse.data.message || "Guest created successfully");
        }

        // Trigger parent callback to refresh list
        onAddGuest(newGuest);

        // Reset state values
        setGuestData({
          name: "",
          mobile: "",
          address: "",
          idType: "AADHAAR",
          idNumber: "",
        });
        setAssignRoom(false);
        setBookingData({
          roomId: "",
          checkIn: new Date().toISOString().split("T")[0],
          checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        });
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to submit request");
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

          {/* Assign Room Checkbox Toggle */}
          <div className="pt-2 border-t border-sky-50 flex items-center gap-2">
            <input
              type="checkbox"
              id="assignRoomToggle"
              checked={assignRoom}
              onChange={(e) => setAssignRoom(e.target.checked)}
              disabled={loading}
              className="w-4 h-4 text-sky-500 border-slate-300 rounded focus:ring-sky-500 cursor-pointer"
            />
            <label htmlFor="assignRoomToggle" className="text-xs text-slate-700 font-extrabold cursor-pointer select-none">
              Assign Room & Check In Now?
            </label>
          </div>

          {/* Collapsible Room Allotment Fields */}
          {assignRoom && (
            <div className="space-y-3.5 p-4 bg-sky-50/50 rounded-2xl border border-sky-100/50">
              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1">Select Available Room *</label>
                {loadingRooms ? (
                  <div className="text-xs text-slate-400 py-2">Loading available rooms...</div>
                ) : rooms.length === 0 ? (
                  <div className="text-xs font-semibold text-rose-500 py-1">No available rooms found!</div>
                ) : (
                  <select
                    disabled={loading}
                    value={bookingData.roomId}
                    onChange={(e) => setBookingData({ ...bookingData, roomId: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 transition"
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
                    required={assignRoom}
                    disabled={loading}
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-500 transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 font-bold block mb-1">Check-Out Date *</label>
                  <input
                    type="date"
                    required={assignRoom}
                    disabled={loading}
                    value={bookingData.checkOut}
                    onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-500 transition"
                  />
                </div>
              </div>
            </div>
          )}

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
