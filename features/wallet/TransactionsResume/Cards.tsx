import { useMemo } from "react";
import { Wrap, WrapItem, Divider, Square } from "@chakra-ui/react";
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
        <WrapItem key={total.id} w={{ base: "40%", lg: "20%" }}>
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
            helpText="Gastado"
          />
          <Divider
            orientation="vertical"
            marginLeft={[0, 2]}
            display={["none", "block"]}
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
      padding={[5, 8]}
      justifyItems="center"
    >
      {stats.length > 0 ? stats : <NoRegisters />}
    </Wrap>
  );
};

export default Cards;
