import { useState, useEffect } from "react";
import RecordExpense from "./RecordExpense";
import { useDisclosure, Button } from "@chakra-ui/react";
import HeroStatCard, { HeroStatFooter } from "../../components/HeroStatCard";
import { date } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { getStatus } from "./selector";
import { fetchTransactions } from "./walletSlice";

type Props = {
  balance: number;
};

const BudgetCard = ({ balance }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions());
    }
  }, [dispatch, status]);
  return (
    <>
      <RecordExpense isOpen={isOpen} onClose={onClose} />
      <HeroStatCard
        title="Presupuesto del mes"
        statLabel="Disponible"
        helpText={date(new Date(), "LLLL-YYY")}
        amount={balance}
        loading={status === "loading"}
      >
        <HeroStatFooter>
          <Button onClick={onOpen} colorScheme="blue" variant="outline">
            Registrar Gasto
          </Button>
        </HeroStatFooter>
      </HeroStatCard>
    </>
  );
};

export default BudgetCard;
