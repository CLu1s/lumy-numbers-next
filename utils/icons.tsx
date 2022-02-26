import { HiOutlineHome } from "react-icons/hi";
import {
  BiHappyBeaming,
  BiAngry,
  BiMoney,
  BiBadgeCheck,
  BiBasket,
  BiBone,
  BiBrain,
  BiCalendar,
  BiBriefcaseAlt,
} from "react-icons/bi";
import { AiOutlineStock, AiOutlineWarning } from "react-icons/ai";
import { MdOutlineSavings } from "react-icons/md";

const list = {
  HiOutlineHome: {
    icon: <HiOutlineHome />,
    name: "Income",
  },
  BiHappyBeaming: { icon: <BiHappyBeaming />, name: "Expense" },
  AiOutlineStock: { icon: <AiOutlineStock />, name: "Transfer" },
  AiOutlineWarning: { icon: <AiOutlineWarning />, name: "Budget" },
  MdOutlineSavings: { icon: <MdOutlineSavings />, name: "Saving" },
  BiAngry: { icon: <BiAngry />, name: "Debt" },
  BiMoney: { icon: <BiMoney />, name: "Cash" },
  BiBadgeCheck: { icon: <BiBadgeCheck />, name: "Credit Card" },
  BiBasket: { icon: <BiBasket />, name: "Shopping" },
  BiBone: { icon: <BiBone />, name: "Gift" },
  BiBrain: { icon: <BiBrain />, name: "Gift" },
  BiCalendar: { icon: <BiCalendar />, name: "Birthday" },
  BiBriefcaseAlt: { icon: <BiBriefcaseAlt />, name: "Business" },
};

export const iconKeys = Object.keys(list);

const icons = (key: string) => {
  return list[key]?.icon ?? <HiOutlineHome />;
};

export default icons;
