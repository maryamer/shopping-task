import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const renderPageBtns = () =>
    Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`w-7 h-7 text-xs ${
          page === currentPage ? "bg-secondary-200" : ""
        } rounded-md`}
        aria-label={`Page ${page}`}
      >
        {page}
      </button>
    ));

  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1 && "opacity-50"
        } py-2 border px-5 text-secondary-900 text-sm items-center justify-center gap-2 flex border-secondary-300 rounded-xl`}
        aria-label="Previous Page"
      >
        <FaArrowLeftLong /> Previous
      </button>

      <div className="flex items-center justify-center gap-1">
        {renderPageBtns()}
      </div>

      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages && "opacity-50"
        } py-2 border px-5 text-secondary-900 text-sm items-center justify-center gap-2 flex border-secondary-300 rounded-xl`}
        aria-label="Next Page"
      >
        Next <FaArrowRightLong />
      </button>
    </div>
  );
};
export default Pagination;
