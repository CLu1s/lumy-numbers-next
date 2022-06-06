import { AiFillHome } from "react-icons/ai";
import { RiHandHeartFill } from "react-icons/ri";
import { ImStatsBars } from "react-icons/im";
import { BiTransfer } from "react-icons/bi";
import { AiFillCarryOut } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
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
    icon: <Icon as={AiFillHome} w={6} h={6} />,
    showOnMobile: true,
  },
  {
    id: 2,
    label: "Gastos",
    icon: <Icon as={BiTransfer} w={6} h={6} />,
    path: "/app/transacciones",
    showOnMobile: true,
  },
  {
    id: 3,
    label: "Mis Gastos fijos",
    mobileLabel: "Fijos",
    path: "/app/costos-fijos",
    icon: <Icon as={AiFillCarryOut} w={6} h={6} />,
    showOnMobile: true,
  },
  {
    id: 4,
    label: "Mis Proyectos",
    mobileLabel: "Proyectos",
    path: "/app/proyectos",
    icon: <Icon as={RiHandHeartFill} w={6} h={6} />,
    showOnMobile: true,
  },
  {
    id: 5,
    label: "Plan de Gastos",
    mobileLabel: "Plan",
    path: "/app/presupuesto",
    icon: <Icon as={ImStatsBars} w={6} h={6} />,
    showOnMobile: true,
  },
];
