import { Auth } from "aws-amplify";
import { Container, Stack, HStack, Avatar } from "@chakra-ui/react";
import { RiUserLine } from "react-icons/ri";
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

export default function Topbar() {
  return (
    <Container
      borderBottomWidth={1}
      paddingY={2}
      
    >
      <HStack spacing={4} justifyContent={"space-between"}>
        <Stack isInline spacing={4}>
          <button onClick={signOut}>adios</button>
        </Stack>
        <Stack isInline spacing={4}>
          <Avatar
          size='md'
            bg="purple.500"
            icon={<RiUserLine fontSize="2rem" color="white" />}
          />
        </Stack>
      </HStack>
    </Container>
  );
}
