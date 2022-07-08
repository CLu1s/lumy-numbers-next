import { useState, useRef, useEffect } from "react";
import { Stack, Skeleton, SimpleGrid, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import autoAnimate from "@formkit/auto-animate";
import {
  getBalanceByCategories,
  getStatus,
} from "../../features/wallet/selector";
import StatCard from "../../components/StatCard";
import { LoadingStates } from "../../types";
import ChakraBox from "../../components/ChakraBox";

type Props = {
  showAll?: boolean;
  setShowSwitch: (showAll: boolean) => void;
};

const Categories = ({ showAll, setShowSwitch }: Props) => {
  const items = useSelector(getBalanceByCategories);
  const status = useSelector(getStatus);
  const [itemsToShow, setItemsToShow] = useState(items);
  const parent = useRef(null);
  useEffect(() => {
    if (!showAll) {
      const itemsToShow = items.filter(
        (item) => item.balance > 1 || item.balance < -1
      );
      setShowSwitch(itemsToShow.length < items.length);
      setItemsToShow(itemsToShow);
    } else {
      setItemsToShow(items);
    }
  }, [items, setShowSwitch, showAll]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const renderItemsToShow = itemsToShow.map((item) => (
    <Box minW="218px" width={{ base: "full" }} key={item.id} maxH="128px">
      <StatCard
        number={item.balance}
        {...item}
        helpText="Disponible"
        loading={status === LoadingStates.LOADING}
      />
    </Box>
  ));
  return (
    <ChakraBox layout w="full">
      <SimpleGrid columns={[1, 2, 3]} spacing={4} ref={parent}>
        {status === LoadingStates.IDLE ? (
          <>
            <Skeleton borderRadius="md" height="128px" />
            <Skeleton borderRadius="md" height="128px" />
            <Skeleton borderRadius="md" height="128px" />
            <Skeleton borderRadius="md" height="128px" />
          </>
        ) : (
          renderItemsToShow
        )}
      </SimpleGrid>
    </ChakraBox>
  );
};

export default Categories;
