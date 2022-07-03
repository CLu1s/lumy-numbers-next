import { useState, useRef, useEffect } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Text,
  Flex,
  useDisclosure,
  Switch,
  Divider,
  HStack,
  VStack,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import autoAnimate from "@formkit/auto-animate";
import Screen from "../../components/Screen";
import ProjectCard from "./ProjectCard";
import {
  getProjects,
  getAllProjects,
  getCategoryID,
  getStatus,
} from "./selector";
import { Project, Movement, LoadingStates } from "../../types";
import NewProject from "./NewProject";
import NewMovement from "./NewMovement";
import SaveCategoryID from "./SaveCategoryID";
import AlertDialog from "../../components/AlertDialog";
import { deleteProject, deleteMovement } from "./projectsSlice";
import Loading from "../../components/Loading";
import { getIsMenuCollapsed } from "../system/selector";

function ProjectsList() {
  const dispatch = useDispatch();
  const [seeHistory, setSeeHistory] = useState(false);
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);
  const [alertMovementDelete, setAlertMovementDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string>(null);
  const [elementToEdit, setElementToEdit] = useState<Project>(null);
  const [movementToEdit, setMovementToEdit] = useState<Movement>(null);
  const [projectID, setProjectID] = useState<string>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const categoryID = useSelector(getCategoryID);
  const [projectName, setProjectName] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const status = useSelector(getStatus);
  const moveModal = useDisclosure();
  const isCollapsed = useSelector(getIsMenuCollapsed);

  const parent = useRef(null);
  const parentInactive = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  useEffect(() => {
    parentInactive.current && autoAnimate(parentInactive.current);
  }, [parentInactive]);

  const movementOnOpen = (id: string, m: number, name: string) => {
    setProjectID(id);
    setProjectName(name);
    setMonthlyPayment(m);
    moveModal.onOpen();
  };

  const projects = useSelector(getProjects);
  const allProjects = useSelector(getAllProjects);

  const manageOnClose = () => {
    elementToEdit && setElementToEdit(null);
    onClose();
  };

  const manageMovementOnClose = () => {
    movementToEdit && setMovementToEdit(null);
    setProjectID(null);
    setMonthlyPayment(0);
    moveModal.onClose();
  };
  const handleDelete = (id) => {
    setDeleteId(id);
    setAlertDialogIsOpen(true);
  };

  const renderActiveItems = (seeHistory ? allProjects : projects)
    .filter((item) => item.isActive)
    .map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        onOpen={movementOnOpen}
        handleDelete={handleDelete}
      />
    ));
  const renderInactiveItems = (seeHistory ? allProjects : projects)
    .filter((item) => !item.isActive)
    .map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        onOpen={movementOnOpen}
        handleDelete={handleDelete}
      />
    ));

  return (
    <>
      <AlertDialog
        title="Eliminar Proyecto"
        description=" ¿Está seguro? No podrás deshacer esta acción después."
        isOpen={alertDialogIsOpen}
        onClose={() => {
          setAlertDialogIsOpen(false);
          setDeleteId(null);
        }}
        onDelete={() => {
          dispatch(deleteProject(deleteId));
          setAlertDialogIsOpen(false);
          setDeleteId(null);
        }}
      />
      <AlertDialog
        title="Eliminar Movimiento"
        description=" ¿Está seguro? No podrás deshacer esta acción después."
        isOpen={alertMovementDelete}
        onClose={() => {
          setAlertMovementDelete(false);
          setDeleteId(null);
        }}
        onDelete={() => {
          dispatch(deleteMovement(deleteId));
          setAlertMovementDelete(false);
          setDeleteId(null);
        }}
      />
      <NewProject
        isOpen={isOpen}
        onClose={manageOnClose}
        toEdit={elementToEdit}
      />
      <NewMovement
        isOpen={moveModal.isOpen}
        onClose={manageMovementOnClose}
        toEdit={movementToEdit}
        projectID={projectID}
        monthlyPayment={monthlyPayment}
        projectName={projectName}
      />

      {projects.length !== allProjects.length && (
        <HStack marginBottom="2rem" spacing={8}>
          <HStack spacing={2}>
            <Text fontSize="sm" fontWeight="medium">
              Ver proyectos concluidos
            </Text>
            <Switch
              size="md"
              isChecked={seeHistory}
              colorScheme="purple"
              onChange={(e) => setSeeHistory(e.target.checked)}
            />
          </HStack>
          <Button
            size="sm"
            backgroundColor="purple.400"
            color="white"
            onClick={onOpen}
          >
            Nuevo
          </Button>
        </HStack>
      )}
      <VStack w="full" spacing={10} alignItems="flex-start">
        <SimpleGrid
          columns={[1, isCollapsed ? 2 : 1, 3]}
          spacing={{ base: 4, md: 4, lg: 5 }}
          w="full"
          ref={parent}
        >
          {status === LoadingStates.IDLE ? (
            <Loading />
          ) : (
            <>
              {renderActiveItems}

              <Screen maxHeight="296px">
                <Flex
                  direction="column"
                  height="full"
                  w="full"
                  align="center"
                  justifyContent="center"
                >
                  {categoryID ? (
                    <Button
                      w="full"
                      height="full"
                      minH="250px"
                      maxHeight="583px"
                      color="gray.400"
                      colorScheme="whiteAlpha"
                      borderWidth="1px"
                      borderColor="gray.200"
                      borderRadius="md"
                      onClick={onOpen}
                    >
                      <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        height="full"
                      >
                        <VscAdd />
                        <Text>Nuevo</Text>
                      </Flex>
                    </Button>
                  ) : (
                    <SaveCategoryID />
                  )}
                </Flex>
              </Screen>
            </>
          )}
        </SimpleGrid>
        <Divider />
        <Heading as="h3" size="md">
          Proyectos inactivos
        </Heading>
        <SimpleGrid
          columns={[1, isCollapsed ? 2 : 1, 3]}
          spacing={{ base: 4, md: 4, lg: 5 }}
          w="full"
          ref={parentInactive}
        >
          {renderInactiveItems}
        </SimpleGrid>
      </VStack>
    </>
  );
}

export default ProjectsList;
