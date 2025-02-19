import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useAddProduct, useUpdateProduct } from "./useProducts";

const schema = yup.object({
  title: yup.string().required("Please Enter Product Name"),
  price: yup.number().required("Please Enter Product Price").positive().min(1),
  category_id: yup.string().required("Please Select a Category"),
});

// this is a modal for add and edit product
function useActionModal({ categories, id, selectedProduct, setOpen }) {
  const { mutateAsync: UpdateProduct, isPending: isPendingEdit } =
    useUpdateProduct();
  const { mutateAsync: addProduct, isPending: isPendingAdd } = useAddProduct();
  const categoryOptions = categories;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: selectedProduct || {
      id: "",
      title: "",
      price: "",
      category_id: "",
      is_active: "1",
      image: "",
    },
  });

  const defaultImageLink =
    "https://assignment.rahkartest.ir/" + selectedProduct?.image;
  const [image, setImage] = useState(
    selectedProduct?.image ? defaultImageLink : null
  );

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.category_id) {
        setValue(
          "category_id",
          categoryOptions?.find(
            (item) => item.value === selectedProduct.category_id
          ).value
        );
      }
      if (selectedProduct.image) {
        setImage(defaultImageLink);
        setValue("image", defaultImageLink);
      }
    }
  }, [selectedProduct, setValue]);

  const onSubmit = async (data) => {
    const { title, price, category_id, is_active, image } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category_id", category_id);
    formData.append("is_active", is_active ? "1" : "0");

    if (image && typeof image !== "string") {
      // console.log("image", image);
      formData.append("image", image);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      if (id) {
        if (image === defaultImageLink) {
          await UpdateProduct({
            id,
            title,
            price,
            category_id,
            is_active: is_active ? "0" : "1",
            _method: "PUT",
          });
        } else {
          await UpdateProduct({
            id,
            title,
            price,
            category_id,
            is_active: is_active ? "0" : "1",
            image,
            _method: "PUT",
          });
        }
      } else {
        await addProduct(formData);
      }
      reset();
      setImage(null);
      setOpen(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data. Please try again.");
    }
  };

  return {
    handleSubmit,
    isLoading: isPendingAdd || isPendingEdit,
    onSubmit,
    image,
    setImage,
    setValue,
    register,
    categoryOptions,
    errors,
  };
}

export default useActionModal;
