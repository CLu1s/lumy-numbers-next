import { useMemo } from "react";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Button, Wrap, WrapItem, Stack, HStack } from "@chakra-ui/react";
import Table from "./Table";
import Screen from "./Screen";
import Stats from "./Stats";
import { Project as ProjectType } from "../types/";

type Props = {
  project: ProjectType;
};

function ProjectRender({ project }: Props) {
  const columns = useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
      },
      {
        Header: "Descripción",
        accessor: "description",
      },
      {
        Header: "Monto",
        accessor: "amount",
      },
      {
        id: "edit",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <HStack>
            <Button bg="white" onClick={() => console.log(value)}>
              <FiEdit />
            </Button>
            <Button
              bg="white"
              onClick={() => console.log(value.id)}
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

  const numbers = project.movements.reduce(
    (acc, curr) => {
      acc.amountPaid += curr.amount;
      acc.amountPending -= curr.amount;
      return acc;
    },
    {
      amountPaid: 0,
      amountPending: project.amountGoal,
    }
  );

  return (
    <WrapItem
      key={project.id}
      width="-moz-fit-content"
      maxW={{ base: "93%", lg: "45%", xl: "31%" }}
    >
      <Screen title={project.name} description={project.description}>
        <Stack spacing={4}>
          <Wrap justifyContent="space-between" spacing={4}>
            <WrapItem>
              <Stats name="Meta" amount={Number(project.amountGoal)} />
            </WrapItem>
            <WrapItem>
              <Stats
                name="Ahorrado a la fecha"
                amount={numbers.amountPaid}
              />
            </WrapItem>
            <WrapItem>
              <Stats
                name="Cantidad por Ahorrar"
                amount={numbers.amountPending}
              />
            </WrapItem>
            <WrapItem>
              <Stats
                name="Menusalidad Sugerida"
                amount={numbers.amountPaid}
              />
            </WrapItem>
          </Wrap>
          <HStack justifyContent="space-between" spacing={4}>
            <Button size="md" colorScheme="blue">
              Abonar
            </Button>
          </HStack>
          <Table data={project.movements} columns={columns} />
        </Stack>
      </Screen>
    </WrapItem>
  );
}

export default ProjectRender;
