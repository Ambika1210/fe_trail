import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllHotelsApi } from "../../../services/coreService";
import { useHotelSwitch } from "../../../hooks/useHotelSwitch";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { handleSwitchHotel } = useHotelSwitch();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await getAllHotelsApi();
        if (response.data && response.data.data) {
          setHotels(response.data.data);
        }
      } catch (err) {
        console.error("Dashboard failed to fetch hotels", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
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
            <div className="text-sm text-slate-500 py-4 bg-sky-50/50 rounded-xl p-4 text-center">No hotels created yet. Click "Manage Hotels" to add one!</div>
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
              onClick={() => navigate("/super-admin/hotels")}
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl transition shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>+</span> Manage Hotels
            </button>
            <button
              onClick={() => navigate("/super-admin/hotels")}
              className="w-full py-3 bg-slate-50 hover:bg-sky-50 text-slate-700 font-bold text-sm rounded-xl border border-sky-100 transition cursor-pointer"
            >
              View All Hotels ({hotels.length})
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminDashboard;
