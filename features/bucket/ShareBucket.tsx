import { useSelector } from "react-redux";
import Screen from "../../components/Screen";
import { getNanoID, getCollaborators } from "./selector";
import { Text, Heading, Stack, Box } from "@chakra-ui/react";

const ShareBucket = () => {
  const nanoID = useSelector(getNanoID);
  const collaborators = useSelector(getCollaborators);
  return (
    <Screen title="Compartir">
      <Stack spacing={6}>
        <Box>
          <Heading as="h6" size="sm">
            Código del Contenedor
          </Heading>
          <Text fontSize="sm">
            Copia y comparte este código para añadir a un colaborador a este
            contenedor
          </Text>
          <Text fontSize="md" fontWeight="bold" color="purple.500">
            {nanoID}
          </Text>
        </Box>
        <Box>
          <Heading as="h6" size="sm">
            Lista de Colaboradores
          </Heading>
          <Text>
            {collaborators
              .map((collaborator) => collaborator.userName)
              .join(", ")}
          </Text>
        </Box>
      </Stack>
    </Screen>
  );
};

export default ShareBucket;
