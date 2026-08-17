import React, { useState, useEffect } from "react";
import { 
  MdLogin, 
  MdLogout, 
  MdSearch, 
  MdFilterList, 
  MdOutlineHotel,
  MdPhone,
  MdAccessTime,
  MdCalendarToday
} from "react-icons/md";
import { getAllBookingsApi, updateBookingStatusApi } from "../../../services/coreService";
import { toast } from "../../../utils/toast.jsx";

const BookingManagement = () => {
  const [activeTab, setActiveTab] = useState("checkins");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeHotelStr = localStorage.getItem("activeHotel");
  const activeHotel = activeHotelStr ? JSON.parse(activeHotelStr) : null;
  const hotelId = activeHotel?._id;

  // Local date helper to match YYYY-MM-DD
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDateString());

  // Dummy statistics (kept dummy as requested)
  const stats = {
    todayCheckIns: 8,
    todayCheckOuts: 5,
    pendingCheckIns: 3,
    completedCheckOuts: 4,
  };

  // Convert Date from UTC to local string format
  const getLocalDateString = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const fetchBookings = async () => {
    if (!hotelId) return;
    setLoading(true);
    try {
      // Fetch all bookings for the hotel and selected date
      // We pass the empty type so that it retrieves both check-ins and check-outs for that day
      const response = await getAllBookingsApi(hotelId, selectedDate, "");
      if (response.data && response.data.success) {
        setBookings(response.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedDate, hotelId]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      const response = await updateBookingStatusApi(bookingId, status);
      if (response.data && response.data.success) {
        toast.success(`Booking status updated to ${status.replace("_", " ")}`);
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update booking status");
    }
  };

  // Filter bookings locally based on the selected date matching checkIn / checkOut
  const checkIns = bookings.filter(b => getLocalDateString(b.checkIn) === selectedDate);
  const checkOuts = bookings.filter(b => getLocalDateString(b.checkOut) === selectedDate);

  // Filter by search query
  const filteredCheckIns = checkIns.filter(
    (b) =>
      b.guestId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.roomId?.roomNumber?.toString().includes(searchQuery)
  );

  const filteredCheckOuts = checkOuts.filter(
    (b) =>
      b.guestId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.roomId?.roomNumber?.toString().includes(searchQuery)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Booking Management</h1>
          <p className="text-sm text-slate-500">Monitor today's arrivals, departures, and active occupancies.</p>
        </div>

        {/* Date Picker Filter */}
        <div className="flex items-center gap-2 bg-white border border-sky-100 rounded-xl p-2 shadow-xs">
          <MdCalendarToday className="text-sky-600 w-4 h-4" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Today's Check-ins */}
        <div className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-sky-600 font-extrabold uppercase tracking-wider block">Today's Check-Ins</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">{stats.todayCheckIns}</span>
            <span className="text-[11px] text-slate-400 font-semibold block mt-1">{stats.pendingCheckIns} arrivals pending</span>
          </div>
          <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-600">
            <MdLogin className="w-6 h-6" />
          </div>
        </div>

        {/* Total Today's Check-outs */}
        <div className="bg-gradient-to-br from-rose-50 to-white border border-rose-100 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-rose-600 font-extrabold uppercase tracking-wider block">Today's Check-Outs</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">{stats.todayCheckOuts}</span>
            <span className="text-[11px] text-slate-400 font-semibold block mt-1">1 departure pending</span>
          </div>
          <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-600">
            <MdLogout className="w-6 h-6" />
          </div>
        </div>

        {/* Stats 3 - Completed Stays */}
        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-600 font-extrabold uppercase tracking-wider block">Checked Out Today</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">{stats.completedCheckOuts}</span>
            <span className="text-[11px] text-slate-400 font-semibold block mt-1">Stays finalized</span>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
            <MdLogout className="w-6 h-6" />
          </div>
        </div>

        {/* Stats 4 - Total Active Stays */}
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-600 font-extrabold uppercase tracking-wider block">Occupancy Rate</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">78%</span>
            <span className="text-[11px] text-slate-400 font-semibold block mt-1">Based on 24 active rooms</span>
          </div>
          <div className="w-12 h-12 bg-slate-500/10 rounded-xl flex items-center justify-center text-slate-600">
            <MdOutlineHotel className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-sky-50 mb-6 gap-4">
          {/* Two Tabs Selector */}
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab("checkins")}
              className={`flex items-center gap-2 pb-4 text-xs font-bold transition-all cursor-pointer border-b-2 -mb-px ${
                activeTab === "checkins"
                  ? "border-sky-500 text-sky-600 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <MdLogin className="w-4 h-4" />
              Today's Check-Ins ({checkIns.length})
            </button>
            <button
              onClick={() => setActiveTab("checkouts")}
              className={`flex items-center gap-2 pb-4 text-xs font-bold transition-all cursor-pointer border-b-2 -mb-px ${
                activeTab === "checkouts"
                  ? "border-rose-500 text-rose-600 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <MdLogout className="w-4 h-4" />
              Today's Check-Outs ({checkOuts.length})
            </button>
          </div>

          {/* Search bar placeholder */}
          <div className="flex items-center gap-2 w-full sm:w-auto pb-4 sm:pb-0">
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <MdSearch className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guest or room..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-sky-100 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-1 focus:ring-sky-500 focus:bg-white transition"
              />
            </div>
            <button className="p-2 border border-sky-100 hover:bg-slate-50 rounded-xl text-slate-500 cursor-pointer">
              <MdFilterList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading indicator */}
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-sm font-semibold">
            Loading bookings data...
          </div>
        ) : (
          /* Tab Panel Display */
          activeTab === "checkins" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase text-slate-600 border-b border-sky-100 font-bold">
                  <tr>
                    <th className="px-4 py-3">Guest Details</th>
                    <th className="px-4 py-3">Room Assigned</th>
                    <th className="px-4 py-3">Expected Arrival</th>
                    <th className="px-4 py-3">Fare Details</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100">
                  {filteredCheckIns.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-slate-400 text-xs italic">
                        No arrivals found for this date.
                      </td>
                    </tr>
                  ) : (
                    filteredCheckIns.map((item) => (
                      <tr key={item._id} className="hover:bg-sky-50/40 transition">
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{item.guestId?.name || "Unknown Guest"}</span>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MdPhone className="w-3 h-3" /> {item.guestId?.mobile || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800">Room #{item.roomId?.roomNumber || "Unassigned"}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{item.roomId?.roomType || "Standard"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-slate-600 font-mono flex items-center gap-1">
                            <MdAccessTime className="w-3.5 h-3.5 text-slate-400" /> {formatDate(item.checkIn)}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-700">₹{item.totalAmount}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            item.bookingStatus === "CHECKED_IN"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : item.bookingStatus === "BOOKED"
                                ? "bg-sky-50 text-sky-700 border-sky-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}>
                            {item.bookingStatus === "CHECKED_IN" ? "Checked In" : item.bookingStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {item.bookingStatus === "BOOKED" ? (
                            <button
                              onClick={() => handleStatusChange(item._id, "CHECKED_IN")}
                              className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs"
                            >
                              Perform Check-In
                            </button>
                          ) : (
                            <span className="text-slate-400 text-xs italic font-medium">Checked In</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-rose-50/50 text-xs uppercase text-slate-600 border-b border-rose-100 font-bold">
                  <tr>
                    <th className="px-4 py-3">Guest Details</th>
                    <th className="px-4 py-3">Room Stayed</th>
                    <th className="px-4 py-3">Expected Departure</th>
                    <th className="px-4 py-3">Total Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50/60">
                  {filteredCheckOuts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-slate-400 text-xs italic">
                        No departures found for this date.
                      </td>
                    </tr>
                  ) : (
                    filteredCheckOuts.map((item) => (
                      <tr key={item._id} className="hover:bg-rose-50/10 transition">
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{item.guestId?.name || "Unknown Guest"}</span>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MdPhone className="w-3 h-3" /> {item.guestId?.mobile || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800">Room #{item.roomId?.roomNumber || "Unassigned"}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{item.roomId?.roomType || "Standard"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-slate-600 font-mono flex items-center gap-1">
                            <MdAccessTime className="w-3.5 h-3.5 text-slate-400" /> {formatDate(item.checkOut)}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-700">₹{item.totalAmount}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            item.bookingStatus === "CHECKED_OUT"
                              ? "bg-slate-100 text-slate-600 border-slate-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}>
                            {item.bookingStatus === "CHECKED_OUT" ? "Checked Out" : item.bookingStatus === "CHECKED_IN" ? "Active Stay" : item.bookingStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {item.bookingStatus === "CHECKED_IN" ? (
                            <button
                              onClick={() => handleStatusChange(item._id, "CHECKED_OUT")}
                              className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs"
                            >
                              Perform Check-Out
                            </button>
                          ) : (
                            <span className="text-slate-400 text-xs italic font-medium">Checked Out</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BookingManagement;
