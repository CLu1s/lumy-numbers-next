import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
type props = {
  children: React.ReactNode;
  className?: string;
};

const Screen = ({ children }: props) => {
  return (
    <motion.div
      initial={{ x: -100 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
    >
      <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
        {children}
      </Box>
    </motion.div>
  );
};

export default Screen;
