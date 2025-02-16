import { useState } from "react";

import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";

import CategoryActionModal from "../categories/CategoryActionModal";

import { IoIosInformationCircleOutline } from "react-icons/io";
import useCategories, {
  useRemoveCategory,
} from "../../../hooks/tabs/useCategories";
import Loading from "../../../ui/Loading";
import NotFoundAnyItem from "../../../ui/NotFoundAnyItem";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";

function CategoriesBody() {
  const [currentPage, setCurrentPage] = useState(1);

  // Pass currentPage to the hook
  const { data, isLoading } = useCategories(currentPage); // Pass currentPage to the hook
  const categories = data?.categories?.data || [];
  const totalPages = data?.categories?.last_page || 1;
  console.log("categories", data);
  // Handle page change logic
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageButtons = () => {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) pages.unshift("...");
    if (endPage < totalPages) pages.push("...");

    return pages.map((page) => (
      <button
        key={page}
        onClick={() => page !== "..." && handlePageChange(page)}
        className={`w-9 h-9 aspect-square ${
          page === currentPage ? " bg-secondary-100" : ""
        } rounded-md`}
        disabled={page === "..."}
      >
        {page}
      </button>
    ));
  };

  const renderCategoriesList = () => {
    if (isLoading) return <Loading />;
    if (!categories?.length)
      return (
        <div className="h-full pb-24">
          <NotFoundAnyItem />
        </div>
      );

    return (
      <div className="  mt-8  w-full">
        <div className="h-[55vh] md:h-[40vh] lg:h-full grid md:grid-cols-2 gap-3 lmd:gap-4  overflow-y-auto">
          {categories.map((category) => (
            <CategoryCard
              currentPage={currentPage}
              key={category.id}
              category={category}
            />
          ))}
        </div>
        <PaginationCard
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          renderPageButtons={renderPageButtons}
          totalPages={totalPages}
        />
      </div>
    );
  };

  return (
    <div className="mx-auto h-full max-w-screen-lg lg:px-10 md:max-w-none w-full flex flex-col gap-y-12">
      {renderCategoriesList()}
    </div>
  );
}

export default CategoriesBody;

export function PaginationCard({
  currentPage,
  handlePageChange,
  renderPageButtons,
  totalPages,
  classNames = "",
}) {
  return (
    <div
      className={`absolute bg-white left-1/2 w-full -translate-x-1/2 lg:bottom-0 bottom-2 flex justify-between p-4 mt-4 ${classNames}`}
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1 && "opacity-50"
        }  py-0.5 border px-5 text-secondary-900 text-sm items-center justify-center gap-2 flex border-secondary-300 rounded-xl`}
      >
        <FaArrowLeftLong /> Previous
      </button>
      <div className="flex items-center justify-center gap-2">
        {renderPageButtons()}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages && "opacity-50"
        }  py-0 border px-5 text-secondary-900 text-sm items-center justify-center gap-2 flex border-secondary-300 rounded-xl`}
      >
        Next <FaArrowRightLong />
      </button>
    </div>
  );
}
function CategoryCard({ category, currentPage }) {
  const {
    mutateAsync: remove,
    isLoading,
    isPending,
  } = useRemoveCategory(category?.id, currentPage);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div
      className={`px-2 py-2.5 flex max-h-16 items-center text-sm justify-between rounded-md bg-white ${
        (isLoading || isPending) && "opacity-50"
      }`}
    >
      <CategoryActionModal
        open={open}
        setOpen={setOpen}
        id={category.id}
        title={category.title}
      />
      <Modal
        title={
          <IoIosInformationCircleOutline className="text-red-500 w-12 h-12 bg-red-200 rounded-full p-2.5" />
        }
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <ConfirmDelete
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
      </Modal>
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
