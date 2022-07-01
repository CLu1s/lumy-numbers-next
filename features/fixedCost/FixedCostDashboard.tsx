import { Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Screen from "../../components/Screen";
import ItemsList from "./ItemsList";
import { getPendingItems, getPendingAmount } from "./selector";
import useGetFixedCosts from "../../hooks/useGetFixedCosts";
import usePayFixedCost from "./hooks/usePayFixedCost";
import Button from "../../components/Button";
import Stats from "../../components/Stats";

const FixedCostDashboard = () => {
  useGetFixedCosts();
  const managePaid = usePayFixedCost();
  const items = useSelector(getPendingItems);
  const amount = useSelector(getPendingAmount);

  const orderItmes = items.slice(0, 3);

  return (
    <Screen title="Próximos Pagos">
      <Stack spacing={4}>
        <Stats name={"Total de pagos pendientes"} amount={amount} />
        <ItemsList items={orderItmes} managePaid={managePaid} />
        <Button to="/app/costos-fijos">
          <Text>Ver Todos los Gastos</Text>
        </Button>
      </Stack>
    </Screen>
  );
};

export default FixedCostDashboard;
