import { useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import isSameMonth from "date-fns/isSameMonth";
import { Stack, Button, VStack, HStack, Heading } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { DatesHandler } from "../../../types";
import { date } from "../../../utils";
import { getPeriod } from "../../../features/wallet/selector";

const initDate = new Date();

type Props = {
  state: DatesHandler;
  handleChangePeriod: ({ newDate, type }: { newDate: any; type: any }) => void;
};

const Control = ({ state, handleChangePeriod }: Props) => {
  const period = useSelector(getPeriod);
  const sameMonth = isSameMonth(period, initDate);

  return (
    <>
      <Heading as="h1" size="lg" mb={4} textTransform="capitalize">
        {`${date(state.current, "MMMM")}`}
      </Heading>
      <HStack spacing={6} marginBottom="4">
        <Button
          onClick={() =>
            handleChangePeriod({ newDate: state.previous, type: "PREVIOUS" })
          }
          backgroundColor="purple.400"
          color="white"
        >
          <ChevronLeftIcon fontSize="2xl" />
        </Button>
        {state.showNext && (
          <Button
            backgroundColor="purple.400"
            color="white"
            onClick={() =>
              handleChangePeriod({ newDate: state.next, type: "NEXT" })
            }
          >
            <ChevronRightIcon fontSize="2xl" />
          </Button>
        )}
        {!sameMonth && (
          <Button
            onClick={() =>
              handleChangePeriod({ newDate: initDate, type: "CURRENT" })
            }
            backgroundColor="purple.400"
            color="white"
          >
            Ver mes actual
          </Button>
        )}
      </HStack>
    </>
  );
};

export default Control;
