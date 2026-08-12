import { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useHotelSwitch } from "../../hooks/useHotelSwitch";

// Layout & Reusable Shell Components
import PanelLayout from "../../components/PanelLayout";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Independent Self-Contained Domain Modules
import HotelDashboard from "./dashboard/HotelDashboard";
import HotelRooms from "./rooms/HotelRooms";
import HotelBookings from "./bookings/HotelBookings";

const HotelPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const { handleSwitchBack } = useHotelSwitch();
  const [activeHotel] = useState(() => {
    try {
      const saved = localStorage.getItem("activeHotel");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  return (
    <PanelLayout
      sidebar={<Sidebar activeHotel={activeHotel} handleSwitchBack={handleSwitchBack} />}
      header={<Header activeHotel={activeHotel} handleSwitchBack={handleSwitchBack} />}
    >
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<HotelDashboard activeHotel={activeHotel} />} />
        <Route path="bookings" element={<HotelBookings />} />
        <Route path="rooms" element={<HotelRooms activeHotel={activeHotel} />} />
      </Routes>
    </PanelLayout>
  );
};

export default HotelPanel;
