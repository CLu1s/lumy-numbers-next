import { useState } from "react";
import { Switch, VStack, HStack } from "@chakra-ui/react";
import Screen from "../../components/Screen";
import Categories from "./Categories";

const CategoriesDashboard = () => {
  const [showAll, setShowAll] = useState(false);
  return (
    <Screen
      title="Categorías"
      description="Cada categoría muestra el total disponible en tu presupuesto con la cantidad y porcentaje que le queda."
    >
      <VStack spacing={4}>
        <HStack width="full" justifyContent="flex-end">
          <label htmlFor="email-alerts">Mostrar todas las categorías</label>
          <Switch id="email-alerts" onChange={() => setShowAll(!showAll)} />
        </HStack>
        <Categories showAll={showAll} />
      </VStack>
    </Screen>
  );
};

export default CategoriesDashboard;
