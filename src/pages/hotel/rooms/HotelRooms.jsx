import { useState, useEffect } from "react";
import { getAllRoomsApi, updateRoomApi, deleteRoomApi } from "../../../services/coreService";
import { toast } from "../../../utils/toast.jsx";
import CreateRoomModal from "./CreateRoomModal";

const HotelRooms = ({ activeHotel }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);

  // Fetch Rooms from Backend DB API
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await getAllRoomsApi(activeHotel?._id);
      if (response.data && response.data.data) {
        setRooms(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [activeHotel]);

  // Toggle Room Occupied Status (Khali / Bhara)
  const handleToggleOccupied = async (roomId, currentOccupied) => {
    try {
      await updateRoomApi(roomId, { isOccupied: !currentOccupied });
      toast.success(`Room status updated to ${!currentOccupied ? 'Occupied (Bhara)' : 'Available (Khali)'}`);
      fetchRooms();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update room status");
    }
  };

  // Delete Room
  const handleDeleteRoom = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoomApi(roomId);
        toast.success("Room deleted successfully!");
        fetchRooms();
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete room");
      }
    }
  };

  return (
    <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Room Inventory & Occupancy Status</h2>
          <p className="text-xs text-slate-500">Live room list connected to Backend DB API</p>
        </div>
        <button
          onClick={() => setShowAddRoomModal(true)}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 cursor-pointer flex items-center gap-1.5"
        >
          <span>+</span> Create New Room
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500 text-sm">Loading hotel rooms from database...</div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-10 bg-sky-50/50 rounded-2xl border border-sky-100">
          <p className="text-sm font-semibold text-slate-700 mb-2">No rooms created yet for this hotel.</p>
          <p className="text-xs text-slate-500 mb-4">Click "+ Create New Room" to add rooms to your hotel inventory!</p>
          <button
            onClick={() => setShowAddRoomModal(true)}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 cursor-pointer"
          >
            + Create New Room
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rooms.map((r) => (
            <div key={r._id} className="bg-slate-50 border border-sky-100 rounded-2xl p-5 hover:bg-sky-50/50 transition relative group shadow-xs">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs text-sky-600 font-bold uppercase tracking-wider block">Room Number</span>
                  <span className="text-xl font-black text-slate-900">#{r.roomNumber}</span>
                </div>
                <button
                  onClick={() => handleToggleOccupied(r._id, r.isOccupied)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                    r.isOccupied
                      ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${r.isOccupied ? "bg-rose-500" : "bg-emerald-500"}`}></span>
                  {r.isOccupied ? "Occupied (Bhara)" : "Available (Khali)"}
                </button>
              </div>

              <div className="space-y-1 mb-4">
                <p className="text-xs text-slate-600 font-semibold">{r.roomType || "Standard Room"}</p>
                <p className="text-base font-extrabold text-sky-600">₹{r.price} <span className="text-xs text-slate-400 font-normal">/ night</span></p>
              </div>

              <div className="pt-3 border-t border-sky-100 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono text-[11px]">ID: {r._id.slice(-6)}</span>
                <button
                  onClick={() => handleDeleteRoom(r._id)}
                  className="text-rose-600 hover:text-rose-700 font-bold px-2 py-1 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={showAddRoomModal}
        onClose={() => setShowAddRoomModal(false)}
        onRoomCreated={fetchRooms}
        activeHotel={activeHotel}
      />
    </div>
  );
};

export default HotelRooms;
