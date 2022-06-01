import { AiFillHome } from "react-icons/ai";
import { RiHandHeartFill } from "react-icons/ri";
import { ImStatsBars } from "react-icons/im";
import { BiTransfer } from "react-icons/bi";
import { AiFillCarryOut } from "react-icons/ai";
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
    icon: <BiTransfer />,
    path: "/app/transacciones",
    showOnMobile: true,
  },
  {
    id: 3,
    label: "Mis Gastos fijos",
    mobileLabel: "Gastos fijos",
    path: "/app/costos-fijos",
    icon: <AiFillCarryOut />,
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
