import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProductApi,
  getProductsApi,
  removeProductsApi,
  toggleProductApi,
  UpdateProductApi,
} from "../../services/productsService";
import toast from "react-hot-toast";

export default function useGetProducts(data) {
  return useQuery({
    queryKey: [{ query: "products", page: data?.page }], // Using object form
    queryFn: () => getProductsApi(data),
    retry: 1,
  });
}

export function useRemoveProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeProductsApi, // Use mutationFn for mutations
    retry: false,
    onError: (error) => {
      toast.error("Error removing Product:" + error?.response?.data?.message); // Handle the error appropriately
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ query: "products" }],
      });
      toast.success("Product removed successfully"); // Optionally handle success
    },
  });
}
export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductApi, // Use mutationFn for mutations
    retry: false,
    onError: (error) => {
      console.log(error);
      toast.error("Error adding product:" + error?.response?.data?.message); // Handle the error appropriately
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("product added successfully"); // Optionally handle success
    },
  });
}
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateProductApi, // Use mutationFn for mutations
    retry: false,
    onError: (error) => {
      console.log(error);
      toast.error("Error update Products:" + error?.response?.data?.message); // Handle the error appropriately
    },
    onSuccess: () => {
      queryClient.invalidateQueries([{ query: "products" }]);
      toast.success("Products updated successfully"); // Optionally handle success
    },
  });
}
export function useToggleProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleProductApi, // Use mutationFn for mutations
    retry: false,
    onError: (error) => {
      console.log(error);
      toast.error("Error toggle Product:" + error?.response?.data?.message); // Handle the error appropriately
    },
    onSuccess: () => {
      queryClient.invalidateQueries([{ query: "products" }]);
      toast.success("Product toggled successfully"); // Optionally handle success
    },
  });
}
