import { useEffect, useState } from "react";
import useGetProducts from "./useProducts";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function useProductsBody() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = ["is_active", "category_id", "search", "page", "from", "to"];
  const [is_active, category_id, search, defaultPage, from, to] = filter.map(
    (param) => searchParams.get(param)
  );

  const [mySearchParams, setMySearchParams] = useState(() => {
    const params = {
      page: defaultPage || 1,
      is_active: is_active,
      category_id,
      search,
      from,
      to,
      ...(from && { "price_range[0]": from }),
      ...(to && { "price_range[1]": to }),
    };

    return Object.fromEntries(
      Object.entries(params).filter((item) => item[1] !== undefined)
    );
  });
  const [open, setOpen] = useState(false);

  const { data, isLoading, isPending, refetch } = useGetProducts({
    ...mySearchParams,
  });
  const productsData = data;
  const products = data?.products?.data;
  const categories = productsData?.categories || [];
  const totalPages = productsData?.products?.last_page || 1;

  const currentPage = mySearchParams.page;

  const setCurrentPage = (page) => {
    setMySearchParams((prev) => ({ ...prev, page }));
  };

  const handleChangeParams = (newParams) => {
    console.log("newParams", newParams);
    const filteredParams = Object.fromEntries(
      Object.entries(newParams).filter(([, value]) => value)
    );
    console.log("filtered", filteredParams);

    setMySearchParams({ ...newParams });

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    setSearchParams(searchParams);
  };

  useEffect(() => {
    refetch();
  }, [mySearchParams]);

  const categoryOptions =
    categories?.map((item) => ({
      label: item?.title,
      value: item?.id,
    })) || [];
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      from: from,
      to: to,
      category_id: category_id,
      is_active: is_active,
      search,
    },
  });
  // useEffect(() => {
  //   setValue("from", from);
  //   setValue("category_id", category_id);
  //   setValue("search", search);
  // }, []);
  const onSubmit = (value) => {
    handleChangeParams(value);
    setOpen(false);
  };
  return {
    handleChangeParams,
    setCurrentPage,
    setMySearchParams,
    currentPage,
    isLoading,
    isPending,
    products,
    categories,
    totalPages,
    open,
    refetch,
    onSubmit,
    categoryOptions: [{ label: "all", value: "" }, ...categoryOptions],
    errors,
    setValue,
    register,
    handleSubmit,
    setOpen,
    searchParams,
  };
}

export default useProductsBody;
