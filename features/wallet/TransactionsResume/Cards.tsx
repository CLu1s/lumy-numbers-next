import { useMemo } from "react";
import {
  SimpleGrid,
  Wrap,
  WrapItem,
  Square,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getBalanceByCategories } from "../selector";
import { icons } from "../../../utils";
import NoRegisters from "../../../components/NoRegisters";
import Stats from "../../../components/Stats";

const Cards = () => {
  const items = useSelector(getBalanceByCategories);

  const stats = useMemo(
    () =>
      items.map((total) => (
        <Stats
          key={total.id}
          icon={
            <Square
              bg={total.color}
              color={"white"}
              borderRadius={"lg"}
              padding={1}
            >
              {icons(total.icon)}
            </Square>
          }
          name={total.name || "no cat"}
          amount={total.spent}
          compareAmount={total.balance}
        />
      )),
    [items]
  );
  return (
    <VStack spacing={2} alignItems="flex-start">
      <Text fontSize="sm" fontWeight="medium">
        Resumen de lo gastado sobre lo disponible a la fecha.
      </Text>
      <SimpleGrid
        borderRadius="lg"
        borderColor="gray.200"
        borderWidth="thin"
        padding={{ base: 5, xl: 8 }}
        width="full"
        columns={[2, 4, 4, 5]}
        spacing={4}
      >
        {stats.length > 0 ? stats : <NoRegisters />}
      </SimpleGrid>
    </VStack>
  );
};

export default Cards;
