import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { differenceInMonths, differenceInCalendarMonths } from "date-fns";
import {
  Button,
  Stack,
  HStack,
  Tag,
  Heading,
  IconButton,
  VStack,
  Text,
  SimpleGrid,
  Box,
  Divider,
} from "@chakra-ui/react";
import Table from "../../components/Table";
import Screen from "../../components/Screen";
import Stats from "../../components/Stats";
import { Project as ProjectType, Movement, LoadingStates } from "../../types";
import { date, money } from "../../utils";
import NoRegisters from "../../components/NoRegisters";
import { fetchMovementsByProject } from "./projectsSlice";
import Loading from "../../components/Loading";
import { getIsMenuCollapsed } from "../system/selector";
import TransactionMini from "../../components/TransactionMini";
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
  const isCollapsed = useSelector(getIsMenuCollapsed);

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
    [onMovementDelete, setMovementToEdit]
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
    differenceInCalendarMonths(
      new Date(project.endDate),
      new Date(project.startDate)
    );

  const formatItems = (items: Movement[]) => {
    return items.map((item) => ({
      id: item.id,
      date: item.date,
      description: item.description,
      amount: item.amount,
      category: {
        color: item.type?.toLowerCase() === "egress" ? "red.500" : "green.500",
        icon:
          item.type?.toLowerCase() === "egress" ? "FaMinusSquare" : "SiAddthis",
      },
    }));
  };

  return (
    <Screen
      title={
        <VStack spacing={2} alignItems="flex-start">
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
          <Text fontSize="sm" color="gray.500">
            Fecha de Inicio: {date(new Date(project.startDate), "dd/MMMM/yyyy")}
          </Text>
        </VStack>
      }
      description={project.description}
    >
      <Stack spacing={4} w="full">
        <SimpleGrid columns={[2, isCollapsed ? 3 : 2, 3]} spacing={2} w="full">
          <Box>
            <Stats
              name="Meta"
              amount={Number(project.amountGoal)}
              helpText={`Fecha objetivo: ${date(
                new Date(project.endDate),
                "dd/MMMM/yyyy"
              )}`}
            />
          </Box>
          <Box>
            <Stats
              name="Estimado a la fecha"
              amount={
                mensualities *
                differenceInCalendarMonths(
                  new Date(),
                  new Date(project.startDate)
                )
              }
              helpText={"Lo que a esta fecha deberias tener"}
            />
          </Box>
          <Box>
            <Stats name="Ahorrado" amount={numbers.amountPaid} />
          </Box>
          {numbers.amountPending > 0 && (
            <Box>
              <Stats
                name="Cantidad por Ahorrar"
                amount={numbers.amountPending}
              />
            </Box>
          )}
          {numbers.amountPending > 0 && (
            <Box>
              <Stats name="Mensualidad Sugerida" amount={mensualities} />
            </Box>
          )}
          {numbers.expenses > 0 && (
            <Box>
              <Stats name="Gastos" amount={numbers.expenses} />
            </Box>
          )}
          {numbers.expenses > 0 && (
            <Box>
              <Stats name="Disponible" amount={numbers.avalible} />
            </Box>
          )}
        </SimpleGrid>
        <HStack justifyContent="space-between" spacing={4}>
          <Button
            size="md"
            backgroundColor="purple.400"
            color="white"
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
          <>
            <Box display={["none", null, "block"]}>
              <Table data={project.movements} columns={columns} />
            </Box>
            <Divider display={["block", null, "none"]} />
            <Stack
              spacing={4}
              marginBottom={4}
              display={["block", null, "none"]}
            >
              <TransactionMini
                transactions={project.movements}
                editable
                onEdit={setMovementToEdit}
                onDelete={(id) => {
                  onMovementDelete(id);
                }}
              />
            </Stack>
          </>
        ) : (
          <NoRegisters />
        )}
      </Stack>
    </Screen>
  );
}

export default ProjectRender;
