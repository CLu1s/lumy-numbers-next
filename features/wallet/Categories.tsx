import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  getBalanceByCategories,
  getStatus,
} from "../../features/wallet/selector";
import StatCard from "../../components/StatCard";
import Loading from "../../components/Loading";

const Categories = () => {
  const items = useSelector(getBalanceByCategories);
  const status = useSelector(getStatus);
  return (
    <Stack spacing={4}>
      {status === "succeeded" ? (
        <Wrap>
          {items.map((item) => (
            <WrapItem
              minW="xs"
              width={{ base: "full", xl: "xs" }}
              key={item.id}
            >
              <StatCard number={item.balance} {...item} />
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default Categories;
