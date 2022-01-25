import { useState } from "react";
import { FormatMoney } from "format-money-js";
import { Heading } from "@chakra-ui/react";
import Screen from "./Screen";
import RecordExpense from "./RecordExpense";
import { Spinner } from "@chakra-ui/react";
import { useDisclosure, Box } from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from "@chakra-ui/react";
import { Button, Center } from "@chakra-ui/react";

const fm = new FormatMoney({
  decimals: 2,
});

const BudgetCard = () => {
  const income = 500;
  const spent = 300;
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <RecordExpense isOpen={isOpen} onClose={onClose} />
      <Screen>
        <Heading as="h2" size="md" fontWeight="600">
          Presupuesto del mes
        </Heading>
        {!loading ? (
          <StatGroup>
            <Stat>
              <StatLabel>Disponible</StatLabel>
              <StatNumber fontSize="6xl" fontWeight="700" color="purple.600">
                {fm.from(income - spent, {
                  symbol: "$",
                })}
              </StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </StatGroup>
        ) : (
          <Spinner />
        )}
        <Box mt="4">
          <Center w="100%" color="white">
            <Button onClick={onOpen} colorScheme="blue" variant="outline">
              Registrar Gasto
            </Button>
          </Center>
        </Box>
      </Screen>
    </>
  );
};

export default BudgetCard;
