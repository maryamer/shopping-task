import { useState } from "react";
import AreaChart from "../../../features/admin/orders/AreaChart";
import BarChart from "../../../features/admin/orders/barChart";
import useGetOrders from "../../../hooks/tabs/useOrders";
import Loading from "../../../ui/Loading";
import { MdInsertChartOutlined } from "react-icons/md";

const OrdersBody = () => {
  const [isArea, setIsArea] = useState(false);

  const { data, isLoading } = useGetOrders();
  console.log("ddd", data);
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="border rounded-xl lg:p-5">
        <div className="flex border-b flex-col md:flex-row gap-4 md:gap-0  w-full items-center pb-4 mt-4 lg:mt-0 mb-2 bt-2 justify-between">
          <div className="w-full hidden md:flex  items-center px-2   gap-3">
            <button
              className="border p-2.5 rounded-lg"
              onClick={() => setIsArea((prev) => !prev)}
            >
              <MdInsertChartOutlined className="text-secondary-400 w-6 h-6" />
            </button>
            <h3 className="text-2xl text-secondary-600 font-bold">Orders</h3>
          </div>
          <div className="flex text-lg lg:text-xs font-medium shadow-sm whitespace-nowrap rounded-lg">
            <button
              className={`border p-2.5 rounded-l-lg ${
                !isArea && "bg-secondary-200  "
              }`}
              onClick={() => setIsArea(false)}
            >
              Price of Orders
            </button>
            <button
              className={`border p-2.5 rounded-r-lg ${
                isArea && "bg-secondary-200  "
              }`}
              onClick={() => setIsArea(true)}
            >
              Number of Orders
            </button>
          </div>
        </div>
        {isArea ? <AreaChart data={data} /> : <BarChart data={data} />}
      </div>
    </>
  );
};

export default OrdersBody;
