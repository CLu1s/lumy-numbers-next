import { useMemo } from "react";
import { SimpleGrid, Wrap, WrapItem, Square } from "@chakra-ui/react";
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
          helpText="Gastado / Disponible"
        />
      )),
    [items]
  );
  return (
    <SimpleGrid
      borderRadius="lg"
      borderColor="gray.200"
      borderWidth="thin"
      padding={{ base: 5, xl: 8 }}
      width="full"
      columns={{ base: 2, md: 3, xl: 4 }}
      spacing={4}
    >
      {stats.length > 0 ? stats : <NoRegisters />}
    </SimpleGrid>
  );
};

export default Cards;
