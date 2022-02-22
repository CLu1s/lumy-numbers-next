import RecordExpense from "./RecordExpense";
import { useDisclosure, Button } from "@chakra-ui/react";
import HeroStatCard, { HeroStatFooter } from "../../components/HeroStatCard";
import { date } from "../../utils";
import { useSelector } from "react-redux";
import { getStatus } from "./selector";
import { getBalance } from "./selector";

const BudgetCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const balance = useSelector(getBalance);
  const status = useSelector(getStatus);

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
