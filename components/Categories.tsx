import { useMemo } from "react";
import Screen from "./Screen";
import {
  Stack,
  HStack,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  CircularProgress,
  CircularProgressLabel,
  Square,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { HiOutlineHome } from "react-icons/hi";
import { BiHappyBeaming } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import money from "../utils/money";

const Categories = () => {
  const items = useMemo(
    () => [
      {
        id: 1,
        icon: <HiOutlineHome />,
        label: "Gastos Fijos",
        number:  money(Math.random() * 100000),
        progress: 40,
        color: "green.500",
      },
      {
        id: 12,
        icon: <AiOutlineStock />,
        label: "Ahorro e Inversión",
        number: money(Math.random() * 100000),
        progress: 40,
        color: "purple.500",
      },
      {
        id: 3,
        icon: <BiHappyBeaming />,
        label: "Gastos sin Culpa",
        number:  money(Math.random() * 100000),
        progress: 40,
        color: "blue.500",
      },
    ],
    []
  );

  return (
    <Stack spacing={4}>
      <Heading as="h2" size="md" fontWeight="600">
        Categorías
      </Heading>
      <Wrap>
        {items.map((item) => (
          <WrapItem minW="xs" width={["full","xs"]} key={item.id}>
            <Screen>
              <HStack spacing={4}>
                <Square
                  size="48px"
                  bg={item.color}
                  color="white"
                  borderRadius="md"
                >
                  {item.icon}
                </Square>
                <Stat>
                  <StatLabel>{item.label}</StatLabel>
                  <StatNumber>{item.number}</StatNumber>
                </Stat>
                <CircularProgress value={item.progress} color={item.color}>
                  <CircularProgressLabel>{item.progress}%</CircularProgressLabel>
                </CircularProgress>
              </HStack>
            </Screen>
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  );
};

export default Categories;
