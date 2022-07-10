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
import { LoadingStates, Transaction } from "../../../types";
import Loading from "../../../components/Loading";
import { money } from "../../../utils";
import LineChart from "./LineChart";
import Cards from "./Cards";
import { DatesHandler } from "../../../types";
import Control from "./Control";
import { getIsMenuCollapsed } from "../../system/selector";
type Props = {
  state: DatesHandler;
  transactions: Transaction[];
  handleChangePeriod: ({ newDate, type }: { newDate: any; type: any }) => void;
};

const TransactionsResume = ({
  state,
  handleChangePeriod,
  transactions,
}: Props) => {
  const balance = useSelector(getBalance);
  const totalSpent = useSelector(getTotalSpent);
  const status = useSelector(getStatus);
  const isCollapsed = useSelector(getIsMenuCollapsed);

  return (
    <Screen title="Resumen">
      {status === LoadingStates.IDLE ? (
        <Loading />
      ) : (
        <Stack
          direction={{ base: "column" }}
          w={isCollapsed ? "auto" : "full"}
          spacing={6}
        >
          <Stack spacing="10" height="50%" direction={["row", "row", "row"]}>
            <VStack alignItems="flex-start">
              <Control state={state} handleChangePeriod={handleChangePeriod} />
              <Heading as="h2" size="2xl">
                {money(totalSpent)}
              </Heading>
              <Text fontSize="sm">Gastos totales del mes.</Text>
              <Divider />
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                Disponible {money(balance)}
              </Text>
            </VStack>

            <Box w={isCollapsed ? "70%" : "70%"} display={["none", "block"]}>
              <LineChart transactions={transactions} />
            </Box>
          </Stack>
          <Box width="full">
            <Cards />
          </Box>
        </Stack>
      )}
    </Screen>
  );
};

export default TransactionsResume;
