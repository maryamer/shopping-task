import ProductsTable from "../products/ProductsTable";
import Loading from "../../../ui/Loading";
import useProductsBody from "../../../hooks/tabs/useProductsBody";
import TableRow from "../products/TableRow";
import Pagination from "../../../ui/Pagination";
import FilterProductModal from "./FilterProductModal";

function ProductsBody() {
  const {
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
  } = useProductsBody();

  if (isLoading || isPending) return <Loading />;

  return (
    <div>
      <ProductsTable
        setOpen={setOpen}
        footer={
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        }
        body={products?.map((product) => (
          <TableRow
            key={product?.id}
            product={product}
            categories={categories}
          />
        ))}
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
