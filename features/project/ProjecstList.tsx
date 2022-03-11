import { VscAdd } from "react-icons/vsc";
import { Button, Text, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import Screen from "../../components/Screen";
import ProjectRender from "../../components/ProjectRender";

const proyectos = [
  {
    id: "1",
    name: "Viaje a Japon",
    description:
      "Esse quasi tempora est minima voluptas blanditiis. Et at et dolor vel. Voluptatibus dolores id id officia iure. Omnis in quia nostrum ipsum. Eius modi qui eligendi beatae. Rerum exercitationem nisi occaecati sapiente minima fuga fugit voluptatem consequatur.",
    status: "En proceso",
    date: "2020-05-01",
    dueDate: "2020-05-10",
    amountGoal: 150000,
    movements: [
      {
        id: "1",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 100,
        projectID: "a;klsjhd",
      },
      {
        id: "1",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 100,
        projectID: "a;klsjhd",
      },
      {
        id: "1",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 100,
        projectID: "a;klsjhd",
      },
    ],
  },
  {
    id: "2",
    name: "est dignissimos facere",
    description:
      "Aliquam quod dolore aut optio et. Sapiente reiciendis eum tempora exercitationem minus dicta. Provident illum tempore itaque ut ex cupiditate hic. Eaque accusantium assumenda ut quos consequuntur ex perferendis expedita.",
    status: "En proceso",
    date: "2020-05-01",
    dueDate: "2020-05-10",
    amountGoal: 1000,
    movements: [
      {
        id: "1",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 300,
        projectID: "a;klsjhd",
      },
    ],
  },
  {
    id: "3",
    name: "Proyecto 3",
    description:
      "Esse quasi tempora est minima voluptas blanditiis. Et at et dolor vel. Voluptatibus dolores id id officia iure. Omnis in quia nostrum ipsum. Eius modi qui eligendi beatae.",
    status: "En proceso",
    date: "2020-05-01",
    dueDate: "2020-05-10",

    amountGoal: 5000,

    movements: [
      {
        id: "1",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 100,
        projectID: "a;klsjhd",
      },
      {
        id: "2",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 100,
        projectID: "a;klsjhd",
      },
    ],
  },
];

function ProjectsList() {
  const renderTables = proyectos.map((project) => (
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
