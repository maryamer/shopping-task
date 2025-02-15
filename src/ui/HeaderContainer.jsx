import { HiPlus } from "react-icons/hi";
// import useUser from "../features/authentication/useUser";
import Breadcrumbs from "./Breadcrumbs";
import Button from "./Button";
// import { useState } from "react";

function HeaderContainer({
  desc,
  btnTitle,
  btnAction,
  title,
  breadcrumbs = [],
}) {
  // const { mutateAsync: addCategory, isPending: isPendingAdd } =
  //   useAddCategory();
  // const [open, setOpen] = useState(false);
  const { isLoading } = {};

  return (
    <div className="bg-secondary-100  py-4  relative">
      <div
        className={`lg:container flex flex-col items-center justify-end gap-x-8
      ${isLoading ? "blur-sm opacity-50" : ""}
      `}
      >
        <div className="w-full flex relative items-center lg:justify-between">
          <div className=" w-full space-y-2">
            <h2 className="font-bold text-4xl text-secondary-850">{title}</h2>
            <p className="text-secondary-400">{desc}</p>
          </div>
          {btnAction && (
            <div className="w-full lg:static absolute top-0 right-1 flex justify-end">
              <Button
                size={"md"}
                onClick={() => btnAction(true)}
                className="btn flex text-sm  gap-1 font-light items-center justify-center flex-nowrap text-nowrap  btn--primary !rounded-lg "
              >
                <HiPlus className="text-white w-5" /> Add {btnTitle}
              </Button>
            </div>
          )}
        </div>
        <div className="w-full py-2">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        {/* <UserAvatar />
        <HeaderContainerMenu /> */}
      </div>
      <span className="hr w-[99%] "></span>
    </div>
  );
}

export default HeaderContainer;
