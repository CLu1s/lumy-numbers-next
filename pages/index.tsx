import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import {
  Container,
  Box,
  Heading,
  Text,
  Center,
  VStack,
  Wrap,
  WrapItem,
  HStack,
  Stack,
  Button,
  Input,
} from "@chakra-ui/react";
import gastos from "../public/images/gastos.png";
import proyectos from "../public/images/proyectos.png";
import home from "../public/images/home.png";
import budget from "../public/images/budget.png";
import { useRouter } from "next/router";
type ContentBoxProps = {
  title: string;
  description: string | JSX.Element;
  image: StaticImageData;
  imageAlt: string;
  imagePosition: "left" | "right";
};

const ContentBox = ({
  title,
  description,
  image,
  imageAlt,
  imagePosition,
}: ContentBoxProps) => {
  const position = imagePosition === "left" ? "row" : "row-reverse";
  useEffect(() => {
    fetch("./api/mailchimp");
  }, []);

  return (
    <Stack
      spacing={{ base: 4, md: 8 }}
      direction={{ base: "column", md: position }}
    >
      <Box width={{ base: "100%", md: "40%" }}>
        <Box
          display="block"
          margin="auto"
          position="relative"
          paddingX={{ base: 12, md: 8, lg: 12 }}
        >
          <Box
            backgroundColor="purple.400"
            width="full"
            display="block"
            w={{ base: "100%", md: "100%", lg: "100%" }}
            h={{ base: "200px", md: "125px", lg: "300px" }}
            borderRadius="lg"
            position="absolute"
            bottom="20%"
            right={0}
            left={0}
          ></Box>
          <Image
            src={image}
            layout="responsive"
            alt={imageAlt}
            width={208}
            height={400}
            placeholder="blur"
          />
        </Box>
      </Box>
      <Box
        width={{ base: "100%", md: "50%" }}
        justifyContent="center"
        display="flex"
        flexDirection="column"
        padding={{ xl: 12 }}
      >
        <VStack spacing={4} justify="left">
          <Heading
            as="h2"
            size="xl"
            fontWeight="bold"
            textAlign="left"
            w="full"
          >
            {title}
          </Heading>
          {typeof description === "string" ? (
            <Text>{description}</Text>
          ) : (
            description
          )}
        </VStack>
      </Box>
    </Stack>
  );
};

type ContentSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode | React.ReactNode[];
};

