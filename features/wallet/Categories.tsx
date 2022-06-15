import { useState, useRef, useEffect } from "react";
import { Stack, SimpleGrid, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import autoAnimate from "@formkit/auto-animate";
import {
  getBalanceByCategories,
  getStatus,
} from "../../features/wallet/selector";
import StatCard from "../../components/StatCard";
import Loading from "../../components/Loading";
import { LoadingStates } from "../../types";

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
    <Stack spacing={4} width="full">
      {status === LoadingStates.IDLE ? (
        <Loading />
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 2 }}
          spacing={4}
          ref={parent}
        >
          {renderItemsToShow}
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default Categories;
