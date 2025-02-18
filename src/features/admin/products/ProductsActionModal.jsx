import Modal from "../../../ui/Modal";
import Button from "../../../ui/Button";
import ProductForm from "./ProductForm";
import useProductsActionModals from "../../../hooks/tabs/useProductsActionModal";
import ImageUploadAndPreview from "../../../ui/ImageUploadPreview";

const ProductsActionModal = ({
  selectedProduct,
  id,
  open,
  setOpen,
  categories = [],
}) => {
  const {
    handleSubmit,
    isLoading,
    onSubmit,
    image,
    setImage,
    setValue,
    register,
    categoryOptions,
    errors,
  } = useProductsActionModals({ categories, id, selectedProduct, setOpen });

  return (
    <Modal
      title={selectedProduct ? "Edit Product" : "Add New Product"}
      open={open}
      onClose={() => setOpen(false)}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <ImageUploadAndPreview
          image={image}
          setImage={setImage}
          setValue={setValue}
        />
        <ProductForm
          register={register}
          errors={errors}
          categoryOptions={categoryOptions}
        />
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
            {isLoading ? "Loading..." : "Confirm"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductsActionModal;
