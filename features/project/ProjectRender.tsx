import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import differenceInMonths from "date-fns/differenceInMonths";
import {
  Button,
  Wrap,
  WrapItem,
  Stack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import Table from "../../components/Table";
import Screen from "../../components/Screen";
import Stats from "../../components/Stats";
import { Project as ProjectType, Movement } from "../../types";
import { date, money } from "../../utils";
import NoRegisters from "../../components/NoRegisters";
import { fetchMovementsByProject } from "./projectsSlice";

type Props = {
  project: ProjectType;
  onOpen: (id: string, m: number, name: string) => void;
  handleDelete: (id: string) => void;
  onEdit: (element: ProjectType) => void;
  setMovementToEdit: (movement: Movement) => void;
  onMovementDelete: (id: string) => void;
};

function ProjectRender({
  project,
  onOpen,
  handleDelete,
  onEdit,
  setMovementToEdit,
  onMovementDelete,
}: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovementsByProject(project.id));
  }, [dispatch, project.id, project.movements.length]);

  const columns = useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
        Cell: ({ value }) => date(new Date(value), "dd/MM/yyyy"),
      },
      {
        Header: "Descripción",
        accessor: "description",
      },
      {
        Header: "Tipo",
        accessor: "type",
        Cell: ({ value }) => (value === "egress" ? "Gasto" : "Ahorro"),
      },
      {
        Header: "Monto",
        accessor: "amount",
        Cell: ({ value }) => money(value),
      },
      {
        id: "edit",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <HStack>
            <Button bg="white" onClick={() => setMovementToEdit(value)}>
              <FiEdit />
            </Button>
            <Button
              bg="white"
              onClick={() => onMovementDelete(value.id)}
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

  const numbers =
    project.movements.length > 0
      ? project.movements.reduce(
          (acc, curr) => {
            if (curr.type !== "egress") {
              acc.amountPaid += curr.amount;
              acc.amountPending -= curr.amount;
              acc.avalible += curr.amount;
            } else {
              acc.expenses += curr.amount;
              acc.avalible -= curr.amount;
            }
            return acc;
          },
          {
            amountPaid: project.initAmount,
            amountPending: project.amountGoal - project.initAmount,
            expenses: 0,
            avalible: 0,
          }
        )
      : {
          amountPaid: project.initAmount,
          amountPending: project.amountGoal - project.initAmount,
          expenses: 0,
          avalible: 0,
        };
  const mensualities =
    (project.amountGoal - project.initAmount) /
    (differenceInMonths(
      new Date(project.endDate),
      new Date(project.startDate)
    ) +
      1);
  return (
    <WrapItem
      key={project.id}
      width="-moz-fit-content"
      maxW={{ base: "100%", lg: "48%" }}
    >
      <Screen title={project.name} description={project.description}>
        <Stack spacing={4}>
          <Wrap justifyContent="space-between" spacing={7}>
            <WrapItem flex="1 1 0">
              <Stats
                name="Meta"
                amount={Number(project.amountGoal)}
                helpText={`Fecha objetivo: ${date(
                  new Date(project.endDate),
                  "dd/MM/yyyy"
                )}`}
              />
            </WrapItem>
            <WrapItem flex="1 1 0">
              <Stats name="Ahorrado a la fecha" amount={numbers.amountPaid} />
            </WrapItem>
            <WrapItem flex="1 1 0">
              <Stats
                name="Cantidad por Ahorrar"
                amount={numbers.amountPending}
              />
            </WrapItem>
            <WrapItem flex="1 1 0">
              <Stats name="Mensualidad Sugerida" amount={mensualities} />
            </WrapItem>
            {numbers.expenses > 0 && (
              <WrapItem flex="1 1 0">
                <Stats name="Gastos" amount={numbers.expenses} />
              </WrapItem>
            )}
            {numbers.expenses > 0 && (
              <WrapItem flex="1 1 0">
                <Stats name="Disponible" amount={numbers.avalible} />
              </WrapItem>
            )}
          </Wrap>
          <HStack justifyContent="space-between" spacing={4}>
            <Button
              size="md"
              colorScheme="blue"
              onClick={() => onOpen(project.id, mensualities, project.name)}
            >
              Nuevo Movimiento
            </Button>
            <HStack>
              <IconButton
                bg="white"
                aria-label="Editar Projecto"
                icon={<FiEdit />}
                onClick={() => onEdit(project)}
              />

              <IconButton
                bg="white"
                onClick={() => handleDelete(project.id)}
                color="red.500"
                aria-label="Borrar Projecto"
                icon={<FiTrash2 />}
              />
            </HStack>
          </HStack>
          {project.movements.length ? (
            <Table data={project.movements} columns={columns} />
          ) : (
            <NoRegisters />
          )}
        </Stack>
      </Screen>
    </WrapItem>
  );
}

export default ProjectRender;
