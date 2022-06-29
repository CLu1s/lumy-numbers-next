import { Box, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import Markdown from "./Markdown";

type props = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  display?: any;
  bg?: string;
  textColor?: string;
  withShadow?: boolean;
};

const Screen = ({
  title,
  description,
  children,
  display,
  bg,
  textColor,
  withShadow = true,
}: props) => {
  return (
    <Box
      width="full"
      height="full"
      borderWidth="1px"
      p={5}
      shadow={withShadow && "xl"}
      flex="1 1 auto"
      borderRadius="3xl"
      display={display}
      bg={bg}
      color={textColor}
    >
      <Stack spacing={6}>
        {title && (
          <Stack spacing="2">
            {typeof title === "string" ? (
              <Heading as="h6" size="lg" fontWeight="medium">
                {title}
              </Heading>
            ) : (
              title
            )}
            {description &&
              (typeof description === "string" ? (
                <Markdown color={textColor}>{description}</Markdown>
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
