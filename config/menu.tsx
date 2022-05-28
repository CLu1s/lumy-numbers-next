import { AiFillHome } from "react-icons/ai";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiBook2Fill, RiHandHeartFill } from "react-icons/ri";
import { ImStatsBars } from "react-icons/im";

type MenuItem = {
  id: number;
  label: string;
  mobileLabel?: string;
  showOnMobile: boolean;
  icon: React.ReactNode;
  path: string;
};

export const menuList: MenuItem[] = [
  {
    id: 1,
    label: "General",
    path: "/app/home",
    icon: <AiFillHome />,
    showOnMobile: true,
  },
  {
    id: 2,
    label: "Transacciones",
    icon: <MdAccountBalanceWallet />,
    path: "/app/transacciones",
    showOnMobile: true,
  },
  {
    id: 3,
    label: "Mis Gastos fijos",
    mobileLabel: "Gastos fijos",
    path: "/app/costos-fijos",
    icon: <RiBook2Fill />,
    showOnMobile: true,
  },
  {
    id: 4,
    label: "Mis Proyectos",
    mobileLabel: "Proyectos",
    path: "/app/proyectos",
    icon: <RiHandHeartFill />,
    showOnMobile: false,
  },
  {
    id: 5,
    label: "Plan de Gastos",
    path: "/app/presupuesto",
    icon: <ImStatsBars />,
    showOnMobile: true,
  },
];
