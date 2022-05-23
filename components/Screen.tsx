import { Box, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import Markdown from "./Markdown";

type props = {
  title?: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  display?: any;
};

const Screen = ({ title, description, children, display }: props) => {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      width="full"
      height="full"
      p={5}
      shadow="sm"
      borderWidth="1px"
      bgColor={bg}
      flex="1"
      borderRadius="3xl"
      display={display}
    >
      <Stack spacing={6}>
        {title && (
          <Stack spacing="2">
            <Heading as="h2" size="md" fontWeight="600">
              {title}
            </Heading>
            {description &&
              (typeof description === "string" ? (
                <Markdown>{description}</Markdown>
              ) : (
                description
              ))}
          </Stack>
        )}
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
};

export default Screen;
