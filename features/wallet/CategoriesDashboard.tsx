import { useState } from "react";
import { Switch, VStack, HStack } from "@chakra-ui/react";
import Screen from "../../components/Screen";
import Categories from "./Categories";
import useGetCategories from "../../hooks/useGetCategories";

const CategoriesDashboard = () => {
  useGetCategories();
  const [showAll, setShowAll] = useState(false);
  const [showSwitch, setShowSwitch] = useState(false);
  return (
    <Screen
      title="Categorías"
      description="Cada categoría muestra el total disponible en tu plan de gastos con la cantidad y porcentaje que le queda."
    >
      <VStack spacing={4} w="full" alignItems="flex-start">
        {showSwitch && (
          <HStack width="full" justifyContent="flex-end">
            <label htmlFor="email-alerts">Mostrar todas las categorías</label>
            <Switch id="email-alerts" onChange={() => setShowAll(!showAll)} />
          </HStack>
        )}
        <Categories showAll={showAll} setShowSwitch={setShowSwitch} />
      </VStack>
    </Screen>
  );
};

export default CategoriesDashboard;
