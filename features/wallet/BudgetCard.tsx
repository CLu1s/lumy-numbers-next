import { useState } from "react";
import RecordExpense from "./RecordExpense";
import { useDisclosure, Button } from "@chakra-ui/react";
import HeroStatCard, { HeroStatFooter } from "../../components/HeroStatCard";
import { date } from "../../utils";

type Props = {
  balance: number;
};

const BudgetCard = ({ balance }: Props) => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <RecordExpense isOpen={isOpen} onClose={onClose} />
      <HeroStatCard
        title="Presupuesto del mes"
        statLabel="Disponible"
        helpText={date(new Date(), "LLLL-YYY")}
        amount={balance}
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
