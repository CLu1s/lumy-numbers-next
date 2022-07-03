import { useRef, useEffect } from "react";
import {
  Text,
  chakra,
  Stack,
  Box,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import autoAnimate from "@formkit/auto-animate";
import _orderBy from "lodash/orderBy";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { money, date, icons } from "../utils";
import Noregisters from "./NoRegisters";
import { Transaction, Movement } from "../types";

type DataDisplay = {
  id: string;
  category?: {
    color: string;
    icon: string;
  };
  amount: number;
  description: string;
  date: string;
};

type Props = {
  transactions: Transaction[] | Movement[];
  editable?: boolean;
  onEdit?: (item: object) => void;
  onDelete?: (id: string) => void;
};

export default function TransactionMini({
  transactions,
  onEdit,
  onDelete,
  editable = false,
}: Props) {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const returnColor = (item: any) => {
    if (item.category) {
      return item.category.color;
    }
    if (item.type === "ingress") {
      return "green.500";
    }
    return "red.500";
  };
  const returnIcon = (item: any) => {
    if (item.category) {
      return item.category.icon;
    }
    if (item.type === "ingress") {
      return "SiAddthis";
    }
    return "FaMinusSquare";
  };

  const renderCells = transactions.map((item) => (
    <HStack key={item.id} spacing="4" alignItems="flex-start">
      <VStack color={returnColor(item)} fontSize="2xl" spacing={1}>
        {icons(returnIcon(item))}
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
    <Stack spacing={1} ref={parent}>
      {renderCells.length > 0 ? renderCells : <Noregisters />}
    </Stack>
  );
}
