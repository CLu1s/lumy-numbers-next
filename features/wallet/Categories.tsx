import { Stack, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getBalanceByCategories } from "../../features/wallet/selector";
import StatCard from "../../components/StatCard";

const Categories = () => {
  const items = useSelector(getBalanceByCategories);

  return (
    <Stack spacing={4}>
      <Heading as="h2" size="md" fontWeight="600">
        Categorías
      </Heading>
      <Wrap>
        {items.map((item) => (
          <WrapItem minW="xs" width={{base:"full", xl:"xs"}} key={item.id}>
            <StatCard number={item.balance} {...item} />
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  );
};

export default Categories;
