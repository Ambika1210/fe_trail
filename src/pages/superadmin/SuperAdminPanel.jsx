import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createHotelApi, getAllHotelsApi, deleteHotelApi } from "../../services/coreService";
import { useHotelSwitch } from "../../hooks/useHotelSwitch";
import { toast } from "../../utils/toast.jsx";

const SuperAdminPanel = () => {
  const { handleSwitchHotel } = useHotelSwitch();
  const [activeTab, setActiveTab] = useState("overview");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [newHotel, setNewHotel] = useState({ name: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  // Fetch hotels from Backend API
  const fetchHotels = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllHotelsApi();
      if (response.data && response.data.data) {
        setHotels(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch hotels", err);
      setError(err.response?.data?.message || "Failed to load hotels");
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

  return (
    <div className="flex h-screen bg-sky-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-sky-100 flex flex-col justify-between p-4 shadow-sm z-20">
        <div>
          {/* Logo / Portal Title */}
          <div className="flex items-center gap-3 px-3 py-4 border-b border-sky-100 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-sky-600 to-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-md shadow-sky-500/25">
              SA
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base leading-tight">Super Admin</h2>
              <span className="text-xs text-sky-600 font-semibold">Control Center</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-sky-50 text-sky-600 border border-sky-200/80 font-bold shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Overview
            </button>

            <button
              onClick={() => setActiveTab("hotels")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all whitespace-nowrap ${
                activeTab === "hotels"
                  ? "bg-sky-50 text-sky-600 border border-sky-200/80 font-bold shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0v-4m0 4h5m-5 0v-4m5 4v-4m-5-4h5" />
              </svg>
              Hotels Management
              <span className="ml-auto bg-sky-100 text-sky-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {hotels.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all whitespace-nowrap ${
                activeTab === "users"
                  ? "bg-sky-50 text-sky-600 border border-sky-200/80 font-bold shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Users & Admins
            </button>
          </nav>
        </div>

        {/* User profile / Back home */}
        <div className="pt-4 border-t border-sky-100">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-sky-600 px-3 py-2 rounded-lg hover:bg-sky-50 transition font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Public Website
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-sky-50">
        {/* Top Header */}
        <header className="border-b border-sky-100 bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-xs">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === "overview" && "System Overview"}
              {activeTab === "hotels" && "Hotel Management"}
              {activeTab === "users" && "User & Role Management"}
            </h1>
            <p className="text-xs text-sky-600 font-semibold mt-0.5">Welcome back, Super Admin</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddHotelModal(true)}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-sky-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <span>+</span> Create Hotel
            </button>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Live
            </span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              SA
            </div>
          </div>
        </header>

        {/* View Contents */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Registered Hotels</span>
                    <span className="p-2 rounded-xl bg-sky-50 text-sky-600 text-lg">🏨</span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">{hotels.length}</h3>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-2">
                    Live from Backend API
                  </span>
                </div>

                <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active System Users</span>
                    <span className="p-2 rounded-xl bg-sky-50 text-sky-600 text-lg">👥</span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">1,480</h3>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-2">
                    ↑ 24 new today
                  </span>
                </div>

                <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform Revenue</span>
                    <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 font-extrabold text-lg">₹</span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">₹14.8 Lakh</h3>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-2">
                    ↑ 18% growth
                  </span>
                </div>

                <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Uptime</span>
                    <span className="p-2 rounded-xl bg-amber-50 text-amber-600 text-lg">⚡</span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">99.98%</h3>
                  <span className="text-xs text-slate-500 font-medium mt-2 block">
                    All API servers healthy
                  </span>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Registered Hotels (Backend API)</h3>
                  {loading ? (
                    <div className="text-sm text-slate-500 py-4">Loading hotels...</div>
                  ) : hotels.length === 0 ? (
                    <div className="text-sm text-slate-500 py-4 bg-sky-50/50 rounded-xl p-4 text-center">No hotels created yet. Click "Create Hotel" to add one!</div>
                  ) : (
                    <div className="space-y-3">
                      {hotels.slice(0, 4).map((h) => (
                        <div key={h._id} className="flex items-center justify-between p-4 bg-slate-50 border border-sky-100 rounded-xl hover:bg-sky-50/50 transition">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{h.name}</h4>
                            <p className="text-xs text-slate-500">{h.address || "No address provided"}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              h.isActive
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}>
                              {h.isActive ? "Active" : "Inactive"}
                            </span>
                            <button
                              onClick={() => handleSwitchHotel(h._id)}
                              className="text-xs bg-sky-500 hover:bg-sky-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-sky-500/20 transition cursor-pointer flex items-center gap-1.5"
                            >
                              <span>🔑</span> Login
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Super Admin Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowAddHotelModal(true)}
                      className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl transition shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>+</span> Create New Hotel (API)
                    </button>
                    <button
                      onClick={() => setActiveTab("hotels")}
                      className="w-full py-3 bg-slate-50 hover:bg-sky-50 text-slate-700 font-bold text-sm rounded-xl border border-sky-100 transition cursor-pointer"
                    >
                      View All Hotels ({hotels.length})
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: HOTELS MANAGEMENT */}
          {activeTab === "hotels" && (
            <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">All Hotels (Live DB)</h2>
                  <p className="text-xs text-slate-500">Manage all registered hotels connected to backend API</p>
                </div>
                <button
                  onClick={() => setShowAddHotelModal(true)}
                  className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-500/20 cursor-pointer"
                >
                  + Create Hotel
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8 text-slate-500 text-sm">Loading hotels from database...</div>
              ) : hotels.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm bg-sky-50/50 rounded-xl border border-sky-100">
                  No hotels found in the database. Click "+ Create Hotel" to add your first hotel!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-600 border-b border-sky-100 font-bold">
                      <tr>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Hotel Name</th>
                        <th className="px-4 py-3">Address</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Created At</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-100">
                      {hotels.map((h) => (
                        <tr key={h._id} className="hover:bg-sky-50/40 transition">
                          <td className="px-4 py-4 font-mono text-xs text-slate-400">{h._id.slice(-6)}</td>
                          <td className="px-4 py-4 font-bold text-slate-900">{h.name}</td>
                          <td className="px-4 py-4 text-slate-600">{h.address || "N/A"}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              h.isActive
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}>
                              {h.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-xs text-slate-500">
                            {new Date(h.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-right flex justify-end gap-2">
                            <button
                              onClick={() => handleSwitchHotel(h._id)}
                              className="text-xs bg-sky-500 hover:bg-sky-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-sky-500/20 transition cursor-pointer flex items-center gap-1.5"
                            >
                              <span>🔑</span> Login to Hotel
                            </button>
                            <button
                              onClick={() => handleDeleteHotel(h._id)}
                              className="text-xs text-rose-600 hover:text-rose-700 font-bold px-3 py-1.5 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: USERS & ADMINS */}
          {activeTab === "users" && (
            <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Users & Role Access</h2>
              <p className="text-xs text-slate-500 mb-6">Overview of registered platform users and assigned roles</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-600 border-b border-sky-100 font-bold">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-100">
                    <tr className="hover:bg-sky-50/40 transition">
                      <td className="px-4 py-4 font-bold text-slate-900">Super Admin</td>
                      <td className="px-4 py-4 text-slate-600">superadmin@admin.com</td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                          SUPER_ADMIN
                        </span>
                      </td>
                      <td className="px-4 py-4 text-emerald-600 text-xs font-bold">Active</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

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
    </div>
  );
};

export default SuperAdminPanel;
