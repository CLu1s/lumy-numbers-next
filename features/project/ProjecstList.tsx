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
import ProjectRender from "../../components/ProjectRender";
import { getProjects, getCategoryID } from "./selector";
import { Project, Movement } from "../../types";
import NewProject from "./NewProject";
import NewMovement from "./NewMovement";
import SaveCategoryID from "./SaveCategoryID";

function ProjectsList() {
  const dispatch = useDispatch();
  const [elementToEdit, setElementToEdit] = useState<Project>(null);
  const [movementToEdit, setMovementToEdit] = useState<Movement>(null);
  const [projectID, setProjectID] = useState<string>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const categoryID = useSelector(getCategoryID);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const moveModal = useDisclosure();

  const movementOnOpen = (id: string, m: number) => {
    setProjectID(id);
    setMonthlyPayment(m);
    moveModal.onOpen();
  };

  const projects = useSelector(getProjects);
  const renderTables = projects.map((project) => (
    <ProjectRender key={project.id} project={project} onOpen={movementOnOpen} />
  ));
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

  return (
    <>
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
      />

      <Wrap spacing={8}>
        {renderTables}
        <WrapItem
          width="100%"
          maxW={{ base: "93%", lg: "45%", xl: "31%" }}
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
