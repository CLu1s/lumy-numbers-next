import { useMemo } from "react";
import { SimpleGrid, Square, VStack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getBalanceByCategories } from "../selector";
import { icons } from "../../../utils";
import NoRegisters from "../../../components/NoRegisters";
import Stats from "../../../components/Stats";

type Props = {
  filter: string[];
};

const Cards = ({ filter }: Props) => {
  const items = useSelector(getBalanceByCategories);
  const filterItems = useMemo(() => {
    const i = items.filter((item) => filter.includes(item.id));
    if (i.length === 0) return items;
    return i;
  }, [items, filter]);

  const stats = useMemo(
    () =>
      filterItems.map((total) => (
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
    [filterItems]
  );

  const setColumns = (defaultNumber: number) => {
    return filterItems.length >= defaultNumber
      ? defaultNumber
      : filterItems.length;
  };

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
        columns={[setColumns(2), setColumns(4), setColumns(4), setColumns(5)]}
        spacing={4}
      >
        {stats.length > 0 ? stats : <NoRegisters />}
      </SimpleGrid>
    </VStack>
  );
};

export default Cards;
