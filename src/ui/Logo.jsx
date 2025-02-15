import React from "react";
import logo from "../assets/svg/logo.svg"; // Adjust the path accordingly

// Utility to handle position alignment
const positionClasses = {
  start: "justify-start",
  center: "justify-center",
};

// Utility for different logo sizes
const logoSizeMap = {
  lg: {
    fontSize: "text-3xl",
    imageSize: "w-10 ",
  },
  md: {
    fontSize: "text-xl",
    imageSize: "w-7 ",
  },
  sm: {
    fontSize: "text-xl",
    imageSize: "w-5 ",
  },
};

// Logo Component
function Logo({ position = "center", size = "md" }) {
  // Dynamically select the logo component
  return (
    <div
      className={`flex gap-2 items-center  ${logoSizeMap[size].fontSize} ${positionClasses[position]}`}
    >
      <img
        src={logo}
        alt="Rahkar Gostaran Logo"
        className={logoSizeMap[size].imageSize + "h-auto"}
      />
      <div className={` h-full tracking-wide text-primary-900 pt-3`}>
        <span className="font-bold">Rahkar</span>
        <span>Gostaran</span>
      </div>
    </div>
  );
}

export default Logo;
