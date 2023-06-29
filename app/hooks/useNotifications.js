import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

import expoPushTokensApi from "../api/expoPushTokens";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const useNotifications = (notificationListener) => {
  const notificationReceivedListener = useRef();

  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener)
      notificationReceivedListener.current =
        Notifications.addNotificationReceivedListener(
          (notificationListener) => {
            notificationListener;
          }
        );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationReceivedListener.current
      );
    };
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permissions = await Notifications.getPermissionsAsync();
      if (!permissions.granted) {
        const finalPermissions = await Notifications.requestPermissionsAsync();
        if (!finalPermissions.granted) return;
      }

      const { data: token } = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};

export default useNotifications;
