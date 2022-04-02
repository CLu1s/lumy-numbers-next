import RecordExpense from "./RecordExpense";
import { useDisclosure, Button } from "@chakra-ui/react";
import sub from "date-fns/sub";
import { useSelector, useDispatch } from "react-redux";
import HeroStatCard, {
  HeroStatFooter,
  HeroStatBody,
} from "../../components/HeroStatCard";
import { date } from "../../utils";
import { getStatus } from "./selector";
import { getBalance, getPeriod } from "./selector";
import { changePeriod } from "./walletSlice";
import isSameMonth from "date-fns/isSameMonth";

const BudgetCard = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const balance = useSelector(getBalance);
  const status = useSelector(getStatus);
  const period = useSelector(getPeriod);
  const currentDate = new Date();

  const handleChangePeriod = (neDate) => {
    dispatch(changePeriod(neDate));
  };
  const sameMonth = isSameMonth(period, currentDate);
  return (
    <>
      <RecordExpense isOpen={isOpen} onClose={onClose} />
      <HeroStatCard
        title="Presupuesto del mes"
        description="Esta es la cantidad todal que resta de tu presupuesto"
        statLabel="Disponible"
        helpText={date(new Date(), "LLLL-YYY")}
        amount={balance}
        loading={status !== "succeeded"}
      >
        {/* <HeroStatBody>
          {sameMonth && (
            <Button
              size="xs"
              onClick={() => handleChangePeriod(sub(new Date(), { months: 1 }))}
            >
              Mes anterior
            </Button>
          )}
          {!sameMonth && (
            <Button size="xs" onClick={() => handleChangePeriod(new Date())}>
              Mes actual
            </Button>
          )}
        </HeroStatBody> */}
        <HeroStatFooter>
          {sameMonth && <Button onClick={onOpen} colorScheme="blue" variant="outline">
            Registrar Gasto
          </Button>}
        </HeroStatFooter>
      </HeroStatCard>
    </>
  );
};

export default BudgetCard;
