import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
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
  // Accordion,
  // AccordionItem,
  // AccordionButton,
  // AccordionPanel,
  // AccordionIcon,
} from "@chakra-ui/react";

type ContentBoxProps = {
  title: string;
  description: string | JSX.Element;
  image: string;
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
            backgroundColor="#1e5af9"
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
          <Text>{description}</Text>
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
  return (
    <>
      <Head>
        <title>Luminus Gasto Consiente</title>
        <meta
          name="description"
          content="Cómo ahorrar cientos al mes y seguir comprando lo que quieres"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box backgroundColor="#1e5af9" width="full">
          <Box width="full" paddingTop={8} paddingX={4}>
            <HStack m="auto" width="full" justifyContent="space-between">
              <Heading color="white">Luminus</Heading>
              <Box>
                <Button size="lg" color="#1e5af9">
                  Registrarse
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
                    Gastos Consientes
                  </Heading>
                </VStack>
                <VStack spacing={2}>
                  <Text fontSize="lg" color="white" textAlign="center">
                    Cómo ahorrar cientos al mes y seguir comprando lo que
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
            >
              <Box width="208px" h={{ base: "200px", md: "400px" }}>
                <Image
                  src="/images/proyectos.png"
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
                  src="/images/home.png"
                  layout="responsive"
                  alt="home"
                  width={208}
                  height={400}
                />
              </Box>

              <Box w="208px" h={{ base: "200px", md: "400px" }}>
                <Image
                  src="/images/gastos.png"
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
                    ¿Cuántas veces has abierto la cartera, has hecho un gesto de
                    dolor y luego te has encogido de hombros y has dicho:
                    &quot;Supongo que me he gastado todo eso&quot;?
                  </Text>
                  <Text fontSize="lg">
                    ¿Con qué frecuencia te sientes culpable por comprar algo
                    pero luego lo haces de todos modos?
                  </Text>
                </Stack>
              }
              image="/images/proyectos.png"
              imageAlt="Vercel Logo"
              imagePosition="left"
            />
            <ContentBox
              title={"Gastos sin culpa"}
              description={
                <Stack spacing={2}>
                  <Text fontSize="lg">
                    Vamos a crear fácilmente una nueva y sencilla forma de
                    gastar. Te ayudaremos a redirigirlo tu dinero hacia los
                    lugares que tú elijas, como invertir, ahorrar e incluso
                    gastar más en las cosas que te gustan y menos en las que no.
                  </Text>
                </Stack>
              }
              image="/images/budget.png"
              imageAlt="Vercel Logo"
              imagePosition="right"
            />
            <ContentBox
              title={"Esto no es un presupuesto"}
              description={
                <Stack spacing={2}>
                  <Text fontSize="lg">
                    Y si estás pensando que vamos a crear un presupuesto, te
                    equivocas porque los estudios dicen que los presupuestos no
                    funcionan porque nadie quiere llevar la cuenta de sus
                    gastos.
                  </Text>
                </Stack>
              }
              image="/images/gastos.png"
              imageAlt="Vercel Logo"
              imagePosition="left"
            />
          </ContentSection>
          {/* <ContentSection title="FAQ's">
            <Box marginBottom="10rem">
              <Accordion defaultIndex={0}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Section 1 title
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Section 2 title
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </ContentSection> */}
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
                      Subscribete a nuestro programa Beta
                    </Heading>
                    <Text color="white" fontSize="lg">
                      Recibe notificaciones de nuestras novedades y promociones
                    </Text>
                  </VStack>
                </WrapItem>
                <WrapItem>
                  <VStack alignItems="left">
                    <Input
                      variant="filled"
                      size="lg"
                      placeholder="mi@correo.com"
                      type="email"
                    />
                    <Button
                      variant="outline"
                      size="lg"
                      color="white"
                      colorScheme="blue"
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
    </>
  );
};

export default Home;
