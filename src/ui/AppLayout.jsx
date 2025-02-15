import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import { useState } from "react";

function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="lg:grid overflow-hidden h-screen bg-secondary-100 grid-rows-[minmax(120px,_15%)_1fr] grid-cols-[15rem_1fr]">
      {" "}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <MobileHeader isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      {/* <Header /> */}
      <div className="relative h-[92vh] lg:h-screen p-4  bg-secondary-100 overflow-y-hidden ">
        <Outlet />
      </div>
      {children}
      {/* <div className="bg-secondary-100 p-8 overflow-y-auto h-full flex items-center justify-center">
        <div className="mx-auto max-w-screen-lg flex flex-col gap-y-12">
        </div>
      </div> */}
    </div>
  );
}

export default AppLayout;
