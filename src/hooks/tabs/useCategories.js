import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategoryApi,
  getCategoryApi,
  removeCategoryApi,
  updateCategoryApi,
} from "../../services/categoyService";
import toast from "react-hot-toast";

export default function useCategories(page) {
  return useQuery({
    queryKey: [{ query: "categories", page }], // Using object form
    queryFn: () => getCategoryApi(page),
    retry: 1,
    keepPreviousData: true, // To keep data from the previous page while loading the new one
  });
}

export function useRemoveCategory(id, page) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeCategoryApi(id), // Use mutationFn for mutations
    retry: false,
    onError: (error) => {
      toast.error("Error removing category: " + error?.response?.data?.message); // Handle the error appropriately
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ query: "categories", page }],
      });
      toast.success("Category removed successfully"); // Optionally handle success
    },
  });
}
export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title) => addCategoryApi(title), // Use mutationFn for mutations
    retry: false,
    onError: (error) => {
      console.log(error);
      toast.error("Error adding category:" + error?.response?.data?.message); // Handle the error appropriately
    },
    onSuccess: () => {
      queryClient.invalidateQueries([{ query: "categories", all: true }]);
      toast.success("Category added successfully"); // Optionally handle success
    },
  });
}
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoryApi, // Use mutationFn for mutations
    retry: false,
    onError: (error) => {
      console.log(error);
      toast.error("Error update category:" + error?.response?.data?.message); // Handle the error appropriately
    },
    onSuccess: () => {
      queryClient.invalidateQueries([{ query: "categories", all: true }]);
      toast.success("Category updated successfully"); // Optionally handle success
    },
  });
}
