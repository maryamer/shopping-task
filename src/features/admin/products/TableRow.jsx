import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi";
import ToggleSwitch from "../../../ui/ToggleSwitch";
import ProductsActionModal from "./ProductsActionModal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Modal from "../../../ui/Modal";
import { useState } from "react";
import {
  useRemoveProduct,
  useUpdateProduct,
} from "../../../hooks/tabs/useProducts";

export default function TableRow({ product, categories }) {
  const [isActive, setIsActive] = useState(product.is_active);
  const [open, setOpen] = useState(false);
  const { mutateAsync: remove, isPending } = useRemoveProduct();
  const { mutateAsync: toggle } = useUpdateProduct();
  const [openDelete, setOpenDelete] = useState(false);

  const toggleHandler = async () => {
    const { title, price, category_id, id, is_active } = product;
    const newIsActive = is_active === "1" ? "0" : "1";
    try {
      setIsActive((prev) => !prev);
      await toggle({
        title,
        category_id,
        price,
        id,
        is_active: newIsActive,
        _method: "PUT",
      });
    } catch (error) {
      setIsActive((prev) => !prev); // Rollback if error occurs
    }
  };

  return (
    <>
      <Modal
        title={
          <IoIosInformationCircleOutline className="text-red-500 w-12 h-12 bg-red-200 rounded-full p-2.5" />
        }
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <ConfirmDelete
          isLoading={isPending}
          resourceName={product.title}
          desc="Are you sure you want to delete this product?"
          onClose={() => setOpenDelete(false)}
          onConfirm={async () => {
            if (await remove(product?.id)) setOpenDelete(false);
          }}
        />
      </Modal>

      <ProductsActionModal
        categories={categories}
        setOpen={setOpen}
        open={open}
        id={product.id}
        selectedProduct={product}
      />

      <tr>
        <td className="w-32 td">
          <div className="flex items-center gap-2">
            <img
              src={
                product.image
                  ? "https://assignment.rahkartest.ir/" + product.image
                  : "/default-image.jpg"
              }
              alt={product.title}
              className="w-10 h-10 aspect-square object-cover rounded-lg"
            />
            <span className="w-1/2 truncate">{product?.title}</span>
          </div>
        </td>
        <td className="w-24 td">{product.price}</td>
        <td className="w-24 td">{product.category?.title}</td>

        {/* Toggle Switch for Status */}
        <td className="w-20 td">
          <ToggleSwitch
            id={`toggle-${product.id}`}
            checked={isActive}
            onChange={toggleHandler}
          />
        </td>

        <td className="md:w-20 w-36 td truncate">{product.last_modified}</td>
        <td className="lg:w-14 w-24 td">
          <div className="space-x-4 pr-4">
            <button
              className="bg-secondary-100 rounded-md p-1"
              onClick={() => setOpen(true)}
              aria-label={`Edit ${product.title}`}
            >
              <CiEdit className="w-5 h-5 text-secondary-400" />
            </button>
            <button
              className="rounded-md p-1"
              onClick={() => setOpenDelete(true)}
              aria-label={`Delete ${product.title}`}
            >
              <HiOutlineTrash className="w-5 h-5 text-secondary-400" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
