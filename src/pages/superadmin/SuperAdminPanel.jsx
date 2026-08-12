import { useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";

// Layout & Reusable Shell Components
import PanelLayout from "../../components/PanelLayout";
import SuperAdminSidebar from "./components/SuperAdminSidebar";
import SuperAdminHeader from "./components/SuperAdminHeader";

// Split Sub-Page Components
import SuperAdminDashboard from "./dashboard/SuperAdminDashboard";
import SuperAdminHotels from "./hotels/SuperAdminHotels";
import SuperAdminUsers from "./users/SuperAdminUsers";

const SuperAdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <PanelLayout
      sidebar={<SuperAdminSidebar />}
      header={<SuperAdminHeader />}
    >
      <Routes>
        <Route path="/" element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<SuperAdminDashboard />} />
        <Route path="hotels" element={<SuperAdminHotels />} />
        <Route path="users" element={<SuperAdminUsers />} />
      </Routes>
    </PanelLayout>
  );
};

export default SuperAdminPanel;
