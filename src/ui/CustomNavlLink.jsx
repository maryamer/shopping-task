import { NavLink } from "react-router-dom";

export function CustomNavLink({ children, to, onClick }) {
  const navlinkClass =
    "flex items-center text-md lg:text-sm gap-x-2 hover:bg-primary-100/80 hover:text-primary-900 px-2 py-3 lg:py-1.5 rounded-md  transition-all duration-300";

  return (
    <li onClick={onClick}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${navlinkClass} font-semibold bg-primary-50 text-primary-700`
            : `${navlinkClass} text-secondary-600`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}
