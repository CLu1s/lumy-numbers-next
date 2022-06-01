import {
  Text,
  chakra,
  Stack,
  Box,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { money, date, icons } from "../utils";
import { Transaction } from "../types";
import Noregisters from "./NoRegisters";

type Props = {
  transactions: Transaction[];
  editable?: boolean;
  onEdit?: (item: Transaction) => void;
  onDelete?: (id: string) => void;
};

export default function TransactionMini({
  transactions,
  onEdit,
  onDelete,
  editable = false,
}: Props) {
  const renderCells = transactions.map((item) => (
    <HStack key={item.id} spacing="4" alignItems="flex-start">
      <VStack color={item.category?.color} fontSize="2xl" spacing={1}>
        {icons(item.category?.icon)}
        <Box height="10" width="2px" backgroundColor="gray.200" />
      </VStack>
      <Stack spacing={0} width="full">
        <HStack justifyContent="space-between">
          <Text fontWeight="medium">
            <chakra.span fontWeight="semibold">
              {money(item.amount)},{" "}
            </chakra.span>
            {item.description}{" "}
          </Text>

          {editable && (
            <HStack alignContent="space-between">
              <Button onClick={() => onEdit(item)}>
                <FiEdit />
              </Button>
              <Button
                onClick={() => {
                  onDelete(item.id);
                }}
                color="red.500"
              >
                <FiTrash2 />
              </Button>
            </HStack>
          )}
        </HStack>
        <Text textColor="gray.500" textTransform="capitalize">
          {date(new Date(item.date), "dd - LLLL")}
        </Text>
      </Stack>
    </HStack>
  ));

  return (
    <Stack spacing={1}>
      {renderCells.length > 0 ? renderCells : <Noregisters />}
    </Stack>
  );
}
