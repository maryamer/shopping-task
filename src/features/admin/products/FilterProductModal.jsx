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
            htmlFor="is_active"
            className="block text-sm text-secondary-700 font-bold mb-2"
          >
            Status
          </label>
          <select
            id="is_active"
            {...register("is_active")}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          {errors.is_active && (
            <span className="text-red-600 text-xs">
              {errors.is_active.message}
            </span>
          )}
        </div>

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
              name="from"
              placeholder="Enter Price"
              errors={errors}
              register={register}
              type="number"
            />

            <TextField
              className="w-full"
              label="To"
              name="to"
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
