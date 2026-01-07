const Button = ({
  title,
  classname = "bg-white text-black",
  onClick,
  type = "button",
}) => {
  return (
    <button
      className={`${classname} py-2 px-2 w-full rounded-3xl text-sm cursor-pointer my-4 font-bold`}
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
