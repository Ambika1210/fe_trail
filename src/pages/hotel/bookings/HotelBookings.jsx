import { useState, useEffect } from "react";
import CreateBookingModal from "./CreateBookingModal";
import AllotRoomModal from "./AllotRoomModal";
import { getGuestApi, getBookingsByGuestApi } from "../../../services/coreService";
import { toast } from "../../../utils/toast.jsx";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const HotelBookings = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [selectedGuestForRoom, setSelectedGuestForRoom] = useState(null);
  const [showAllotRoomModal, setShowAllotRoomModal] = useState(false);

  const [historyGuest, setHistoryGuest] = useState(null);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const handleViewHistory = async (guest) => {
    setHistoryGuest(guest);
    setShowHistoryModal(true);
    setLoadingHistory(true);
    try {
      const response = await getBookingsByGuestApi(guest._id);
      if (response.data && response.data.success) {
        setHistoryBookings(response.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch guest booking history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const response = await getGuestApi();
      if (response.data && response.data.success && response.data.data) {
        setGuests(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch guests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleAddGuest = (newGuest) => {
    fetchGuests();
  };

  return (
    <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Full Guest Directory</h2>
          <p className="text-xs text-slate-500">Manage all guests, contact information, and ID records</p>
        </div>
        <button
          onClick={() => setShowAddGuestModal(true)}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 cursor-pointer"
        >
          + Add Guest
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500 text-sm">Loading guests from database...</div>
      ) : guests.length === 0 ? (
        <div className="text-center py-10 bg-sky-50/50 rounded-2xl border border-sky-100">
          <p className="text-sm font-semibold text-slate-700 mb-2">No guests registered yet.</p>
          <p className="text-xs text-slate-500 mb-4">Click "+ Add Guest" to register a new guest in the directory.</p>
          <button
            onClick={() => setShowAddGuestModal(true)}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 cursor-pointer"
          >
            + Add Guest
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase text-slate-600 border-b border-sky-100 font-bold">
              <tr>
                <th className="px-4 py-3">Guest Name</th>
                <th className="px-4 py-3">Mobile Number</th>
                <th className="px-4 py-3">ID Type</th>
                <th className="px-4 py-3">ID Number</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {guests.map((g) => (
                <tr key={g._id} className="hover:bg-sky-50/40 transition">
                  <td className="px-4 py-3 font-bold text-slate-900">{g.name}</td>
                  <td className="px-4 py-3 font-semibold text-slate-600">{g.mobile}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold font-mono">
                      {g.idType}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-700 font-mono text-xs">{g.idNumber}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 font-semibold">{g.address || "-"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewHistory(g)}
                        className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold rounded-xl transition cursor-pointer border border-sky-200"
                      >
                        History
                      </button>
                      <button
                        onClick={() => {
                          setSelectedGuestForRoom(g);
                          setShowAllotRoomModal(true);
                        }}
                        className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-emerald-500/10 cursor-pointer"
                      >
                        CheckIn
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateBookingModal
        isOpen={showAddGuestModal}
        onClose={() => setShowAddGuestModal(false)}
        onAddGuest={handleAddGuest}
      />

      <AllotRoomModal
        isOpen={showAllotRoomModal}
        onClose={() => {
          setShowAllotRoomModal(false);
          setSelectedGuestForRoom(null);
        }}
        guest={selectedGuestForRoom}
        onRoomAllotted={fetchGuests}
      />

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Booking History</h3>
                <p className="text-xs text-slate-500">History for guest: <span className="font-bold text-sky-600">{historyGuest?.name}</span></p>
              </div>
              <button
                onClick={() => {
                  setShowHistoryModal(false);
                  setHistoryGuest(null);
                  setHistoryBookings([]);
                }}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {loadingHistory ? (
              <div className="text-center py-6 text-slate-500 text-sm">Loading stay records...</div>
            ) : historyBookings.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No prior or active stays found in database for this guest.
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-3.5 pr-1">
                {historyBookings.map((b) => (
                  <div key={b._id} className="border border-sky-100 rounded-xl p-3 bg-sky-50/20 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">
                        Room #{b.roomId?.roomNumber || "Unassigned"} ({b.roomId?.roomType || "Standard"})
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${b.bookingStatus === "CHECKED_IN"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : b.bookingStatus === "BOOKED"
                          ? "bg-sky-50 text-sky-700 border-sky-200"
                          : b.bookingStatus === "CHECKED_OUT"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}>
                        {b.bookingStatus === "CHECKED_IN" ? "Occupied" : b.bookingStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-600 font-mono text-[11px]">
                      <div>
                        <span className="block text-[9px] text-slate-400 font-sans uppercase">Check-In</span>
                        <span className="font-bold text-emerald-600">{formatDate(b.checkIn)}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-400 font-sans uppercase">Check-Out</span>
                        <span className="font-bold text-rose-600">{formatDate(b.checkOut)}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-slate-500">
                      <span>Total Stay Amount:</span>
                      <span className="font-bold text-slate-800 font-mono">₹{b.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => {
                  setShowHistoryModal(false);
                  setHistoryGuest(null);
                  setHistoryBookings([]);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelBookings;
