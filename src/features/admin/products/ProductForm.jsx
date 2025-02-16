import TextField from "../../../ui/TextField";
import RHFSelect from "../../../ui/RHFSelect";
import Toggle from "../../../ui/Toggle";

const ProductForm = ({ register, errors, categoryOptions }) => {
  return (
    <div>
      <RHFSelect
        name="category_id"
        label="Select a Category"
        register={register}
        required
        options={categoryOptions}
        errors={errors.category_id && errors.category_id.message}
      />
      <TextField
        label="Product Name"
        name="title"
        placeholder={"Type Here"}
        errors={errors}
        register={register}
        type="text"
      />
      <TextField
        label="Product Price"
        name="price"
        placeholder={"Enter Price"}
        errors={errors}
        register={register}
        type="number"
      />
      <Toggle name="is_active" register={register} label="Active" />
    </div>
  );
};

export default ProductForm;
