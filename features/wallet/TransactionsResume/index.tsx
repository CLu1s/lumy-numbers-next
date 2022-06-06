import { useSelector } from "react-redux";
import {
  Stack,
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import {
  getTransactionsFormatted,
  getStatus,
  getTotalSpent,
  getBalance,
} from "../selector";
import Screen from "../../../components/Screen";
import _groupBy from "lodash/groupBy";
import _sortBy from "lodash/sortBy";
import { LoadingStates } from "../../../types";
import Loading from "../../../components/Loading";
import { money } from "../../../utils";
import LineChart from "./LineChart";
import Cards from "./Cards";
import { DatesHandler } from "../../../types";
import Control from "./Control";
type Props = {
  state: DatesHandler;
  handleChangePeriod: ({ newDate, type }: { newDate: any; type: any }) => void;
};

const TransactionsResume = ({ state, handleChangePeriod }: Props) => {
  const transactions = useSelector(getTransactionsFormatted);
  const balance = useSelector(getBalance);
  const totalSpent = useSelector(getTotalSpent);
  const status = useSelector(getStatus);

  return (
    <Screen title="Resumen">
      <Control state={state} handleChangePeriod={handleChangePeriod} />
      {status !== LoadingStates.LOADING ? (
        <Stack direction={{ base: "column" }} width="full">
          <HStack spacing="10" height="50%">
            <VStack alignItems="flex-start">
              <Heading as="h2" size="2xl">
                {money(totalSpent)}
              </Heading>
              <Text fontSize="sm">Gastos totales del mes.</Text>
              <Divider />
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                Disponible {money(balance)}
              </Text>
            </VStack>
            <Box width="70%">
              <LineChart transactions={transactions} />
            </Box>
          </HStack>
          <Box width="full">
            <Cards />
          </Box>
        </Stack>
      ) : (
        <Loading />
      )}
    </Screen>
  );
};

export default TransactionsResume;
