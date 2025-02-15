import { useQuery } from "@tanstack/react-query";
import getOrdersDataApi from "../../services/ordersService";

export default function useGetOrders(data) {
  return useQuery({
    queryKey: [{ query: "orders", page: data?.page }], // Using object form
    queryFn: getOrdersDataApi,
    retry: 1,
  });
}
