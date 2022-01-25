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
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";

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
        <Heading as="h2" size="xl" color="purple.600">
          Resumen
        </Heading>
        {!loading ? (
          <StatGroup>
            <Stat>
              <StatLabel>Disponible</StatLabel>
              <StatNumber>
                {fm.from(income - spent, {
                  symbol: "$",
                })}
              </StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Presupuestado</StatLabel>
              <StatNumber>
                {fm.from(income, {
                  symbol: "$",
                })}
              </StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
              </StatHelpText>
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
