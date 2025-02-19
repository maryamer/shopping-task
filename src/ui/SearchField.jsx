import { CiFilter, CiSearch } from "react-icons/ci";
import TextField from "./TextField";
import { useFormContext } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";

function SearchField({ setOpen }) {
  const { handleSubmit, errors, setValue, resetSearch, register, onSubmit } =
    useFormContext();
  return (
    <div className="center-flex gap-2">
      <form className="center-flex gap-2" onSubmit={handleSubmit(onSubmit)}>
        <button
          type="submit"
          className=" rounded-md border border-secondary-300 bg-white w-11 h-11 center-flex  "
        >
          <CiSearch />
        </button>
        <div className="relative">
          <button
            onClick={() => {
              resetSearch(), setValue("search", "");
            }}
            type="button"
            className="absolute z-50 top-1/2 -translate-y-1/2 right-2"
          >
            <MdOutlineCancel className="" />
          </button>
          <TextField
            name="search"
            placeholder="Type Here"
            errors={errors}
            register={register}
            type="search"
          />
        </div>
      </form>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className=" rounded-md   border-secondary-300 bg-white  center-flex  px-4 py-[0.55rem] text-sm flex gap-2 items-center justify-center text-secondary-600 shadow-sm border "
      >
        <CiFilter /> Filter
      </button>
    </div>
  );
}

export default SearchField;
