import ProductsTable from "../products/ProductsTable";
import FilterProductModal from "./FilterProductModal";
import SearchField from "../../../ui/SearchField";

function ProductsBody({
  setCurrentPage,
  currentPage,
  isLoading,
  isPending,
  products,
  totalPages,
  setOpen,
  categoryOptions,
  categories,
  filterOpen,
  setFilterOpen,
}) {
  // if (isLoading || isPending) return <Loading />;
  const loading = isLoading || isPending;
  return (
    <div className="px-1 h-full">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-semibold">Product List</div>
        <SearchField setOpen={setFilterOpen} />
      </div>
      <ProductsTable
        loading={loading}
        products={products}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        categoryOptions={categoryOptions}
        currentPageLength={products?.length}
        setOpen={setOpen}
        categories={categories}
      />
      {/* filter modal */}
      <FilterProductModal
        open={filterOpen}
        setOpen={setFilterOpen}
        categoryOptions={categoryOptions}
      />{" "}
    </div>
  );
}

export default ProductsBody;
