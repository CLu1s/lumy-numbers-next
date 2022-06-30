import { Box, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import Markdown from "./Markdown";
import ChackraBox from "./ChakraBox";
type props = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  display?: any;
  bg?: string;
  textColor?: string;
  withShadow?: boolean;
  maxHeight?: string;
  minHeight?: string;
};

const Screen = ({
  title,
  description,
  children,
  display,
  bg,
  textColor,
  withShadow = true,
  maxHeight = "initial",
  minHeight = "initial",
}: props) => {
  const shadow = useColorModeValue("xl", "2xl");
  const defaultbg = useColorModeValue("white", "#242731");

  return (
    <ChackraBox
      width="auto"
      height="full"
      maxHeight={maxHeight}
      minHeight={minHeight}
      borderWidth="1px"
      p={5}
      shadow={withShadow && shadow}
      flex="1 1 auto"
      borderRadius="3xl"
      display={display}
      bg={bg ?? defaultbg}
      color={textColor}
      layout
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
    </ChackraBox>
  );
};

export default Screen;
