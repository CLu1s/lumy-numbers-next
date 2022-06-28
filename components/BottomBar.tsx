import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import { menuList } from "../config/menu";
import MenuItemBottom from "./MenuItemBottom";

const BottomBar = () => {
  const bg = useColorModeValue("white", "gray.900");

  const renderButtons = menuList
    .map((item) => {
      if (!item.showOnMobile) return null;
      return <MenuItemBottom key={item.id} {...item} showLabel />;
    })
    .filter((item) => item);
  return (
    <Box
      position={{ base: "fixed", md: "static" }}
      display={{ base: "block", md: "none" }}
      // boxShadow="lg"
      backgroundColor={bg}
      color="gray.500"
      bottom="0"
      width="full"
      paddingBottom={6}
      paddingX={2}
      zIndex={100}
    >
      <HStack spacing={0} width="full" justifyContent="space-between">
        {renderButtons}
      </HStack>
    </Box>
  );
};

export default BottomBar;
