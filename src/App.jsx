import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SuperAdminPanel from "./pages/superadmin/SuperAdminPanel";
import HotelPanel from "./pages/hotel/HotelPanel";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "./utils/toast.jsx";

function App() {
  const location = useLocation();

  // Hide outer navbar/footer inside panel views
  const isPanelRoute =
    location.pathname.startsWith("/super-admin") ||
    location.pathname.startsWith("/hotel-panel");

  return (
    <div className={`flex flex-col min-h-screen font-sans ${isPanelRoute ? "bg-slate-100 text-slate-800" : "bg-slate-950 text-slate-100"}`}>
      <ToastContainer />
      {!isPanelRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Dedicated Subfolder Panels */}
          <Route path="/super-admin" element={<SuperAdminPanel />} />
          <Route path="/hotel-panel" element={<HotelPanel />} />
        </Routes>
      </main>

      {!isPanelRoute && <Footer />}
    </div>
  );
}

export default App;