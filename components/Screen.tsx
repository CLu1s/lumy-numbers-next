import { motion } from "framer-motion";
import { Box, Stack, Heading } from "@chakra-ui/react";
type props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const Screen = ({ title, children }: props) => {
  return (
    <motion.div
      initial={{ x: -100 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      style={{
        width: "100%",
      }}
    >
      <Box
        width="full"
        p={5}
        shadow="sm"
        borderWidth="1px"
        bg="white"
        flex="1"
        borderRadius="3xl"
      >
        <Stack>
          {title && (
            <Heading as="h2" size="md" fontWeight="600">
              {title}
            </Heading>
          )}
          <Box>{children}</Box>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default Screen;
