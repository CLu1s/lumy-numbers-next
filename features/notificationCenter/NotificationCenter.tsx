import { RiMenuFill } from "react-icons/ri";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { RiNotification2Line } from "react-icons/ri";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Avatar,
  AvatarBadge,
  Button,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getNotifications, isLoading } from "./selector";
import Notification from "./Notification";

const NotificationCenter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const notifications = useSelector(getNotifications);
  console.log(notifications);
  return (
    <>
      <Button
        variant="ghost"
        borderRadius="full"
        padding="0"
        onClick={() => onOpen()}
      >
        <Avatar
          size="md"
          bg="purple.500"
          icon={<RiNotification2Line fontSize="2rem" color="white" />}
        >
          {notifications.length > 0 && (
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            />
          )}
        </Avatar>
      </Button>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notificaciones Recientes</DrawerHeader>

          <DrawerBody>
            <VStack spacing="8" width="full">
              {notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                />
              ))}
              {notifications.length === 0 && (
                <Text textAlign="center">No hay notificaciones</Text>
              )}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationCenter;
