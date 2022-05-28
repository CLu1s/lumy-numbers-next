import { useState, useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import { getAllProjects, getStatus } from "./selector";
import { Project, Movement, LoadingStates } from "../../types";
import NewProject from "./NewProject";
import NewMovement from "./NewMovement";
import AlertDialog from "../../components/AlertDialog";
import { deleteProject, deleteMovement } from "./projectsSlice";
import Loading from "../../components/Loading";
import ProjectRender from "./ProjectRender";

type Props = {
  id: string;
};
function ProjectDetail({ id }: Props) {
  const dispatch = useDispatch();
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);
  const [alertMovementDelete, setAlertMovementDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string>(null);
  const [elementToEdit, setElementToEdit] = useState<Project>(null);
  const [movementToEdit, setMovementToEdit] = useState<Movement>(null);
  const [projectID, setProjectID] = useState<string>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
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

  const allProjects = useSelector(getAllProjects);
  const project = useMemo(
    () => allProjects.find((p) => p.id === id),
    [id, allProjects]
  );
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

  if (status !== LoadingStates.SUCCEEDED) {
    return <Loading />;
  }

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

      <ProjectRender
        key={id}
        project={project}
        onOpen={movementOnOpen}
        onEdit={manageOpen}
        handleDelete={handleDelete}
        setMovementToEdit={onMovementEdit}
        onMovementDelete={onMovementDelete}
      />
    </>
  );
}

export default ProjectDetail;
