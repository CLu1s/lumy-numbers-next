import { useState } from "react";
import Screen from "../../components/Screen";
import RecordExpense from "./RecordExpense";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useDisclosure,
  Box,
  Heading,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import money from "../../utils/money";

type Props = {
  balance: number;
};

const BudgetCard = ({ balance }: Props) => {
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
          <Stat>
            <StatLabel>Disponible</StatLabel>
            <StatNumber
              fontSize={["5xl", "6xl"]}
              fontWeight="700"
              color="purple.600"
            >
              {money(balance)}
            </StatNumber>
            <StatHelpText textTransform="capitalize">
              {format(new Date(), "LLLL-YYY", {
                locale: es,
              })}
            </StatHelpText>
          </Stat>
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
