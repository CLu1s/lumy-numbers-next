import { useMemo } from "react";
import { Wrap, WrapItem, Square } from "@chakra-ui/react";
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
        <WrapItem
          key={total.id}
          maxW={{ md: "200px", lg: "286", xl: "181px" }}
          w={{ base: "100%", md: "30%", lg: "31%", xl: "18%" }}
        >
          <Stats
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
        </WrapItem>
      )),
    [items]
  );
  return (
    <Wrap
      borderRadius="lg"
      borderColor="gray.200"
      borderWidth="thin"
      padding={{ base: 5, xl: 8 }}
      width="full"
      spacing={4}
    >
      {stats.length > 0 ? stats : <NoRegisters />}
    </Wrap>
  );
};

export default Cards;
