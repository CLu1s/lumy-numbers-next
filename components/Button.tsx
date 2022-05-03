import clsx from "clsx";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = ({ children, onClick, className, ...props }: Props) => {
  return (
    <motion.button
      whileHover={{
        y: -3,
        scale: 1.01,
        transition: { type: "spring", stiffness: 100 },
      }}
      whileTap={{ scale: 0.9 }}
      className={clsx(
        "shadow-xl text-sm font-semibold rounded-2xl py-5 px-9 border border-purple-500 text-purple-600  mx-auto",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
