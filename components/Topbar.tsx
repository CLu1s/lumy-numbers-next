import { Auth } from "aws-amplify";
import Link from "next/link";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "Transacciones", href: "/transacciones", current: false },
  {
    name: "Configurar Presupuesto",
    href: "/configurarPresupuesto",
    current: false,
  },
  { name: "Compartir Link", href: "/compartir", current: false },
];

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

const linkItemClass = "block px-4 py-2 text-sm text-purple-700";
const type2class = "block px-3 py-2 rounded-md text-base font-medium";

const LinkStyled = ({
  active,
  label,
  href,
  type = "default",
}: {
  active?: boolean;
  label: string;
  href: string;
  type?: "default" | "primary" | "secondary" | "tertiary";
}) => (
  <Link href={href}>
    <a className={clsx(linkItemClass, active && "bg-purple-100")}>{label}</a>
  </Link>
);

export default function Topbar() {
  // const photoURL = useSelector(getPhoto);
  return <button onClick={signOut}>adios</button>;
}
