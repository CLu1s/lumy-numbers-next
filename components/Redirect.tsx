import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Heading, Text, VStack } from "@chakra-ui/react";
import Loading from "./Loading";
import logo from "../public/logo.png";

const Redirect = ({ href }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(href);
  }, [href, router]);
  return (
    <VStack marginTop="50%" spacing="8">
      <Image
        src={logo}
        alt="Logo"
        width={192}
        height={192}
        placeholder="blur"
      />
      <Heading>Luminus</Heading>
      <Text>Gasto Consciente</Text>

      <Loading />
      <Text>Cargando...</Text>
    </VStack>
  );
};

export default Redirect;
