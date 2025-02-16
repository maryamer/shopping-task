export default function ToggleSwitch({ id, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className={`relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full transition-colors ${
        checked ? "bg-blue-500" : "bg-gray-400"
      }`}
    >
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={checked}
        onChange={onChange} 
      />
      <span
        className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </label>
  );
}
