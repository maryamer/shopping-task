import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Cookies from "js-cookie"; // Import js-cookie
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Logout() {
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    const token = Cookies.get("Authorization");
    if (!token && !isFirst) {
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    }
  }, [isFirst]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handlelogout = () => {
    Cookies.remove("Authorization");
    Cookies.remove("user");
    queryClient.removeQueries();
    setIsFirst(false);
  };
  return (
    <button onClick={handlelogout}>
      <HiArrowRightOnRectangle className="w-5 h-5 text-secondary-500 hover:text-error" />
    </button>
  );
}
export default Logout;
