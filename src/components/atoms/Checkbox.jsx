import { IconCheckbox, IconCheckboxOutline } from "assets/icons";

const Checkbox = ({ value, handleChange = () => {} }) => {
  //   const [check, setCheck] = useState(false);
  return value ? (
    <IconCheckbox
      className="w-[18px] h-[18px] cursor-pointer"
      onClick={() => handleChange(false)}
    />
  ) : (
    <IconCheckboxOutline
      className="w-[18px] h-[18px] cursor-pointer"
      onClick={() => handleChange(true)}
    />
  );
};

export default Checkbox;
