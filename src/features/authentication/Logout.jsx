import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Cookies from "js-cookie"; // Import js-cookie
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    const token = Cookies.get("Authorization");
    if (!token) {
      navigate("/signin");
    }
  }, []);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handlelogout = () => {
    Cookies.remove("Authorization");
    localStorage.removeItem("userInfo");
    queryClient.removeQueries();
    window.location.reload();
  };
  return (
    <button onClick={handlelogout}>
      <HiArrowRightOnRectangle className="w-5 h-5 text-secondary-500 hover:text-error" />
    </button>
  );
}
export default Logout;
