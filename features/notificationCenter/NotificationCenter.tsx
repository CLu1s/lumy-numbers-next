import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
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
import { useSelector, useDispatch } from "react-redux";
import { getAllNotifications } from "./selector";
import { getBucketID } from "../bucket/selector";
import { fetchAllNotifications } from "./notificationSlice";
import Notification from "./Notification";

const NotificationCenter = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bucketID = useSelector(getBucketID);
  const notifications = useSelector(getAllNotifications);
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    if (!bucketID) return;
    dispatch(fetchAllNotifications(bucketID));
  }, [bucketID, dispatch]);

  const renderNotifications = notifications.map((notification) => (
    <Notification key={notification.id} notification={notification} />
  ));

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
          bg="blue.500"
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
            <VStack spacing="8" width="full" ref={parent}>
              {renderNotifications}
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
