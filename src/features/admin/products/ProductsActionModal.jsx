import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TextField from "../../../ui/TextField";
import Modal from "../../../ui/Modal";
import {
  useAddProduct,
  useUpdateProduct,
} from "../../../hooks/tabs/useProducts";
import RHFSelect from "../../../ui/RHFSelect";
import toast from "react-hot-toast";
import Button from "../../../ui/Button";
import Toggle from "../../../ui/Toggle";
import { BiTrash } from "react-icons/bi";

const schema = yup.object({
  title: yup.string().required("Please Enter Category Name"),
  price: yup.number().required("Please Enter Product Price").positive().min(1),
  category_id: yup.string().required("Please Select a Category"),
});

function ProductsActionModal({
  selectedProduct,
  id,
  open,
  setOpen,
  categories = [],
}) {
  const { mutateAsync: UpdateProduct, isPending: isPendingEdit } =
    useUpdateProduct();
  const { mutateAsync: addProduct, isPending: isPendingAdd } = useAddProduct();
  console.log("selected", selectedProduct?.category_id);
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
  // Set default image preview and category when selectedProduct exists
  const [image, setImage] = useState(
    selectedProduct?.image ? defaultImageLink : null
  );
  // const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.category_id) {
        setValue(
          "category_id",
          categoryOptions?.find(
            (item) => item.value === selectedProduct.category_id
          ).value
        ); // Pre-select the category
      }
      if (selectedProduct.image) {
        setImage(defaultImageLink); // Set image preview if available
        setValue("image", defaultImageLink); // Pre-set image field in form
      }
    }
  }, [selectedProduct, setValue, categories]);

  const onSubmit = async (data) => {
    console.log(data, "fff");
    const { title, price, category_id, is_active, image } = data;

    // Prepare form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category_id", category_id);
    formData.append("is_active", is_active ? "1" : "0");

    // Append image if available

    if (image && typeof image !== "string") {
      // if image is a file, append it
      formData.append("image", image);
    }

    try {
      if (id) {
        // Update category if ID exists
        console.log("mtim", image);
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
        // Add product if no ID exists
        await addProduct(formData);
      }

      // Close modal after successful submission
      setOpen(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data. Please try again.");
    }
  };

  // Handle file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image preview URL
        setValue("image", file); // Set image file in form data
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setValue("image", null); // Remove image from form data
  };

  return (
    <Modal
      className={""}
      title={selectedProduct ? "Edit Product" : "Add New Product"}
      open={open}
      onClose={() => setOpen(false)}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Upload Box */}
          <div className="border border-dashed flex items-center justify-center aspect-video p-4 rounded-md mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
              disabled={!!image} // Prevent upload if an image is set
            />
            <label
              htmlFor="image-upload"
              className={`cursor-pointer w-full ${
                image ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div className="text-center text-secondary-500">
                {image ? "Image uploaded" : "Click to upload an image"}
              </div>
            </label>
          </div>

          {/* Image Preview Card */}
          {image && (
            <div className="mt-4 border rounded-md p-2 shadow-md">
              <div className="relative flex items-center justify-between">
                <button
                  type="button"
                  onClick={removeImage}
                  className="  top-2 right-2  text-secondary-400 p-1 rounded-full"
                >
                  <BiTrash className="w-5 h-5" />
                </button>
                <img
                  src={image}
                  alt="Preview"
                  className="w-14 aspect-square h-auto object-cover rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        <RHFSelect
          name="category_id"
          label="Select a Category"
          register={register}
          required
          options={categoryOptions}
          errors={errors.category_id && errors.category_id.message}
        />

        {/* Product Name */}
        <TextField
          label="Product Name"
          name="title"
          placeholder={"Type Here"}
          errors={errors}
          register={register}
          type="text"
        />

        {/* Product Price */}
        <TextField
          label="Product Price"
          name="price"
          placeholder={"Enter Price"}
          errors={errors}
          register={register}
          type="number"
        />

        <Toggle name="is_active" register={register} label="Active" />

        <div className="flex space-x-2">
          <Button
            type="button"
            onClick={() => setOpen(false)}
            className="py-2 px-4 btn bg-white border border-secondary-500 hover:bg-white font-sm hover:opacity-80 text-secondary-500 shadow-none rounded-md w-full"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="py-2 px-4 btn btn--primary rounded-md w-full"
          >
            {isPendingAdd || isPendingEdit ? "Loading..." : "Confirm"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ProductsActionModal;
