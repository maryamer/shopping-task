import ProductsTable from "../products/ProductsTable";
import Loading from "../../../ui/Loading";
import ProductsTableRow from "./ProductsTableRow";
import Pagination from "../../../ui/Pagination";
import FilterProductModal from "./FilterProductModal";

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
const loading = isLoading || isPending
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
        body={loading ? <Loading />:products?.map((product) => (
          <ProductsTableRow
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
