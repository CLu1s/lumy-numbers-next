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

export default function LastsTransactions() {
  const transactions = useSelector(getLastTransactions);

  const status = useSelector(getStatus);

  const renderCells = transactions.map((item) => (
    <HStack key={item.id} spacing="4" alignItems="flex-start">
      <VStack color={item.category?.color} fontSize="2xl" spacing={0}>
        {icons(item.category?.icon)}
        <Box height="10" width="2px" backgroundColor="gray.200" />
      </VStack>
      <Stack spacing={0}>
        <Text fontWeight="bold">{`${money(item.amount)}, ${
          item.description
        }`}</Text>
        <Text textColor="gray.500" textTransform="capitalize">
          {date(new Date(item.date), "dd - LLLL")}
        </Text>
      </Stack>
    </HStack>
  ));

  if (status === "idle") {
    return <Loading />;
  }

  return (
    <Stack spacing={2}>
      {renderCells.length > 0 ? (
        renderCells
      ) : (
        <Center>
          <Heading as="h6" size="xs" textColor="gray.400">
            No hay registros
          </Heading>
        </Center>
      )}
    </Stack>
  );
}
