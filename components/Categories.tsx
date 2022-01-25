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
} from "@chakra-ui/react";
import { HiOutlineHome } from "react-icons/hi";
import { BiHappyBeaming } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import money from "../utils/money";

const Categories = () => {
  return (
    <Stack spacing={4} width='full'>
      <Heading as="h2" size="md" fontWeight="600">
        Categorías
      </Heading>
      <Stack spacing={4} direction={["column", "row"]}>
        <Screen>
          <HStack spacing={4}>
            <Square size="48px" bg="green.500" color="white" borderRadius="md">
              <HiOutlineHome />
            </Square>
            <Stat>
              <StatLabel>Gastos Fijos</StatLabel>
              <StatNumber>{money(300)}</StatNumber>
            </Stat>
            <CircularProgress value={40} color="green.400">
              <CircularProgressLabel>40%</CircularProgressLabel>
            </CircularProgress>
          </HStack>
        </Screen>
        <Screen>
          <HStack spacing={4}>
            <Square size="48px" bg="red.500" color="white" borderRadius="md">
              <AiOutlineStock />
            </Square>
            <Stat>
              <StatLabel>Ahorro e Inversión</StatLabel>
              <StatNumber>{money(8000)}</StatNumber>
            </Stat>
            <CircularProgress value={80} color="red.400">
              <CircularProgressLabel>80%</CircularProgressLabel>
            </CircularProgress>
          </HStack>
        </Screen>
        <Screen>
          <HStack spacing={4}>
            <Square size="48px" bg="blue.500" color="white" borderRadius="md">
              <BiHappyBeaming />
            </Square>
            <Stat>
              <StatLabel>Dinero Para Gastar sin Culpa</StatLabel>
              <StatNumber>{money(12000)}</StatNumber>
            </Stat>
            <CircularProgress value={10} color="blue.400">
              <CircularProgressLabel>10%</CircularProgressLabel>
            </CircularProgress>
          </HStack>
        </Screen>
      </Stack>
    </Stack>
  );
};

export default Categories;
