import { useMemo, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Stack,
  Wrap,
  WrapItem,
  Link as ChakraLink,
  chakra,
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Screen from "../../components/Screen";
import ItemsList from "./ItemsList";
import { getPendingItems, getPendingAmount, getCategoryID } from "./selector";
import { getBucketID } from "../bucket/selector";
import { updateFixedCost } from "./fixedCostSlice";
import { addNewTransaction } from "../wallet/walletSlice";
import { money } from "../../utils";

const FixedCostDashboard = () => {
  const items = useSelector(getPendingItems);
  const dispatch = useDispatch();
  const bucketID = useSelector(getBucketID);
  const categoryID = useSelector(getCategoryID);
  const amount = useSelector(getPendingAmount);

  const managePaid = (data: any) => {
    const { createdAt, updatedAt, ...input } = data;
    const { type, status, ...trans } = input;
    dispatch(updateFixedCost({ ...data, status: "paid" }));
    dispatch(
      addNewTransaction({
        ...trans,
        bucketID,
        categoryID,
        date: new Date().toISOString(),
      })
    );
  };
  return (
    <Screen title="Gastos Pendientes">
      <Stack spacing={4}>
        <Text  fontSize='md'>
          Cantidad necesaria para pagar los gastos pendientes:
          <chakra.span fontWeight="bold"  fontSize='xl'> {money(amount)}</chakra.span>
        </Text>
        <ItemsList items={items} managePaid={managePaid} />
        <Link href="/app/costos-fijos" passHref>
          <ChakraLink color="teal.500">Ver Todos los Gastos</ChakraLink>
        </Link>
      </Stack>
    </Screen>
  );
};

export default FixedCostDashboard;
