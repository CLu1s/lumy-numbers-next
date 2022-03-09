import { useMemo, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Stack, Wrap, WrapItem, Link as ChakraLink } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Screen from "../../components/Screen";
import ItemsList from "./ItemsList";
import { getPendingItems, getCategoryID } from "./selector";
import { getBucketID } from "../bucket/selector";
import { updateFixedCost } from "./fixedCostSlice";
import { addNewTransaction } from "../wallet/walletSlice";

const FixedCostDashboard = () => {
  const items = useSelector(getPendingItems);
  const dispatch = useDispatch();
  const bucketID = useSelector(getBucketID);
  const categoryID = useSelector(getCategoryID);

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
      <ItemsList items={items} managePaid={managePaid} />
      <Link href="/costos-fijos" passHref>
        <ChakraLink color="teal.500">Ver todo</ChakraLink>
      </Link>
    </Screen>
  );
};

export default FixedCostDashboard;
