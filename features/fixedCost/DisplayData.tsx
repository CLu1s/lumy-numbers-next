import { useMemo, useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  Button,
  Input,
  Stack,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table";
import { getItems } from "./selector";
import { fetchFixedCost } from "./fixedCostSlice";
import { getBucketID } from "../bucket/selector";
import FixedCostModal from "./FixedCostModal";
import { money } from "../../utils";

const DisplayData = (props: any) => {
  const items = useSelector(getItems);
  const dispatch = useDispatch();
  const bucketID = useSelector(getBucketID);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [elementToEdit, setElementToEdit] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchFixedCost(bucketID));
  }, [dispatch, bucketID]);

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
    ],
    []
  );
  const manageOnClose = () => {
    elementToEdit && setElementToEdit(null);
    onClose();
  };
  return (
    <>
      <FixedCostModal
        isOpen={isOpen}
        onClose={manageOnClose}
        toEdit={elementToEdit}
      />
      <Stack>
        {items.length > 0 ? (
          <Box>
            <Button marginBottom="4" colorScheme="blue" onClick={onOpen}>
              Nuevo Gasto Fijo
            </Button>
            <Box display={{ base: "none", lg: "block" }}>
              <Table columns={columns} data={items} />
            </Box>
            <Box display={{ base: "block", lg: "none" }}>
              <div>hola</div>
            </Box>
          </Box>
        ) : (
          <Center>
            <Heading as="h6" size="xs" textColor="gray.400">
              No hay registros
            </Heading>
          </Center>
        )}
      </Stack>
    </>
  );
};

export default DisplayData;
