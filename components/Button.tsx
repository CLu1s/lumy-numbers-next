import { Button as ChakraButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = {
  children: any;
  onClick?: () => void;
  to?: string;
};

const Button = ({ children, to, onClick, ...props }: Props) => {
  const router = useRouter();
  if (to) {
    return (
      <ChakraButton
        backgroundColor="purple.400"
        color="white"
        onClick={() => router.push(to)}
        {...props}
      >
        {children}
      </ChakraButton>
    );
  }

  return (
    <ChakraButton
      backgroundColor="purple.400"
      color="white"
      onClick={onClick}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
