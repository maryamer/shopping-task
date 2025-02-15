import useUser from "../features/authentication/useUser";
import Logo from "./Logo";
import { RxHamburgerMenu } from "react-icons/rx";
function MobileHeader({ setIsOpen }) {
  const { isLoading } = useUser();

  return (
    <div className="bg-secondary-100 lg:hidden lg:py-6 py-4 px-2    relative">
      <div
        className={`lg:container flex items-center gap-x-4  
      ${isLoading ? "blur-sm opacity-50" : ""}
      `}
      >
        <RxHamburgerMenu
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-10 h-10 text-primary-500"
        />
        <Logo size="sm" position="start" />
      </div>
      <span className="hr w-full  "></span>
    </div>
  );
}

export default MobileHeader;
