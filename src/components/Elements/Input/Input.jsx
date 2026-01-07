const Input = ({ type = "text", name, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className="
        w-full rounded-xl border border-slate-300
        px-4 py-2.5 text-sm text-slate-700
        placeholder-slate-400
        focus:border-cyan-600 focus:outline-none
        transition mb-5
      "
    />
  );
};

export default Input;
