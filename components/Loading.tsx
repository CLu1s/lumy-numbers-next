import { Box, Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box>
      <Center>
        <Spinner color="purple.500" size='xl'/>
      </Center>
    </Box>
  );
};

export default Loading;
