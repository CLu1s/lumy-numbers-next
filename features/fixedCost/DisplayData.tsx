import { useMemo, useState, useCallback } from "react";
import {
  Box,
  Button,
  Tag,
  Stack,
  HStack,
  useDisclosure,
  Wrap,
  WrapItem,
  IconButton,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Table from "../../components/Table";
import { getItems } from "./selector";
import { deleteFixedCost } from "./fixedCostSlice";
import FixedCostModal from "./FixedCostModal";
import AlertDialog from "../../components/AlertDialog";
import ItemsList from "./ItemsList";
import { money, date } from "../../utils";
import NoRegisters from "../../components/NoRegisters";
import Stats from "../../components/Stats";
import usePayFixedCost from "./hooks/usePayFixedCost";
import { CheckIcon } from "@chakra-ui/icons";
const DisplayData = (props: any) => {
  const items = useSelector(getItems);
  const managePaid = usePayFixedCost();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [elementToEdit, setElementToEdit] = useState<any>(null);

  const manageOpen = useCallback(
    (item: any) => {
      setElementToEdit(item);
      onOpen();
    },
    [onOpen]
  );

  const handleDelete = (id) => {
    setDeleteId(id);
    setAlertDialogIsOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "description",
      },
      {
        Header: "Monto",
        accessor: "amount",
        Cell: ({ cell: { value } }: any) => money(value),
      },
      {
        Header: "Fecha de Vencimiento",
        accessor: "dueDay",
        Cell: ({ cell: { value } }: any) => {
          if (!value) return "Sin Definir";
          const currentDate = new Date();
          currentDate.setDate(value);

          return date(currentDate, " eeee dd MMMM");
        },
      },
      {
        id: "edit",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <HStack>
            {value.status !== "paid" ? (
              <Button
                backgroundColor="purple.400"
                color="white"
                onClick={() => managePaid(value)}
              >
                Marcar como Pagado
              </Button>
            ) : (
              <Tag backgroundColor="purple.400" color="white">
                Pagado
              </Tag>
            )}
            <Button onClick={() => manageOpen(value)}>
              <FiEdit />
            </Button>
            <Button onClick={() => handleDelete(value.id)} color="red.500">
              <FiTrash2 />
            </Button>
          </HStack>
        ),
      },
    ],
    []
  );
  const manageOnClose = () => {
    elementToEdit && setElementToEdit(null);
    onClose();
  };
  const amounts = items.reduce(
    (acc, item) => {
      if (item.status === "paid") {
        acc.paid += item.amount;
      }
      acc.total += item.amount;
      return acc;
    },
    {
      total: 0,
      paid: 0,
    }
  );

  return (
    <>
      <AlertDialog
        title="Eliminar Transacci??n"
        description=" ??Est?? seguro? No podr??s deshacer esta acci??n despu??s."
        isOpen={alertDialogIsOpen}
        onClose={() => {
          setAlertDialogIsOpen(false);
          setDeleteId(null);
        }}
        onDelete={() => {
          dispatch(deleteFixedCost(deleteId));
          setAlertDialogIsOpen(false);
          setDeleteId(null);
        }}
      />
      <FixedCostModal
        isOpen={isOpen}
        onClose={manageOnClose}
        toEdit={elementToEdit}
      />
      <Wrap marginBottom="2rem" spacing={10}>
        <WrapItem>
          <Stats name="Total de Gastos" amount={amounts.total} />
        </WrapItem>
        <WrapItem>
          <Stats name="Pr??ximos pagos" amount={amounts.total - amounts.paid} />
        </WrapItem>
        <WrapItem>
          <Stats name="Gastos Pagados " amount={amounts.paid} />
        </WrapItem>
      </Wrap>
      <Stack>
        <Box>
          <Button
            marginBottom="4"
            backgroundColor="purple.400"
            color="white"
            onClick={onOpen}
          >
            Nuevo Gasto Fijo
          </Button>
        </Box>
        {items.length > 0 ? (
          <Box>
            <Box display={{ base: "none", lg: "block" }}>
              <Table columns={columns} data={items} fullHeight />
            </Box>
            <Box display={{ base: "block", lg: "none" }}>
              <ItemsList
                items={items}
                handleDelete={handleDelete}
                manageOpen={manageOpen}
                managePaid={managePaid}
              />
            </Box>
          </Box>
        ) : (
          <NoRegisters />
        )}
      </Stack>
    </>
  );
};

export default DisplayData;
