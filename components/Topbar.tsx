import { Fragment } from "react";
import { Auth } from "aws-amplify";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  HiBell as BellIcon,
  HiMenu as MenuIcon,
  HiX as XIcon,
} from "react-icons/hi";
import Link from "next/link";
import clsx from "clsx";
import img from "../../img/avatar.png";
import logo from "../../img/logo.svg";
import logoText from "../../img/logo-text.svg";
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
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-purple-400 hover:text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                {/* <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={logoText}
                    alt="Workflow"
                  />
                </div> */}
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx(
                            item.current && "bg-purple-900 text-white",
                            !item.current &&
                              "text-purple-700 hover:bg-purple-700 hover:text-white",
                            type2class
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-purple-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-purple-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      m
                      {/* <img className="h-8 w-8 rounded-full" src={img} alt="" /> */}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <LinkStyled
                            active={active}
                            label={"Your Profile"}
                            href={"/"}
                          />
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <LinkStyled
                            active={active}
                            label={"Settings"}
                            href={"/"}
                          />
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => <button onClick={signOut}>Cerrar sesion</button>}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={clsx(
                      item.current && "bg-purple-900 text-white",
                      !item.current &&
                        "text-purple-700 hover:bg-purple-700 hover:text-white",
                      type2class
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
