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
import { useIsTablet } from "../hooks";

type Props = {
  label: string;
  mobileLabel?: string;
  icon: React.ReactNode;
  path: string;
  showLabel?: boolean;
};

const MenuItem = ({ label, icon, path, showLabel, mobileLabel }: Props) => {
  const router = useRouter();
  const isTablet = useIsTablet();
  const isActive = router.pathname === path;
  const bgButton = "purple.400";
  const ColorSquareNoActive = useColorModeValue("gray.400", "gray.300");
  const textColor = useColorModeValue("gray.500", "gray.300");
  return (
    <Box
      borderWidth={isActive ? "1px" : "0px"}
      bg={isActive ? bgButton : "transparent"}
      flex="1"
      borderRadius="xl"
      w="full"
    >
      <LinkBox as="button" width="full" maxW="full">
        <Link href={path} passHref>
          <LinkOverlay>
            <Box flex="1" padding={4}>
              <HStack spacing={4}>
                <Square color={isActive ? "white" : ColorSquareNoActive}>
                  {icon}
                </Square>
                {showLabel && (
                  <Text
                    color={isActive ? "white" : textColor}
                    fontSize="14"
                    fontWeight="semibold"
                    display={["block", "none", "none", "block"]}
                  >
                    {isTablet ? mobileLabel ?? label : label}
                  </Text>
                )}
              </HStack>
            </Box>
          </LinkOverlay>
        </Link>
      </LinkBox>
    </Box>
  );
};

export default MenuItem;
