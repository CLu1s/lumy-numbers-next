import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  LinkBox,
  HStack,
  Text,
  LinkOverlay,
  Square,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

const MenuItem = ({ label, icon, path }: Props) => {
  const router = useRouter();
  const isActive = router.pathname === path;
  const bgButton = useColorModeValue("white", "gray.800");
  const bgSquareActive = useColorModeValue("purple.200", "purple.800");
  const bgSquare = useColorModeValue("white", "gray.800");

  return (
    <LinkBox as="button" width="full" maxW="full">
      <Link href={path} passHref>
        <LinkOverlay>
          <Box
            p={2}
            shadow={isActive ? "md" : "none"}
            borderWidth={isActive ? "1px" : "0px"}
            bg={isActive ? bgButton : "transparent"}
            flex="1"
            borderRadius="xl"
            padding={4}
          >
            <HStack spacing={4}>
              <Square
                size="30px"
                bg={isActive ? bgSquareActive : bgSquare}
                color={isActive ? "white" : "blue.200"}
                borderRadius={"lg"}
              >
                {icon}
              </Square>
              <Text>{label}</Text>
            </HStack>
          </Box>
        </LinkOverlay>
      </Link>
    </LinkBox>
  );
};

export default MenuItem;
