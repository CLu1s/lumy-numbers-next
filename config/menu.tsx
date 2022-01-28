import { AiFillHome } from "react-icons/ai";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import { ImStatsBars } from "react-icons/im";
type MenuItem = {
  id: number;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  path: string;
};

export const menuList: MenuItem[] = [
  {
    id: 1,
    label: "Dashboard",
    path: "/",
    icon: <AiFillHome />,
    active: true,
  },
  {
    id: 2,
    label: "Transacciones",
    icon: <MdAccountBalanceWallet />,
    path: "/transacciones",
    active: false,
  },
  {
    id: 3,
    label: "Presupusto",
    path: "/presupuesto",
    icon: <ImStatsBars />,
    active: false,
  },
];
