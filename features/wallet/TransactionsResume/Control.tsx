import { useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import isSameMonth from "date-fns/isSameMonth";
import { Stack, Button, VStack, HStack, Heading, Box } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { DatesHandler } from "../../../types";
import { date } from "../../../utils";
import { getPeriod } from "../../../features/wallet/selector";
import { getIsMenuCollapsed } from "../../system/selector";

const initDate = new Date();

type Props = {
  state: DatesHandler;
  handleChangePeriod: ({ newDate, type }: { newDate: any; type: any }) => void;
};

const Control = ({ state, handleChangePeriod }: Props) => {
  const period = useSelector(getPeriod);
  const sameMonth = isSameMonth(period, initDate);
  const isCollapsed = useSelector(getIsMenuCollapsed);

  return (
    <Stack w="full" marginBottom="4" spacing={4} direction={{ base: "column" }}>
      <HStack spacing={6} justifyContent={{ base: "center", md: "flex-start" }}>
        <Button
          onClick={() =>
            handleChangePeriod({ newDate: state.previous, type: "PREVIOUS" })
          }
          backgroundColor="purple.400"
          color="white"
          size="sm"
        >
          <ChevronLeftIcon fontSize="2xl" />
        </Button>
        <Heading as="h1" size="lg" mb={4} textTransform="capitalize">
          {`${date(state.current, "MMMM")}`}
        </Heading>

        <Button
          backgroundColor="purple.400"
          color="white"
          onClick={() =>
            handleChangePeriod({ newDate: state.next, type: "NEXT" })
          }
          size="sm"
          disabled={!state.showNext}
        >
          <ChevronRightIcon fontSize="2xl" />
        </Button>
      </HStack>
      {!sameMonth && (
        <Button
          onClick={() =>
            handleChangePeriod({ newDate: initDate, type: "CURRENT" })
          }
          backgroundColor="purple.400"
          color="white"
          maxWidth={isCollapsed ? "100%" : "30%"}
          size="sm"
        >
          Ver mes actual
        </Button>
      )}
    </Stack>
  );
};

export default Control;
