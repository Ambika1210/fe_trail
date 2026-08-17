import { useState, useEffect } from "react";
import { createHotelApi, getAllHotelsApi, deleteHotelApi, createUserApi } from "../../../services/coreService";
import { useHotelSwitch } from "../../../hooks/useHotelSwitch";
import { toast } from "../../../utils/toast.jsx";

const SuperAdminHotels = () => {
  const { handleSwitchHotel } = useHotelSwitch();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [newHotel, setNewHotel] = useState({ name: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  const [selectedHotelForAdmin, setSelectedHotelForAdmin] = useState(null);
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "" });
  const [adminSubmitting, setAdminSubmitting] = useState(false);

  // Fetch hotels from Backend API
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await getAllHotelsApi();
      if (response.data && response.data.data) {
        setHotels(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch hotels", err);
      toast.error("Failed to load hotels from database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Handle Add Hotel API Submission
  const handleAddHotel = async (e) => {
    e.preventDefault();
    if (!newHotel.name) return;

    setSubmitting(true);
    try {
      await createHotelApi({
        name: newHotel.name,
        address: newHotel.address,
      });

      toast.success("Hotel created successfully!");
      setNewHotel({ name: "", address: "" });
      setShowAddHotelModal(false);
      fetchHotels(); // Refresh list from backend
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create hotel");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete Hotel
  const handleDeleteHotel = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await deleteHotelApi(id);
        toast.success("Hotel deleted successfully!");
        fetchHotels(); // Refresh list from backend
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete hotel");
      }
    }
  };

  // Handle Add Admin Submit
  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setAdminSubmitting(true);
    try {
      await createUserApi({
        name: adminForm.name,
        email: adminForm.email,
        password: adminForm.password,
        role: "ADMIN",
        hotelId: selectedHotelForAdmin._id,
      });

      toast.success(`Admin user created successfully for ${selectedHotelForAdmin.name}!`);
      setAdminForm({ name: "", email: "", password: "" });
      setSelectedHotelForAdmin(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create admin user");
    } finally {
      setAdminSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">All Hotels (Live DB)</h2>
            <p className="text-xs text-slate-500">Manage all registered hotels connected to backend API</p>
          </div>
          <button
            onClick={() => setShowAddHotelModal(true)}
            className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <span>+</span> Create Hotel
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-slate-500 text-sm">Loading hotels from database...</div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm bg-sky-50/50 rounded-xl border border-sky-100">
            No hotels found in the database. Click "+ Create Hotel" to add your first hotel!
          </div>
        ) : (
          <div className="overflow-x-auto border border-sky-100 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-sky-100 bg-sky-50/50">
                  <th className="py-2 px-3 text-xs font-bold text-slate-700 uppercase tracking-wider">ID</th>
                  <th className="py-2 px-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Hotel Name</th>
                  <th className="py-2 px-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Address</th>
                  <th className="py-2 px-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="py-2 px-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Created At</th>
                  <th className="py-2 px-3 text-xs font-bold text-slate-700 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                {hotels.map((h) => (
                  <tr key={h._id} className="hover:bg-sky-50/30 transition-colors">
                    <td className="py-2 px-3 font-mono text-xs text-slate-400">{h._id.slice(-6)}</td>
                    <td className="py-2 px-3 text-sm font-bold text-slate-900">{h.name}</td>
                    <td className="py-2 px-3 text-sm text-slate-600">{h.address || "N/A"}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border transition inline-flex items-center gap-1.5 ${
                        h.isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {h.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-xs text-slate-500">
                      {new Date(h.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedHotelForAdmin(h);
                            setAdminForm({ name: "", email: "", password: "" });
                          }}
                          className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-indigo-500/20 transition cursor-pointer flex items-center gap-1"
                        >
                          <span>👤</span> Add Admin
                        </button>
                        <button
                          onClick={() => handleSwitchHotel(h._id)}
                          className="text-xs bg-sky-500 hover:bg-sky-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-sky-500/20 transition cursor-pointer flex items-center gap-1"
                        >
                          <span>🔑</span> Login
                        </button>
                        <button
                          onClick={() => handleDeleteHotel(h._id)}
                          className="text-xs text-rose-600 hover:text-rose-700 font-bold px-3 py-1.5 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Hotel Modal */}
      {showAddHotelModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Create Hotel (POST API)</h3>
              <button
                onClick={() => setShowAddHotelModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddHotel} className="space-y-4">
              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1">Hotel Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Palace Resort"
                  value={newHotel.name}
                  onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1">Hotel Address</label>
                <textarea
                  rows="3"
                  placeholder="e.g. Marine Drive, Mumbai, Maharashtra"
                  value={newHotel.address}
                  onChange={(e) => setNewHotel({ ...newHotel, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddHotelModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Creating..." : "Create Hotel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {selectedHotelForAdmin && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-sky-100 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Add Admin for {selectedHotelForAdmin.name}</h3>
              <button
                onClick={() => setSelectedHotelForAdmin(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddAdminSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1">Admin Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1">Admin Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. admin@hotel.com"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-bold block mb-1">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedHotelForAdmin(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adminSubmitting}
                  className="flex-1 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {adminSubmitting ? "Adding..." : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperAdminHotels;
