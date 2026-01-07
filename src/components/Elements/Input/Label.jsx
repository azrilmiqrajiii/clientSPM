const Label = ({ title, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-1 text-sm font-medium text-slate-600"
    >
      {title}
    </label>
  );
};

export default Label;
