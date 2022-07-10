import { useEffect } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  AvatarBadge,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getAllNotifications } from "./selector";
import { getBucketID } from "../bucket/selector";
import { fetchAllNotifications } from "./notificationSlice";
import NotificationBody from "./NotificationBody";

const NotificationCenter = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bucketID = useSelector(getBucketID);
  const notifications = useSelector(getAllNotifications);

  useEffect(() => {
    if (!bucketID) return;
    dispatch(fetchAllNotifications(bucketID));
  }, [bucketID, dispatch]);

  return (
    <Box>
      <Button
        variant="ghost"
        borderRadius="full"
        padding="0"
        onClick={() => onOpen()}
      >
        <Avatar
          size="md"
          bg="purple.400"
          icon={<MdOutlineNotificationsNone fontSize="2rem" color="white" />}
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
            <NotificationBody notifications={notifications} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default NotificationCenter;
