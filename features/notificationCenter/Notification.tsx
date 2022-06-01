import { Notification } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  VStack,
  Box,
  HStack,
  Flex,
  Text,
  Button,
  Avatar,
  AvatarBadge,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { date } from "../../utils";
import { CheckIcon } from "@chakra-ui/icons";
import { deleteNotification } from "./notificationSlice";
type Props = {
  notification: Notification;
};

const NotificationTypeColors = {
  gasto: "purple.500",
  project: "blue.500",
  fixedCost: "green.500",
  budget: "orange.500",
};

const Notification = ({ notification }: Props) => {
  const dispatch = useDispatch();
  const minuts = differenceInMinutes(new Date(), new Date(notification.date));
  const hours = differenceInHours(new Date(), new Date(notification.date));
  let time: String = hours < 1 ? `Hace ${minuts}m` : `Hace ${hours}h`;
  time = hours > 24 ? date(new Date(notification.date), "dd/MM") : time;

  const handleClick = () => {
    dispatch(deleteNotification(notification.id));
  };

  return (
    <Box w="full">
      <HStack w="full" spacing={6}>
        <Avatar
          size="sm"
          name={notification.type}
          bg={NotificationTypeColors[notification.type]}
          color="white"
        />
        <Box ml={2}>
          <HStack>
            <Heading as="h4" size="sm" textTransform="capitalize">
              {notification.userName}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {time}
            </Text>
          </HStack>
          <Text fontSize="sm">{notification.message}</Text>
        </Box>
        <IconButton
          aria-label="Search database"
          icon={<CheckIcon />}
          onClick={handleClick}
        />
      </HStack>
    </Box>
  );
};
export default Notification;
