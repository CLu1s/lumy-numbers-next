import { useState } from "react";
import HeroStatCard, {
  HeroStatBody,
  HeroStatFooter,
} from "../../components/HeroStatCard";
import { date } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { getIncome, getListOfIncomes } from "./selector";
import {
  Stack,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { money } from "../../utils";
import { getStatus } from "../bucket/selector";
import NewIncome from "./NewIncome";

const IncomeCard = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const income = useSelector(getIncome);
  const listOfIncomes = useSelector(getListOfIncomes);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [elementToEdit, setElementToEdit] = useState<any>(null);

  const list = listOfIncomes.map((income) => (
    <Stack key={income.id}>
      <button
        style={{ textAlign: "left" }}
        onClick={() => {
          setElementToEdit(income);
          onOpen();
        }}
      >
        <Stat size="sm">
          <StatLabel>{income.description}</StatLabel>
          <StatNumber>{money(income.amount)}</StatNumber>
        </Stat>
      </button>
      <Divider />
    </Stack>
  ));
  const manageOnClose = () => {
    elementToEdit && setElementToEdit(null);
    onClose();
  };
  return (
    <>
      <NewIncome
        isOpen={isOpen}
        onClose={manageOnClose}
        toEdit={elementToEdit}
      />
      <HeroStatCard
        title=" Ingresos del Mes"
        statLabel={date(new Date(), "LLLL-YYY")}
        amount={income}
        loading={status.status !== "succeeded"}
      >
        <HeroStatBody>{list}</HeroStatBody>
        <HeroStatFooter>
          <Button onClick={onOpen} colorScheme="blue" variant="outline">
            Registrar Nuevo Ingreso
          </Button>
        </HeroStatFooter>
      </HeroStatCard>
    </>
  );
};

export default IncomeCard;
