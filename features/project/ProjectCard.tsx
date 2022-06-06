import { useEffect } from "react";
import {
  Wrap,
  WrapItem,
  Stack,
  HStack,
  Tag,
  IconButton,
  Heading,
  Switch,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { ViewIcon, PlusSquareIcon } from "@chakra-ui/icons";
import differenceInMonths from "date-fns/differenceInMonths";
import Screen from "../../components/Screen";
import Stats from "../../components/Stats";
import { Project as ProjectType, LoadingStates } from "../../types";
import { date } from "../../utils";
import { fetchMovementsByProject, updateProject } from "./projectsSlice";

type Props = {
  project: ProjectType;
  onOpen: (id: string, m: number, name: string) => void;
  handleDelete: (id: string) => void;
};

function ProjectCard({ project, onOpen, handleDelete }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (project.loadingState === LoadingStates.SUCCEEDED) return;
    dispatch(fetchMovementsByProject(project.id));
  }, [dispatch, project.id, project.loadingState]);

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
      maxW={{ base: "100%", md: "47%", lg: "30%" }}
    >
      <Screen
        title={
          <HStack justifyContent="space-between" w="full">
            <Heading as="h2" size="md" fontWeight="600">
              {project.name}
            </Heading>
            <VStack>
              <HStack>
                <IconButton
                  onClick={() => router.push(`/app/proyectos/${project.id}`)}
                  aria-label="Ver Proyecto"
                  icon={<ViewIcon />}
                />
                {project.isActive && (
                  <IconButton
                    aria-label="Nuevo Movimiento"
                    icon={<PlusSquareIcon />}
                    onClick={() =>
                      onOpen(project.id, mensualities, project.name)
                    }
                  />
                )}
                <IconButton
                  onClick={() => handleDelete(project.id)}
                  color="red.500"
                  aria-label="Borrar Proyecto"
                  icon={<FiTrash2 />}
                />
              </HStack>
              <FormControl
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <FormLabel htmlFor="email-alerts" mb="0">
                  Activo
                </FormLabel>
                <Switch
                  id="email-alerts"
                  onChange={(e) =>
                    dispatch(
                      updateProject({
                        ...project,
                        isActive: e.target.checked,
                      })
                    )
                  }
                  isChecked={project.isActive}
                />
              </FormControl>
            </VStack>
          </HStack>
        }
      >
        {numbers.amountPending < 0 && (
          <Tag colorScheme="green" marginBottom="2">
            Completado
          </Tag>
        )}
        <Stack spacing={4} w="full">
          <Wrap justifyContent="space-between" spacing={7} w="full">
            <WrapItem flex="1 1 0">
              <Stats
                size="sm"
                name="Meta"
                amount={Number(project.amountGoal)}
                helpText={`Fecha objetivo: ${date(
                  new Date(project.endDate),
                  "dd/MM/yyyy"
                )}`}
              />
            </WrapItem>

            <WrapItem flex="1 1 0">
              <Stats name="Disponible" size="sm" amount={numbers.avalible} />
            </WrapItem>
          </Wrap>
        </Stack>
      </Screen>
    </WrapItem>
  );
}

export default ProjectCard;
