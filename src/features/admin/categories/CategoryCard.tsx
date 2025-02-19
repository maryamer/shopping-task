import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useRemoveCategory } from "../../../hooks/tabs/useCategories";
import CategoryActionModal from "./CategoryActionModal";
import ConfirmDelete from "../../../ui/ConfirmDelete";

function CategoryCard({ category, currentPage }) {
  const { mutateAsync: remove, isPending } = useRemoveCategory(
    category?.id,
    currentPage
  );
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div
      className={`px-2 py-2.5 flex max-h-16 items-center text-sm justify-between rounded-md bg-white ${
        isPending && "opacity-50"
      }`}
    >
      <CategoryActionModal
        open={open}
        setOpen={setOpen}
        id={category.id}
        title={category.title}
      />

      <ConfirmDelete
        open={openDelete}
        isLoading={isPending}
        resourceName={category.title}
        desc={
          "Are you sure you want to delete this category? all subcategory of this category will deleted !"
        }
        onClose={() => setOpenDelete(false)}
        onConfirm={async () => {
          try {
            await remove(category?.id);
            setOpenDelete(false);
          } catch (error) {
            setOpenDelete(false);
          }
        }}
        disabled={false}
      />
      <span className="font-semibold flex items-center">{category.title}</span>
      <div className="space-x-3">
        <button
          className=" bg-secondary-100 rounded-md p-1"
          onClick={() => setOpen(true)}
        >
          <MdOutlineModeEditOutline className="w-5 h-5 text-secondary-500" />
        </button>
        <button
          className=" rounded-md p-1 bg-red-100"
          onClick={() => setOpenDelete(true)}
          // onClick={() => remove(category?.id)}
        >
          <HiOutlineTrash className="w-5 h-5 text-red-700" />
        </button>
      </div>
    </div>
  );
}
export default CategoryCard;
