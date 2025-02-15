import { CiSearch, CiFilter } from "react-icons/ci";

export default function ProductsTable({ body, footer, setOpen, children }) {
  return (
    <div className="overflow-hidden  mt-4 border border-secondary-200 rounded-xl">
      {children}
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-semibold">Product List</div>
        <div className="flex items-center gap-2">
          <button className="px-2 py-2 text-sm text-secondary-600 shadow-sm border rounded-lg">
            <CiSearch />
          </button>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="px-4 py-1.5 text-sm flex gap-2 items-center justify-center text-secondary-600 shadow-sm border rounded-lg"
          >
            <CiFilter /> Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto  max-w-[98vw]">
        <div className="relative">
          <table className="min-w-full table-fixed">
            <thead className="bg-secondary-200 sticky top-0 z-10">
              <tr>
                <th className="th w-32">Product Name</th>
                <th className="th w-24">Price</th>
                <th className="th w-24">Category</th>
                <th className="th w-20">Status</th>
                <th className="th md:w-20 w-36">Date</th>
                <th className="th lg:w-14 w-24"></th>
              </tr>
            </thead>
          </table>

          <div className=" max-h-[300px]">
            <table className="min-w-full table-fixed">
              <tbody>{body}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-secondary-0 p-2 text-center">{footer}</div>
    </div>
  );
}
