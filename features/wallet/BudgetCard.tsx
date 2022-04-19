import RecordExpense from "./RecordExpense";
import { useDisclosure, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import HeroStatCard, { HeroStatFooter } from "../../components/HeroStatCard";
import { date } from "../../utils";
import { getBalance, getPeriod, getStatus } from "./selector";
import isSameMonth from "date-fns/isSameMonth";
import { LoadingStates } from "../../types";

const BudgetCard = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const balance = useSelector(getBalance);
  const status = useSelector(getStatus);
  const period = useSelector(getPeriod);
  const currentDate = new Date();

  const sameMonth = isSameMonth(period, currentDate);
  return (
    <>
      <RecordExpense isOpen={isOpen} onClose={onClose} />
      <HeroStatCard
        title="Plan de gastos del mes"
        description="Esta es la cantidad todal que resta de tu plande gastos"
        statLabel="Disponible"
        helpText={date(new Date(), "LLLL-YYY")}
        amount={balance}
        loading={status !== LoadingStates.SUCCEEDED}
      >
        <HeroStatFooter>
          {sameMonth && (
            <Button
              onClick={onOpen}
              disabled={status !== LoadingStates.SUCCEEDED}
              colorScheme="blue"
            >
              Registrar Gasto
            </Button>
          )}
        </HeroStatFooter>
      </HeroStatCard>
    </>
  );
};

export default BudgetCard;
