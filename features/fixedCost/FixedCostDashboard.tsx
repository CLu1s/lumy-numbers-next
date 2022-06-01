import Link from "next/link";
import {
  Stack,
  Link as ChakraLink,
  chakra,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import { useSelector, useDispatch } from "react-redux";
import Screen from "../../components/Screen";
import ItemsList from "./ItemsList";
import { getPendingItems, getPendingAmount } from "./selector";
import { money } from "../../utils";
import useGetFixedCosts from "../../hooks/useGetFixedCosts";
import usePayFixedCost from "./hooks/usePayFixedCost";

const FixedCostDashboard = () => {
  useGetFixedCosts();
  const managePaid = usePayFixedCost();
  const items = useSelector(getPendingItems);
  const amount = useSelector(getPendingAmount);

  const color = useColorModeValue("teal", "teal.200");

  const orderItmes = _orderBy(items, ["dueDay"]).slice(0, 6);

  return (
    <Screen title="Gastos Pendientes">
      <Stack spacing={4}>
        <Text fontSize="md">
          Cantidad necesaria para pagar los gastos pendientes:
          <chakra.span fontWeight="bold" fontSize="xl">
            {" "}
            {money(amount)}
          </chakra.span>
        </Text>
        <Heading size="sm">Próximos a Pagar</Heading>
        <ItemsList items={orderItmes} managePaid={managePaid} />
        <Link href="/app/costos-fijos" passHref>
          <ChakraLink color={color}>Ver Todos los Gastos</ChakraLink>
        </Link>
      </Stack>
    </Screen>
  );
};

export default FixedCostDashboard;
