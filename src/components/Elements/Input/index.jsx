import Input from "./Input";
import Lable from "./Label";

const InputForm = ({ title, htmlFor, type, name, placeholder }) => {
  return (
    <div>
      <Lable title={title} htmlFor={htmlFor} />
      <Input type={type} name={name} placeholder={placeholder} />
    </div>
  );
};
export default InputForm;
