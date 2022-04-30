import { motion } from "framer-motion";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";
import Markdown from "./Markdown";

type props = {
  title?: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const Screen = ({ title, description, children }: props) => {
  return (
    <motion.div
      initial={{ x: -100 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        width="full"
        height="full"
        p={5}
        shadow="sm"
        borderWidth="1px"
        bg="white"
        flex="1"
        borderRadius="3xl"
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
    </motion.div>
  );
};

export default Screen;
