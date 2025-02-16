import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie

function AppLayout({ children }) {
    const navigate = useNavigate('/')

    useEffect(() => {
      const token = Cookies.get("Authorization");
  
      if (!token) {
        navigate("/signin");
      }
    
    }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="lg:grid overflow-hidden h-screen bg-secondary-100 grid-rows-[minmax(120px,_15%)_1fr] grid-cols-[15rem_1fr]">
      {" "}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="relative h-[92vh] lg:h-screen p-4  bg-secondary-100 overflow-y-hidden ">
        <Outlet />
      </div>
      {children}

    </div>
  );
}

export default AppLayout;
