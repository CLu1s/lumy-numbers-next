import { iconList } from "../config/icons";
export const iconKeys = Object.keys(iconList);
import { HiOutlineHome } from "react-icons/hi";

const icons = (key: string) => {
  return iconList[key]?.icon ?? <HiOutlineHome />;
};

export default icons;
