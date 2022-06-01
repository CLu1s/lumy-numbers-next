import {
  Stack,
  chakra,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import { useSelector } from "react-redux";
import Screen from "../../components/Screen";
import ItemsList from "./ItemsList";
import { getPendingItems, getPendingAmount } from "./selector";
import { money } from "../../utils";
import useGetFixedCosts from "../../hooks/useGetFixedCosts";
import usePayFixedCost from "./hooks/usePayFixedCost";
import Button from "../../components/Button";

const FixedCostDashboard = () => {
  useGetFixedCosts();
  const managePaid = usePayFixedCost();
  const items = useSelector(getPendingItems);
  const amount = useSelector(getPendingAmount);

  const color = useColorModeValue("blue", "cyan.200");

  const orderItmes = _orderBy(items, ["dueDay"]).slice(0, 6);

  return (
    <Screen title="Próximos Pagos">
      <Stack spacing={4}>
        <Text fontSize="md">
          Cantidad necesaria para pagar los próximos pagos:
          <chakra.span fontWeight="bold" fontSize="xl">
            {" "}
            {money(amount)}
          </chakra.span>
        </Text>
        <Heading size="sm">Próximos a Pagar</Heading>
        <ItemsList items={orderItmes} managePaid={managePaid} />
        <Button to="/app/costos-fijos">
          <Text>Ver Todos los Gastos</Text>
        </Button>
      </Stack>
    </Screen>
  );
};

export default FixedCostDashboard;
