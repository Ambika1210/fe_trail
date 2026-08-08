import { useState, useEffect } from "react";
import CreateBookingModal from "./CreateBookingModal";
import { getGuestApi } from "../../../services/coreService";

const HotelBookings = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

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
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">ID Type</th>
                <th className="px-4 py-3">ID Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {guests.map((g) => (
                <tr key={g._id} className="hover:bg-sky-50/40 transition">
                  <td className="px-4 py-3 font-bold text-slate-900">{g.name}</td>
                  <td className="px-4 py-3 font-semibold text-slate-600">{g.mobile}</td>
                  <td className="px-4 py-3 text-slate-500">{g.address}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold font-mono">
                      {g.idType}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-700 font-mono text-xs">{g.idNumber}</td>
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
    </div>
  );
};

export default HotelBookings;
