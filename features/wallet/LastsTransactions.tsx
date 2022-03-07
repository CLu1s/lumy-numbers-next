import {
  Heading,
  Text,
  Center,
  Stack,
  Box,
  HStack,
  VStack,
} from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import { money, date, icons } from "../../utils";
import { useSelector } from "react-redux";
import { getLastTransactions, getStatus } from "./selector";
import Loading from "../../components/Loading";
import TransactionMini from "../../components/TransactionMini";

export default function LastsTransactions() {
  const transactions = useSelector(getLastTransactions);

  const status = useSelector(getStatus);

  if (status === "idle") {
    return <Loading />;
  }

  return (
    <Stack spacing={2}>
      <TransactionMini transactions={transactions} editable />
    </Stack>
  );
}
