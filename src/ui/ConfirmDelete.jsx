import { IoIosInformationCircleOutline } from "react-icons/io";
import Button from "./Button";
import Modal from "./Modal";

function ConfirmDelete({
  resourceName,
  onClose,
  open,
  disabled,
  onConfirm,
  desc,
  isLoading = false,
}) {
  return (
    <Modal
      title={
        <IoIosInformationCircleOutline className="text-red-500 w-12 h-12 bg-red-200 rounded-full p-2.5" />
      }
      open={open}
      onClose={() => onClose()}
    >
      <div>
        <h2 className="font-bold text-2xl mb-2 text-secondary-700">
          Deleting {resourceName}
        </h2>
        {desc && (
          <p className="font-light text-base mb-4  text-secondary-700">
            {desc}
          </p>
        )}
        <div className="flex space-x-2 pt-4 border-t border-t-secondary-200">
          <Button
            type="button"
            onClick={onClose}
            disabled={disabled}
            className="py-2 px-4 btn bg-white border border-secondary-500 hover:bg-white font-sm hover:opacity-80 text-secondary-500 shadow-none rounded-md w-full"
          >
            Cancel{" "}
          </Button>
          <Button
            type="submit"
            onClick={() => onConfirm()}
            disabled={disabled}
            className={`${
              isLoading && "opacity-70"
            } py-2 px-4 btn bg-red-600 hover:bg-red-600 hover:text-white  rounded-md w-full`}
          >
            {isLoading ? "Loading..." : "Confirm"}{" "}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default ConfirmDelete;
