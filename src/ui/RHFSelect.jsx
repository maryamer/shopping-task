function RHFSelect({
  label,
  name,
  register,
  options,
  required,
  errors,
  defaultValue = {},
  icon, // New prop for the icon
}) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="mb-2 text-sm font-bold block text-secondary-700"
      >
        {label} {required && <span className="text-error">*</span>}
      </label>
      <div className="mt-1 relative">
        {/* Icon inside the select field */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <select
          id={name}
          defaultValue={defaultValue}
          {...register(name)}
          className={`block w-full px-3 py-2 textField__input rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
            icon && "pl-10"
          }`} // Updated styles to match TextField
        >
          <option value="">{`Select a ${label}`}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {errors && errors[name] && (
        <span className="text-error block text-sm mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default RHFSelect;
