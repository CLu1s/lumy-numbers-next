import { useMemo, useEffect, useState, useCallback } from "react";
import {
  Box,
  Center,
  Heading,
  Button,
  Tag,
  Stack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Table from "../../components/Table";
import { getItems, getCategoryID } from "./selector";
import { deleteFixedCost, updateFixedCost } from "./fixedCostSlice";
import { addNewTransaction } from "../wallet/walletSlice";
import { getBucketID } from "../bucket/selector";
import FixedCostModal from "./FixedCostModal";
import AlertDialog from "../../components/AlertDialog";
import ItemsList from "./ItemsList";
import { money } from "../../utils";
import NoRegisters from "../../components/NoRegisters";

const DisplayData = (props: any) => {
  const items = useSelector(getItems);
  const dispatch = useDispatch();
  const bucketID = useSelector(getBucketID);
  const categoryID = useSelector(getCategoryID);

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
  const managePaid = (data: any) => {
    const { createdAt, updatedAt, ...input } = data;
    const { type, status, ...trans } = input;
    dispatch(
      addNewTransaction({
        ...trans,
        bucketID,
        categoryID,
        date: new Date().toISOString(),
      })
    );
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
        id: "edit",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <HStack>
            {value.status !== "paid" ? (
              <Button colorScheme="teal" onClick={() => managePaid(value)}>
                Marcar como Pagado
              </Button>
            ) : (
              <Tag colorScheme="purple">Pagado</Tag>
            )}
            <Button bg="white" onClick={() => manageOpen(value)}>
              <FiEdit />
            </Button>
            <Button
              bg="white"
              onClick={() => handleDelete(value.id)}
              color="red.500"
            >
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

  return (
    <>
      <AlertDialog
        title="Eliminar Transacción"
        description=" ¿Está seguro? No podrás deshacer esta acción después."
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
      <Stack>
        <Box>
          <Button marginBottom="4" colorScheme="blue" onClick={onOpen}>
            Nuevo Gasto Fijo
          </Button>
        </Box>
        {items.length > 0 ? (
          <Box>
            <Box display={{ base: "none", lg: "block" }}>
              <Table columns={columns} data={items} />
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
