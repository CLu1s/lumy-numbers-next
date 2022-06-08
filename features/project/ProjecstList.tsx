import { useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Text,
  Flex,
  Wrap,
  WrapItem,
  useDisclosure,
  Switch,
  Divider,
  HStack,
  VStack,
  Heading,
} from "@chakra-ui/react";
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

  if (status === LoadingStates.IDLE) {
    return <Loading />;
  }

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
        <HStack marginBottom="2rem">
          <Text fontSize="sm" fontWeight="medium">
            Ver proyectos concluidos
          </Text>
          <Switch
            size="md"
            isChecked={seeHistory}
            onChange={(e) => setSeeHistory(e.target.checked)}
          />
        </HStack>
      )}
      <VStack w="full" spacing={10} alignItems="flex-start">
        <Wrap spacing={{ base: 4, md: 4, lg: 5 }} w="full">
          {renderActiveItems}
          <WrapItem
            width="100%"
            maxW={{ base: "100%", md: "47%", lg: "30%" }}
            minH="280px"
            height="full"
          >
            <Screen>
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
                    minH="238px"
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
          </WrapItem>
        </Wrap>
        <Divider />
        <Heading as="h3" size="md">
          Proyectos inactivos
        </Heading>
        <Wrap spacing={{ base: 4, md: 4, lg: 5 }} w="full">
          {renderInactiveItems}
        </Wrap>
      </VStack>
    </>
  );
}

export default ProjectsList;
