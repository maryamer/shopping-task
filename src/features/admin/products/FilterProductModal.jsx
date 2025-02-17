
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import RHFSelect from "../../../ui/RHFSelect";
import TextField from "../../../ui/TextField";

function FilterProductModal({
  register,
  handleSubmit,
  onSubmit,
  setOpen,
  categoryOptions,
  errors,
  open,
}) {
  return (
    <Modal title={"Filter Products"} open={open} onClose={() => setOpen(false)}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <RHFSelect
          name="category_id"
          label="Select a Category"
          register={register}
          options={categoryOptions}
          errors={errors.category_id && errors.category_id.message}
        />
            <RHFSelect
        label="Status"
        name="is_active"
        register={register}
        options={[
          { value: "1", label: "Active" },
          { value: "0", label: "Inactive" },
        ]}
        errors={errors}
        defaultValue="1"
      />
        <TextField
          label="Search"
          name="search"
          placeholder="Type Here"
          errors={errors}
          register={register}
          type="text"
        />
    

        <div>
          <label
            className="pb-2 mb-2 border-b border-b-secondary-200 text-md font-bold block text-secondary-700"
            htmlFor="price_range"
          >
            Price Range
          </label>
          <div className="flex h-full justify-between gap-2">
            <TextField
              className="w-full"
              label="From"
              name="price_range[0]"
              placeholder="Enter Price"
              errors={errors}
              register={register}
              type="number"
            />

            <TextField
              className="w-full"
              label="To"
              name="price_range[1]"
              placeholder="Enter Price"
              errors={errors}
              register={register}
              type="number"
            />
          </div>
        </div>
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
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default FilterProductModal;
