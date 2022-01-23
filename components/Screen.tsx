import { motion } from "framer-motion";

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
     className="my-8 shadow-lg rounded-2xl bg-white">
      <div className="py-8 px-6 w-full">{children}</div>
    </motion.div>
  );
};

export default Screen;
