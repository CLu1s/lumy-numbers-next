import { useEffect, useState } from "react";
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
import { fetchIncomes } from "./budgetSlice";
import { getStatus } from "./selector";
import { money } from "../../utils";
import { getBucket } from "../bucket/selector";
import NewIncome from "./NewIncome";

const IncomeCard = () => {
  const dispatch = useDispatch();
  const bucket = useSelector(getBucket);
  const income = useSelector(getIncome);
  const listOfIncomes = useSelector(getListOfIncomes);
  const { status, error } = useSelector(getStatus);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (status === "idle" && bucket?.bucketID) {
      dispatch(fetchIncomes(bucket.bucketID));
    }
  }, [dispatch, status, bucket]);

  const list = listOfIncomes.map((income) => (
    <Stack key={income.id}>
      <Stat size="sm">
        <StatLabel>{income.description}</StatLabel>
        <StatNumber>{money(income.amount)}</StatNumber>
      </Stat>
      <Divider />
    </Stack>
  ));

  return (
    <>
      <NewIncome isOpen={isOpen} onClose={onClose} />
      <HeroStatCard
        title=" Ingresos del Mes"
        statLabel={date(new Date(), "LLLL-YYY")}
        amount={income}
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
