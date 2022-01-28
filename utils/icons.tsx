import { HiOutlineHome } from "react-icons/hi";
import { BiHappyBeaming } from "react-icons/bi";
import { AiOutlineStock,AiOutlineWarning } from "react-icons/ai";

const icons = (key: string) => {
  const list = {
    HiOutlineHome: <HiOutlineHome />,
    BiHappyBeaming: <BiHappyBeaming />,
    AiOutlineStock: <AiOutlineStock />,
    AiOutlineWarning: <AiOutlineWarning />,
  };
  return list[key] || <HiOutlineHome />;
};

export default icons;