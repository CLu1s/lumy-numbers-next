import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Text, VStack } from "@chakra-ui/react";

import Notification from "./Notification";
import { Notification as NotType } from "../../types";

type Props = {
  notifications: NotType[];
};

const NotificationBody = ({ notifications }: Props) => {
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const renderNotifications = notifications.map((notification) => (
    <Notification key={notification.id} notification={notification} />
  ));

  return (
    <VStack spacing="8" width="full" ref={parent}>
      {renderNotifications}
      {notifications.length === 0 && (
        <Text textAlign="center">No hay notificaciones</Text>
      )}
    </VStack>
  );
};

export default NotificationBody;
