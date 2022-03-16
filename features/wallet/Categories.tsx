import { useEffect, useState } from "react";
import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  getBalanceByCategories,
  getStatus,
} from "../../features/wallet/selector";
import StatCard from "../../components/StatCard";
import Loading from "../../components/Loading";

type Props = {
  showAll?: boolean;
  setShowSwitch: (showAll: boolean) => void;
};

const Categories = ({ showAll,setShowSwitch }: Props) => {
  const items = useSelector(getBalanceByCategories);
  const status = useSelector(getStatus);
  const [itemsToShow, setItemsToShow] = useState(items);
  useEffect(() => {
    if (!showAll) {
      const itemsToShow = items.filter((item) => item.balance > 1 || item.balance < -1);
      setShowSwitch(itemsToShow.length < items.length);
      setItemsToShow(itemsToShow);
    } else {
      setItemsToShow(items);
    }
  }, [items, setShowSwitch, showAll]);
  return (
    <Stack spacing={4}>
      {status === "succeeded" ? (
        <Wrap>
          {itemsToShow.map((item) => (
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
