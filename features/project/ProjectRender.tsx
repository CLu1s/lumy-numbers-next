import { useMemo,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import differenceInMonths from "date-fns/differenceInMonths";
import { Button, Wrap, WrapItem, Stack, HStack, Box } from "@chakra-ui/react";
import Table from "../../components/Table";
import Screen from "../../components/Screen";
import Stats from "../../components/Stats";
import { Project as ProjectType } from "../../types";
import { date, money } from "../../utils";
import NoRegisters from "../../components/NoRegisters";
import { fetchMovementsByProject } from "./projectsSlice";

type Props = {
  project: ProjectType;
  onOpen: (id: string, m: number) => void;
};

function ProjectRender({ project, onOpen }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovementsByProject(project.id));
  }, [dispatch, project.id]);

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
        Header: "Monto",
        accessor: "amount",
        Cell: ({ value }) => money(value),
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

  const numbers =
    project.movements.length > 0
      ? project.movements.reduce(
          (acc, curr) => {
            acc.amountPaid += curr.amount;
            acc.amountPending -= curr.amount;
            return acc;
          },
          {
            amountPaid: 0,
            amountPending: project.amountGoal,
          }
        )
      : {
          amountPaid: 0,
          amountPending: project.amountGoal,
        };
  const mensualities =
    project.amountGoal /
    differenceInMonths(new Date(project.endDate), new Date(project.startDate));
  return (
    <WrapItem
      key={project.id}
      width="-moz-fit-content"
      maxW={{ base: "93%", lg: "45%", xl: "31%" }}
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
          </Wrap>
          <HStack justifyContent="space-between" spacing={4}>
            <Button
              size="md"
              colorScheme="blue"
              onClick={() => onOpen(project.id, mensualities)}
            >
              Abonar
            </Button>
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
