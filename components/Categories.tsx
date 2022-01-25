import Screen from "./Screen";
import {
  Stack,
  HStack,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  CircularProgress,
  CircularProgressLabel,
  Center,
  Square,
} from "@chakra-ui/react";
import { HiOutlineHome } from "react-icons/hi";
import money from "../utils/money";

const Categories = () => {
  return (
    <Stack spacing={4}>
      <Heading as="h2" size="md" fontWeight="600">
        Categorías
      </Heading>
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
            <HiOutlineHome />
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
            <HiOutlineHome />
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
  );
};

export default Categories;
