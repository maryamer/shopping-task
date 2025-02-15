import { CustomNavLink } from "./CustomNavlLink";
import Logo from "./Logo";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { BsShopWindow, BsBag } from "react-icons/bs";
import UserAvatar from "../features/authentication/UserAvatar";
import UserDetail from "../features/authentication/UserDetail";
import Logout from "../features/authentication/Logout";
import useUser from "../features/authentication/useUser";
function Sidebar({ children, isOpen, setIsOpen }) {
  const { user } = useUser();
  return (
    <>
      <div
        className={`fixed h-screen min-h-screen z-40 inset-0 bg-gray-800 transition-all duration-15 ease-in-out bg-opacity-50  ${
          isOpen ? "opacity-100 lg:opacity-0" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`bg-secondary-0 flex flex-col justify-between transition-all duration-150 ease-in-out h-screen w-9/12 lg:w-full lg:relative  row-start-1 absolute lg:left-0  row-span-2 border-l border-secondary-200 p-4 ${
          isOpen ? "left-0 z-50" : "-left-[100%]  lg:left-0"
        }`}
      >
        <ul className="flex flex-col w-full gap-y-4">
          <Logo size={"md"} position="start" />
          <span className="mt-2"></span>
          <CustomNavLink to="category" onClick={() => setIsOpen(false)}>
            <HiOutlineChartSquareBar className="w-5 h-5" />
            <span>Category</span>
          </CustomNavLink>
          <CustomNavLink
            to="orders"
            onClick={() => setIsOpen(false)}
            className="w-5 h-5"
          >
            <BsBag />
            <span>Orders</span>
          </CustomNavLink>
          <CustomNavLink
            to="products"
            onClick={() => setIsOpen(false)}
            className="w-5 h-5"
          >
            <BsShopWindow />
            <span>Products</span>
          </CustomNavLink>

          {children}
        </ul>
        <div className=" w-full flex gap-2 items-center relative bottom-2">
          <div className=" ">
            <UserAvatar />
          </div>
          <UserDetail name={user?.name} email={user?.email} />
          <div className="absolute top-0 right-2">
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
