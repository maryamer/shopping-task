import { CiSearch, CiFilter } from "react-icons/ci";
export default function ProductsTable({ body, footer, setOpen, children }) {
  return (
    <div className="overflow-hidden relative mt-4 border border-secondary-200 rounded-xl">
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

      <div className="overflow-x-auto h-[50vh] max-w-[98vw]">
        <table
          className={`${!body && "h-full"} w-full   table-auto border-collapse`}
        >
          <thead className="bg-gray-100">
            <tr>
              <th className="th min-w-[150px] whitespace-nowrap px-4 py-2 text-left">
                Product Name
              </th>
              <th className="th min-w-[100px] whitespace-nowrap px-4 py-2 text-left">
                Price
              </th>
              <th className="th min-w-[120px] whitespace-nowrap px-4 py-2 text-left">
                Category
              </th>
              <th className="th min-w-[100px] whitespace-nowrap px-4 py-2 text-left">
                Status
              </th>
              <th className="th min-w-[150px] whitespace-nowrap px-4 py-2 text-left">
                Date
              </th>
              <th className="th min-w-[100px] whitespace-nowrap px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y">{body}</tbody>
        </table>
      </div>

      <div className="bg-secondary-0 p-2 text-center">{footer}</div>
    </div>
  );
}
