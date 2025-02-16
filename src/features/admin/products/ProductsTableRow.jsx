


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
import { MdOutlineModeEditOutline } from "react-icons/md";

export default function ProductsTableRow({ product, categories }) {
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
  <td className="td min-w-[150px] px-4 py-2 whitespace-nowrap">
    <div className="flex items-center gap-2">
      <img
        src={
          product.image
            ? "https://assignment.rahkartest.ir/" + product.image
            : "/default-image.jpg"
        }
        alt={product.title}
        className="w-10 h-10 object-cover rounded-lg"
      />
      <span className="truncate">{product?.title}</span>
    </div>
  </td>
  <td className="td min-w-[100px] px-4 py-2 whitespace-nowrap">{product.price}</td>
  <td className="td min-w-[120px] px-4 py-2 whitespace-nowrap">{product.category?.title}</td>
  <td className="td min-w-[100px] px-4 py-2 whitespace-nowrap">
    <ToggleSwitch
      id={`toggle-${product.id}`}
      checked={isActive}
      onChange={toggleHandler}
    />
  </td>
  <td className="td min-w-[150px] px-4 py-2 whitespace-nowrap">{product.last_modified}</td>
  <td className="td min-w-[100px] px-4 py-2 whitespace-nowrap">
    <div className="space-x-4 pr-4">
      <button
        className="bg-secondary-100 rounded-md p-1"
        onClick={() => setOpen(true)}
        aria-label={`Edit ${product.title}`}
      >
        <MdOutlineModeEditOutline className="w-5 h-5 text-secondary-400" />
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
