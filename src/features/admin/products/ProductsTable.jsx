import Loading from "../../../ui/Loading";
import NotFoundAnyItem from "../../../ui/NotFoundAnyItem";
import Pagination from "../../../ui/Pagination";
import ProductsTableRow from "./ProductsTableRow";

export default function ProductsTable({
  loading,
  products,
  currentPage,
  setCurrentPage,
  totalPages,
  categoryOptions,
  setOpen,
}) {
  return (
    <div className="overflow-hidden relative mt-4 border border-secondary-200 rounded-xl">
      <div className="overflow-x-auto h-[50vh] xl:h-[60vh] max-w-[98vw]">
        {loading ? (
          <Loading />
        ) : products?.length ? (
          <table
            className={`${
              products?.length < 1 && "h-full"
            } w-full   table-auto border-collapse`}
          >
            <thead className="bg-gray-100">
              <tr>
                <th className="th min-w-[150px]">Product Name</th>
                <th className="th min-w-[100px]">Price</th>
                <th className="th min-w-[120px]">Category</th>
                <th className="th min-w-[100px]">Status</th>
                <th className="th min-w-[150px]">Date</th>
                <th className="th min-w-[100px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products?.map((product) => (
                <ProductsTableRow
                  products={products}
                  currentPageLength={products.length}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  key={product?.id}
                  product={product}
                  categoryOptions={categoryOptions}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <NotFoundAnyItem
            title={"Product"}
            onAdd={() => {
              setOpen(true);
            }}
          />
        )}
      </div>

      <div className="bg-secondary-0 p-2 text-center">
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
