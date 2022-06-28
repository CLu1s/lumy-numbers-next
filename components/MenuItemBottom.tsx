import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  LinkBox,
  Stack,
  Text,
  LinkOverlay,
  Square,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {
  label: string;
  mobileLabel?: string;
  icon: React.ReactNode;
  path: string;
  showLabel?: boolean;
};

const MenuItem = ({ label, mobileLabel, icon, path, showLabel }: Props) => {
  const router = useRouter();
  const isActive = router.pathname === path;
  const bgButton = useColorModeValue("purple.400", "gray.800");
  const ColorSquareNoActive = useColorModeValue("gray.200", "blue.300");

  return (
    <LinkBox as="button" width="full" maxW="full">
      <Link href={path} passHref>
        <LinkOverlay>
          <Box
            p={2}
            // shadow={isActive ? "md" : "none"}
            borderWidth={isActive ? "1px" : "0px"}
            bg={isActive ? bgButton : "transparent"}
            flex="1"
            borderRadius="xl"
          >
            <Stack spacing={0}>
              <Square color={isActive ? "white" : ColorSquareNoActive}>
                {icon}
              </Square>
              {showLabel && (
                <Text
                  color={isActive ? "white" : "gray"}
                  fontSize="10"
                  fontWeight="semibold"
                >
                  {mobileLabel ?? label}
                </Text>
              )}
            </Stack>
          </Box>
        </LinkOverlay>
      </Link>
    </LinkBox>
  );
};

export default MenuItem;
