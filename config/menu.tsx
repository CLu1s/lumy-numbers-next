import { AiFillHome } from "react-icons/ai";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiBook2Fill,RiHandHeartFill } from "react-icons/ri";
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
    path: "/app/home",
    icon: <AiFillHome />,
  },
  {
    id: 2,
    label: "Transacciones",
    icon: <MdAccountBalanceWallet />,
    path: "/app/transacciones",
  },
  {
    id: 3,
    label: "Mis Gastos fijos",
    path: "/app/costos-fijos",
    icon: <RiBook2Fill />,
  },
  {
    id: 4,
    label: "Mis Proyectos",
    path: "/app/proyectos",
    icon: <RiHandHeartFill />,
  },
  {
    id: 5,
    label: "Configuración",
    path: "/app/presupuesto",
    icon: <ImStatsBars />,
  },
];
