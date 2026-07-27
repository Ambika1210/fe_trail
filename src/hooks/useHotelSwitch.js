import { useNavigate } from "react-router-dom";
import { switchHotelApi, switchBackSuperAdminApi } from "../services/coreService";
import { toast } from "../utils/toast.jsx";

export const useHotelSwitch = () => {
  const navigate = useNavigate();

  const handleSwitchHotel = async (hotelId) => {
    try {
      const response = await switchHotelApi(hotelId);
      if (response.data && response.data.data) {
        const { token, hotel } = response.data.data;
        localStorage.setItem("token", token);
        if (hotel) {
          localStorage.setItem("activeHotel", JSON.stringify(hotel));
        }
        toast.success(`Switched to hotel: ${hotel?.name || 'Hotel'} as ADMIN!`);
        navigate("/hotel-panel");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to switch to hotel");
    }
  };

  const handleSwitchBack = async () => {
    try {
      const response = await switchBackSuperAdminApi();
      if (response.data && response.data.data) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.removeItem("activeHotel");
        toast.info("Switched back to Super Admin Portal!");
        navigate("/super-admin");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to switch back to Super Admin");
    }
  };

  return {
    handleSwitchHotel,
    handleSwitchBack,
  };
};
