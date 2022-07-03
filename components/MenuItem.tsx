import { useRouter } from "next/router";
import Link from "next/link";
import { motion, isValidMotionProp } from "framer-motion";

import {
  chakra,
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

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and the children prop to be forwarded.
   * All other chakra props not matching the motion props will still be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const MenuItem = ({ label, icon, path, showLabel, mobileLabel }: Props) => {
  const router = useRouter();
  const isTablet = useIsTablet();
  const isActive = router.pathname === path;
  const bgButton = "purple.400";
  const ColorSquareNoActive = useColorModeValue("gray.400", "gray.300");
  const textColor = useColorModeValue("gray.500", "gray.300");
  return (
    <ChakraBox
      borderWidth={isActive ? "1px" : "0px"}
      bg={isActive ? bgButton : "transparent"}
      flex="1"
      initial={{ borderRadius: "0.75rem" }}
      layout
    >
      <LinkBox as="button" width="full" maxW="full">
        <Link href={path} passHref>
          <LinkOverlay>
            <ChakraBox layout flex="1" padding={4}>
              <HStack spacing={4}>
                <ChakraBox layout>
                  <Square color={isActive ? "white" : ColorSquareNoActive}>
                    {icon}
                  </Square>
                </ChakraBox>
                <ChakraBox layout>
                  {showLabel && (
                    <Text
                      color={isActive ? "white" : textColor}
                      fontSize="14"
                      fontWeight="semibold"
                    >
                      {isTablet ? mobileLabel ?? label : label}
                    </Text>
                  )}
                </ChakraBox>
              </HStack>
            </ChakraBox>
          </LinkOverlay>
        </Link>
      </LinkBox>
    </ChakraBox>
  );
};

export default MenuItem;
