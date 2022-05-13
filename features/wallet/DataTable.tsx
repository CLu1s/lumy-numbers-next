import { useMemo } from "react";
import Table from "../../components/Table";
import { Text, Tag, Button, HStack } from "@chakra-ui/react";
import { money, date } from "../../utils";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Transaction } from "../../types";

type Props = {
  transactions: Transaction[];
  manageOpen: (transaction: Transaction) => void;
  handleDelete: (id: number) => void;
};

const DataTable = ({ transactions, manageOpen, handleDelete }: Props) => {
  const columns = useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
        Cell: ({ cell: { value } }) => (
          <Text> {date(new Date(value), "dd - LLLL")}</Text>
        ),
      },

      {
        Header: "Descripción",
        accessor: "description",
      },
      {
        Header: "Categoría",
        accessor: "category",
        Cell: ({ cell: { value } }) => (
          <Tag size="md" variant="solid" bgColor={value?.color ?? "gray.400"}>
            {value ? value.name : "Sin categoría"}
          </Tag>
        ),
      },
      {
        Header: "Monto",
        accessor: "amount",
        Cell: ({ cell: { value } }) => <Text>{money(value)}</Text>,
      },
      {
        id: "edit",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <HStack>
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

    [manageOpen]
  );
  return <Table fullHeight columns={columns} data={transactions} />;
};
export default DataTable;