const ContentSection = ({
  children,
  title,
  description,
}: ContentSectionProps) => {
  return (
    <Box marginTop="40" width="full">
      <Center width="full">
        <VStack spacing={0} width="full">
          <Heading textAlign="center" as="h2" size="3xl" fontWeight="bold">
            {title}
          </Heading>
          {description && <Text textAlign="center">{description}</Text>}
          {children}
        </VStack>
      </Center>
    </Box>
  );
};

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSubscribe = () => {
    fetch("./api/mailchimp/newContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    setEmail("");
  };

  return (
    <>
      <Head>
        <title>Luminus Gasto Consiente</title>
        <meta
          name="description"
          content="C??mo ahorrar cientos al mes y seguir comprando lo que quieres"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box backgroundColor="purple.400" width="full">
          <Box width="full" paddingTop={8} paddingX={4}>
            <HStack m="auto" width="full" justifyContent="space-between">
              <Heading color="white">Luminus</Heading>
              <Box>
                <Button
                  onClick={() => router.push("/app/home")}
                  size="lg"
                  background="white"
                  color="gray.700"
                >
                  Iniciar Sesi??n
                </Button>
              </Box>
            </HStack>
          </Box>
          <Box paddingTop="44" paddingBottom="72" paddingX="8">
            <Center>
              <VStack spacing={8}>
                <VStack spacing={2}>
                  <Heading
                    textAlign="center"
                    as="h1"
                    size="4xl"
                    fontWeight="bold"
                    color="white"
                  >
                    Luminus
                  </Heading>
                  <Heading
                    textAlign="center"
                    as="h1"
                    size="4xl"
                    fontWeight="bold"
                    color="white"
                  >
                    Gastos Conscientes
                  </Heading>
                </VStack>
                <VStack spacing={2}>
                  <Text fontSize="lg" color="white" textAlign="center">
                    C??mo ahorrar cientos al mes y seguir comprando lo que
                    quieres.
                  </Text>
                  <Text fontSize="lg" color="white" textAlign="center">
                    El gasto consciente no consiste en recortar los gastos en
                    todo. Se trata, simplemente, de elegir las cosas que amas lo
                    suficiente como para gastar de forma extravagante, y luego
                    recortar el costo sin piedad en las cosas que no amas.
                  </Text>
                </VStack>
              </VStack>
            </Center>
          </Box>
          <Box position="relative" display="flex" justifyContent="center">
            <Box
              position="absolute"
              top={{ base: "-6rem", md: "-12rem", lg: "-10rem" }}
              display="flex"
              w="full"
              justifyContent="center"
              zIndex={100}
            >
              <Box width="208px" h={{ base: "200px", md: "400px" }}>
                <Image
                  src={proyectos}
                  placeholder="blur"
                  alt="proyectos"
                  layout="responsive"
                  width={208}
                  height={400}
                />
              </Box>

              <Box
                w="258px"
                h={{ base: "200px", md: "125px", lg: "450px" }}
                position="relative"
                top="-3rem"
              >
                <Image
                  src={home}
                  placeholder="blur"
                  layout="responsive"
                  alt="home"
                  width={208}
                  height={400}
                />
              </Box>

              <Box w="208px" h={{ base: "200px", md: "400px" }}>
                <Image
                  src={gastos}
                  placeholder="blur"
                  layout="responsive"
                  alt="gastos"
                  width={208}
                  height={400}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Container
          maxW={{ base: "2xl", lg: "1100px" }}
          paddingTop={{ base: "5rem", md: "12rem", xl: "17rem" }}
          paddingBottom="10rem"
        >
          <ContentSection title="">
            <ContentBox
              title={"Planear Conscientemente"}
              description={
                <Stack spacing={2}>
                  <Text fontSize="lg">
                    ??Cu??ntas veces has abierto la cartera, has hecho un gesto de
                    dolor y luego te has encogido de hombros y has dicho:
                    &quot;Supongo que me he gastado todo eso&quot;?
                  </Text>
                  <Text fontSize="lg">
                    ??Con qu?? frecuencia te sientes culpable por comprar algo
                    pero luego lo haces de todos modos?
                  </Text>
                </Stack>
              }
              image={proyectos}
              imageAlt="Vercel Logo"
              imagePosition="left"
            />

            <ContentBox
              title={"Gastos sin culpa"}
              description={
                <Stack spacing={2}>
                  <Text fontSize="lg">
                    Vamos a crear f??cilmente una nueva y sencilla forma de
                    gastar. Te ayudaremos a redirigirlo tu dinero hacia los
                    lugares que t?? elijas, como invertir, ahorrar e incluso
                    gastar m??s en las cosas que te gustan y menos en las que no.
                  </Text>
                </Stack>
              }
              image={budget}
              imageAlt="Vercel Logo"
              imagePosition="right"
            />
            <ContentBox
              title={"Esto no es un presupuesto"}
              description={
                <Stack spacing={2}>
                  <Text fontSize="lg">
                    Y si est??s pensando que vamos a crear un presupuesto, te
                    equivocas porque los estudios dicen que los presupuestos no
                    funcionan porque nadie quiere llevar la cuenta de sus
                    gastos.
                  </Text>
                </Stack>
              }
              image={gastos}
              imageAlt="Vercel Logo"
              imagePosition="left"
            />
          </ContentSection>

          <ContentSection title="">
            <Box
              backgroundColor="#1e5af9"
              w="90%"
              borderRadius="lg"
              padding={12}
            >
              <Wrap direction={["column", "row"]} spacing={6}>
                <WrapItem width="60%">
                  <VStack alignItems="left" spacing={6}>
                    <Heading color="white">
                      Inscr??bete a nuestro taller de finanzas y obt??n acceso
                      anticipado a nuestra app
                    </Heading>
                    <Text color="white" fontSize="lg">
                      Al inscribirte a nuestro taller de finanzas, adem??s de
                      poder asistir al taller, te daremos acceso prioritario a
                      nuestra aplicaci??n para que puedas usarla en tu celular,
                      tableta o computadora.
                    </Text>
                    <VStack spacing={2}>
                      <Text fontSize="sm" textColor="white">
                        Prox??mo taller: Mayo 2022
                      </Text>
                    </VStack>
                  </VStack>
                </WrapItem>
                <WrapItem>
                  <VStack alignItems="left">
                    <Input
                      variant="filled"
                      size="lg"
                      placeholder="mi@correo.com"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="lg"
                      color="white"
                      backgroundColor="purple.400"
                      onClick={() => handleSubscribe()}
                    >
                      Quiero ser parte
                    </Button>
                  </VStack>
                </WrapItem>
              </Wrap>
            </Box>
          </ContentSection>
        </Container>
      </main>
      <footer>
        <Box backgroundColor="#000f38" padding={12}>
          <Container>
            <Wrap
              direction={["column", "row"]}
              spacing={6}
              width="full"
              margin="auto"
            >
              <WrapItem>
                <Text textColor="white" textAlign="center">
                  Todos los derechos reservados 2022{" "}
                </Text>
              </WrapItem>
            </Wrap>
          </Container>
        </Box>
      </footer>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const data = 1;
  // Pass data to the page via props
  return { props: { data } };
}

export default Home;
