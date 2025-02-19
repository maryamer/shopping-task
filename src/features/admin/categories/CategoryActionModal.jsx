import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddCategory,
  useUpdateCategory,
} from "../../../hooks/tabs/useCategories";
import Button from "../../../ui/Button";
import TextField from "../../../ui/TextField";
import Modal from "../../../ui/Modal";

const schema = yup
  .object({
    title: yup.string().required("Please Enter Category Name"),
  })
  .required();

function CategoryActionModal({ id, open, setOpen, title }) {
  const { mutateAsync: UpdateCategory, isPending: isPendingEdit } =
    useUpdateCategory();
  const { mutateAsync: addCategory, isPending: isPendingAdd } =
    useAddCategory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: { title },
  });

  const onSubmit = async ({ title }) => {
    console.log("values", title, id);

    console.log("values", title, id);
    if (id) {
      try {
        await UpdateCategory({ title, id }); // Ensure this finishes first
        reset();
      } catch {
        console.log("an err acuured");
      }
    } else {
      try {
        await addCategory(title); // Same here
        reset();
      } catch (error) {
        console.log("an error accured");
      }
    }
    setOpen(false);
  };

  return (
    <Modal
      className={""}
      title={!id ? "Add New Category" : "Edit Category"}
      open={open}
      onClose={() => setOpen(false)}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Category Name"
          name="title"
          placeholder={"Type Here"}
          errors={errors}
          register={register}
          type="text"
        />

        <div className="flex space-x-2 ">
          <Button
            type="button"
            onClick={() => setOpen(false)}
            className="py-2 px-4 btn bg-white border border-secondary-500 hover:bg-white font-sm hover:opacity-80 text-secondary-500 shadow-none rounded-md w-full"
          >
            Cancel{" "}
          </Button>
          <Button
            type="submit"
            className="py-2 px-4 btn btn--primary rounded-md w-full"
          >
            {isPendingAdd || isPendingEdit ? "Loading..." : "Confirm"}{" "}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CategoryActionModal;
