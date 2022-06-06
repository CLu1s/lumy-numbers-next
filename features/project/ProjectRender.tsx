import { useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import differenceInMonths from "date-fns/differenceInMonths";
import {
  Button,
  Wrap,
  WrapItem,
  Stack,
  HStack,
  Tag,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import Table from "../../components/Table";
import Screen from "../../components/Screen";
import Stats from "../../components/Stats";
import { Project as ProjectType, Movement, LoadingStates } from "../../types";
import { date, money } from "../../utils";
import NoRegisters from "../../components/NoRegisters";
import { fetchMovementsByProject } from "./projectsSlice";
import Loading from "../../components/Loading";

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
    if (project.loadingState === LoadingStates.SUCCEEDED) return;
    dispatch(fetchMovementsByProject(project.id));
  }, [dispatch, project.id, project.loadingState]);

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
            <Button onClick={() => setMovementToEdit(value)}>
              <FiEdit />
            </Button>
            <Button onClick={() => onMovementDelete(value.id)} color="red.500">
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
            avalible: project.initAmount,
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
      width="full"
      paddingBottom={{ base: "2rem", lg: "0" }}
    >
      <Screen
        title={
          <HStack>
            <Heading as="h6" size="lg" fontWeight="medium">
              {project.name}
            </Heading>
            {!project.isActive && (
              <Tag colorScheme="gray" marginBottom="2">
                Inactivo
              </Tag>
            )}
            {numbers.amountPending < 0 && (
              <Tag colorScheme="green" marginBottom="2">
                Completado
              </Tag>
            )}
          </HStack>
        }
        description={project.description}
      >
        <Stack spacing={4} w="full">
          <Wrap justifyContent="space-between" spacing={7} w="full">
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
              <Stats name="Ahorrado" amount={numbers.amountPaid} />
            </WrapItem>
            {numbers.amountPending > 0 && (
              <WrapItem flex="1 1 0">
                <Stats
                  name="Cantidad por Ahorrar"
                  amount={numbers.amountPending}
                />
              </WrapItem>
            )}
            {numbers.amountPending > 0 && (
              <WrapItem flex="1 1 0">
                <Stats name="Mensualidad Sugerida" amount={mensualities} />
              </WrapItem>
            )}
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
              colorScheme="messenger"
              onClick={() => onOpen(project.id, mensualities, project.name)}
              disabled={!project.isActive}
            >
              Nuevo Movimiento
            </Button>
            <HStack>
              <IconButton
                aria-label="Editar Proyecto"
                icon={<FiEdit />}
                onClick={() => onEdit(project)}
              />

              <IconButton
                onClick={() => handleDelete(project.id)}
                color="red.500"
                aria-label="Borrar Proyecto"
                icon={<FiTrash2 />}
              />
            </HStack>
          </HStack>
          {project.loadingState === LoadingStates.LOADING ? (
            <Loading />
          ) : project.movements.length ? (
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
