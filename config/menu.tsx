import { AiFillHome } from "react-icons/ai";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
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
  // {
  //   id: 3,
  //   label: "Configuración",
  //   path: "/configuracion",
  //   icon: <RiSettings3Fill />,
  //   active: false,
  // },
];
