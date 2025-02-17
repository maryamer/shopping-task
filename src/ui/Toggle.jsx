const Toggle = ({ label, register, name, defaultChecked = false }) => {
  return (
    <label htmlFor={name} className="flex items-center mt-1 cursor-pointer">
      {/* Toggle Wrapper */}
      <div className="relative w-12 h-6">
        {/* Hidden Checkbox */}
        <input
          type="checkbox"
          id={name}
          {...register(name)}
          className="sr-only peer"
          defaultChecked={defaultChecked} // Ensures initial state works correctly
        />
        {/* Toggle Background */}
        <div className="absolute inset-0 w-full h-full rounded-full bg-gray-400 peer-checked:bg-blue-500 transition-colors"></div>
        {/* Toggle Circle */}
        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-6" />
      </div>
      {/* Label */}
      <span className="ml-3 text-sm text-gray-700">{label}</span>
    </label>
  );
};

export default Toggle;
