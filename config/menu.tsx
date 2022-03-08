import { AiFillHome } from "react-icons/ai";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { ImStatsBars } from "react-icons/im";
type MenuItem = {
  id: number;
  label: string;
  icon: React.ReactNode;
  path: string;
};

export const menuList: MenuItem[] = [
  {
    id: 1,
    label: "Dashboard",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    id: 2,
    label: "Transacciones",
    icon: <MdAccountBalanceWallet />,
    path: "/transacciones",
  },
  {
    id: 3,
    label: "Presupuesto",
    path: "/presupuesto",
    icon: <ImStatsBars />,
  },
  {
    id: 4,
    label: "Mis Gastos fijos",
    path: "/costos-fijos",
    icon: <RiBook2Fill />,
  },
];
