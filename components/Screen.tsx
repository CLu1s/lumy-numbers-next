import { Box, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import Markdown from "./Markdown";
import { getIsMenuCollapsed } from "../features/system/selector";
import { useSelector } from "react-redux";
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
  maxHeight = "fit-content",
  minHeight = "fit-content",
}: props) => {
  const shadow = useColorModeValue("xl", "2xl");
  const defaultbg = useColorModeValue("white", "#242731");
  const isCollapsed = useSelector(getIsMenuCollapsed);

  return (
    <Box
      w={isCollapsed ? "auto" : "full"}
      height="full"
      maxHeight={maxHeight}
      minHeight={minHeight}
      borderWidth="1px"
      p={5}
      shadow={withShadow && shadow}
      borderRadius="3xl"
      display={display}
      bg={bg ?? defaultbg}
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
