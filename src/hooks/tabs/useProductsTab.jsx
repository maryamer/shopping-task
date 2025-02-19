import { useEffect, useState } from "react";
import useGetProducts from "./useProducts";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function useProductsBody({ setFilterOpen }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = [
    "is_active",
    "category_id",
    "search",
    "page",
    "price_range[0]",
    "price_range[1]",
  ];
  const [
    is_active,
    category_id,
    search,
    defaultPage,
    priceRange0,
    priceRange1,
  ] = filter.map((param) => searchParams.get(param));

  const [mySearchParams, setMySearchParams] = useState(() => {
    const params = {
      page: defaultPage || 1,
      is_active: is_active,
      category_id,
      search,
      ...{ "price_range[0]": priceRange0 || 0 },
      ...(priceRange1 && { "price_range[1]": priceRange1 }),
    };

    return Object.fromEntries(
      Object.entries(params).filter((item) => item[1] !== undefined)
    );
  });
  const [open, setOpen] = useState(false);
  console.log("mySearchParams", mySearchParams);
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
    // filter params by empty values
    if (newParams) {
      const { price_range } = newParams || {};
      let filteredParams = Object.fromEntries(
        Object.entries(newParams).filter(([, value]) => value)
      );

      if (price_range?.[1]) {
        filteredParams = {
          ...filteredParams,
          "price_range[0]": price_range?.[0] || 0,
          "price_range[1]": price_range?.[1],
        };
      }
      delete filteredParams.price_range;

      // update searchparams value
      Object.entries(filteredParams).forEach(([key, value]) => {
        if (value) {
          if (key !== "price_range") searchParams.set(key, value);
        } else {
          searchParams.delete(key);
        }
      });
      setMySearchParams(filteredParams);
      setSearchParams(searchParams);
    } else {
      // clear search
      setMySearchParams({});
      setSearchParams(new URLSearchParams());
    }
  };

  useEffect(() => {
    // refetch data after search params change
    refetch();
    setFilterOpen(false);
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
    reset,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      "price_range[0]": priceRange0,
      "price_range[1]": priceRange1,
      category_id: category_id,
      is_active: is_active,
      search: "",
    },
  });

  const onSubmit = (value) => {
    handleChangeParams(value);
    setOpen(false);
  };
  const resetForm = () => {
    reset({
      "price_range[0]": "",
      "price_range[1]": "",
      category_id: "",
      is_active: "",
    });

    // Optional: Clear search params if needed
    setMySearchParams({});
    setSearchParams(new URLSearchParams());
    setOpen(false);

    console.log("Form Reset Triggered");
  };
  const resetSearch = () => {
    reset({
      search: "",
    });
    const { search, ...rest } = mySearchParams || {};
    // Optional: Clear search params if needed
    setMySearchParams(rest);
    searchParams.delete("search");
    setSearchParams(searchParams);
    // setOpen(false);

    console.log("Form Reset Triggered");
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
    categoryOptions: [...categoryOptions],
    setOpen,
    searchParams,
    useFormProps: {
      resetFilterForm: () => resetForm(),
      reset,
      resetSearch,
      setValue,
      errors,
      handleSubmit,
      register,
      onSubmit,
    },
  };
}

export default useProductsBody;
