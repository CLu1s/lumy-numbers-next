import { VscAdd } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { Button, Text, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import Screen from "../../components/Screen";
import ProjectRender from "../../components/ProjectRender";
import { getProjects } from "./selector";
import { addProject } from "./projectsSlice";

function ProjectsList() {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const renderTables = projects.map((project) => (
    <ProjectRender key={project.id} project={project} />
  ));

  return (
    <Wrap spacing={8}>
      {renderTables}
      <WrapItem
        width="100%"
        maxW={{ base: "93%", lg: "45%", xl: "31%" }}
        minH="123px"
      >
        <Screen>
          <Flex direction="column" align="center" justifyContent="center">
            <Button
              w="full"
              h="full"
              minH="90px"
              color="gray.400"
              colorScheme="whiteAlpha"
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              onClick={() => {
                console.log("click");
              }}
            >
              <Flex direction="column" align="center" justify="center">
                <VscAdd />
                <Text>Nuevo</Text>
              </Flex>
            </Button>
          </Flex>
        </Screen>
      </WrapItem>
    </Wrap>
  );
}

export default ProjectsList;
