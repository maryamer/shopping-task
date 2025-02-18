import ProductsTable from "../products/ProductsTable";
import Loading from "../../../ui/Loading";
import ProductsTableRow from "./ProductsTableRow";
import Pagination from "../../../ui/Pagination";
import FilterProductModal from "./FilterProductModal";
import NotFoundAnyItem from "../../../ui/NotFoundAnyItem";

function ProductsBody({
  setCurrentPage,
  currentPage,
  isLoading,
  isPending,
  products,
  totalPages,
  open,
  setOpen,
  onSubmit,
  categoryOptions,
  errors,
  register,
  handleSubmit,
  categories,
}) {
  // if (isLoading || isPending) return <Loading />;
  const loading = isLoading || isPending;
  if (!products?.length)
    return <NotFoundAnyItem onAdd={() => setOpen(true)} title={"Product"} />;
  return (
    <div>
      <ProductsTable
        setOpen={setOpen}
        footer={
          totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )
        }
        body={
          loading ? (
            <Loading />
          ) : products.length ? (
            products?.map((product) => (
              <ProductsTableRow
                currentPageLength={products.length}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                key={product?.id}
                product={product}
                categories={categories}
              />
            ))
          ) : null
        }
      />
      {/* filter modal */}
      <FilterProductModal
        open={open}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        setOpen={setOpen}
        categoryOptions={categoryOptions}
        errors={errors}
      />{" "}
    </div>
  );
}

export default ProductsBody;
