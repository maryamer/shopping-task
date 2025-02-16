function TextField({
  label,
  name,
  register,
  className,
  placeholder,
  validationSchema = {},
  type = "text",
  required,
  errors,
  icon,  
}) {
  return (
    <div className={`relative ${className}`}>
      <label
        className={` mb-2 text-sm font-bold block text-secondary-700`}
        htmlFor={name}
      >
        {label} {required && <span className="text-error">*</span>}
      </label>
      <div className="mt-1 relative">
    
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          {...register(name, validationSchema)}
          id={name}
          className={`textField__input cursor-pointer ${icon && "pl-10"}`} // Add padding-left to make room for the icon
          type={type}
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
      {errors && errors[name] && (
        <span className="text-error block text-sm mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default TextField;
