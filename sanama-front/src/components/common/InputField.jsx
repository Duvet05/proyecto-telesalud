const InputField = ({ label, value, disabled, readOnly, type = "text" }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default InputField;
