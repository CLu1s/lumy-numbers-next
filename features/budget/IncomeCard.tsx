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
  HStack,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { money } from "../../utils";
import { getStatus } from "../bucket/selector";
import NewIncome from "./NewIncome";
import AlertDialog from "../../components/AlertDialog";
import { deleteIncome } from "./budgetSlice";

const IncomeCard = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const income = useSelector(getIncome);
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const listOfIncomes = useSelector(getListOfIncomes);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [elementToEdit, setElementToEdit] = useState<any>(null);

  const list = listOfIncomes.map((income) => (
    <Stack key={income.id}>
      <HStack spacing={2}>
        <Stat size="sm">
          <StatLabel>{income.description}</StatLabel>
          <StatNumber>{money(income.amount)}</StatNumber>
        </Stat>
        <Button
          onClick={() => {
            setElementToEdit(income);
            onOpen();
          }}
          color="white"
        >
          <FiEdit />
        </Button>
        <Button
          onClick={() => {
            setDeleteId(income.id);
            setAlertDialogIsOpen(true);
          }}
          color="red.500"
        >
          <FiTrash2 />
        </Button>
      </HStack>
      <Divider />
    </Stack>
  ));
  const manageOnClose = () => {
    elementToEdit && setElementToEdit(null);
    onClose();
  };
  return (
    <>
      <AlertDialog
        title="Eliminar Ingreso"
        description=" ¿Está seguro? No podrás deshacer esta acción después."
        isOpen={alertDialogIsOpen}
        onClose={() => {
          setAlertDialogIsOpen(false);
          setDeleteId(null);
        }}
        onDelete={() => {
          dispatch(deleteIncome(deleteId));
          setAlertDialogIsOpen(false);
          setDeleteId(null);
        }}
      />
      <NewIncome
        isOpen={isOpen}
        onClose={manageOnClose}
        toEdit={elementToEdit}
      />
      <HeroStatCard
        title=" Ingresos del Mes"
        description="La suma de todos los ingresos registrados en este mes y los ingresos registrados hasta el momento."
        statLabel={date(new Date(), "LLLL-YYY")}
        amount={income}
        loading={status.status !== "succeeded"}
      >
        <HeroStatBody>{list}</HeroStatBody>
        <HeroStatFooter>
          <Button onClick={onOpen} backgroundColor="white" color="black">
            Registrar Nuevo Ingreso
          </Button>
        </HeroStatFooter>
      </HeroStatCard>
    </>
  );
};

export default IncomeCard;
