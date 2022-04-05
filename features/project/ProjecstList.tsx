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
} from "@chakra-ui/react";
import Screen from "../../components/Screen";
import ProjectRender from "./ProjectRender";
import { getProjects, getCategoryID } from "./selector";
import { Project, Movement } from "../../types";
import NewProject from "./NewProject";
import NewMovement from "./NewMovement";
import SaveCategoryID from "./SaveCategoryID";
import AlertDialog from "../../components/AlertDialog";
import { deleteProject, deleteMovement } from "./projectsSlice";

function ProjectsList() {
  const dispatch = useDispatch();
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
  const moveModal = useDisclosure();
  const movementOnOpen = (id: string, m: number, name: string) => {
    setProjectID(id);
    setProjectName(name);
    setMonthlyPayment(m);
    moveModal.onOpen();
  };

  const projects = useSelector(getProjects);

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

  const manageOpen = (item: any) => {
    setElementToEdit(item);
    onOpen();
  };

  const onMovementEdit = (item: Movement) => {
    setMovementToEdit(item);
    moveModal.onOpen();
  };
  const onMovementDelete = (id: string) => {
    setAlertMovementDelete(true);
    setDeleteId(id);
  };
  const renderTables = projects.map((project) => (
    <ProjectRender
      key={project.id}
      project={project}
      onOpen={movementOnOpen}
      onEdit={manageOpen}
      handleDelete={handleDelete}
      setMovementToEdit={onMovementEdit}
      onMovementDelete={onMovementDelete}
    />
  ));

  return (
    <>
      <AlertDialog
        title="Eliminar Projecto"
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

      <Wrap spacing={{base:0 ,md: 4,xl:8}}>
        {renderTables}
        <WrapItem
          width="100%"
          maxW={{ base: "100%", lg: "48%" }}
          minH="123px"
        >
          <Screen>
            <Flex direction="column" align="center" justifyContent="center">
              {categoryID ? (
                <Button
                  w="full"
                  h="full"
                  minH="90px"
                  color="gray.400"
                  colorScheme="whiteAlpha"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  onClick={onOpen}
                >
                  <Flex direction="column" align="center" justify="center">
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
    </>
  );
}

export default ProjectsList;
