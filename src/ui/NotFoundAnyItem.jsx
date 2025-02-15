import Button from "./Button";
import BoxSvg from "../assets/svg/not-found-box.svg"; // Adjust the path accordingly
import { HiPlus } from "react-icons/hi";
function NotFoundAnyItem({ title }) {
  return (
    <div className="flex gap-2 flex-col h-full items-center justify-center">
      <img
        src={BoxSvg}
        alt="Not Found Product Logo"
        className={"h-auto w-32 "}
      />
      <h1 className="font-bold text-lg text-secondary-900 mb-2">
        No {title} Found
      </h1>
      <Button
        size={"md"}
        className="btn flex gap-1 font-light items-center justify-center  btn--primary !rounded-lg "
      >
        <HiPlus className="text-white w-5" /> Add Product
      </Button>
    </div>
  );
}

export default NotFoundAnyItem;
