import { useEffect, useState } from 'react';

import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

import { Notification } from '../components/Notification';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { colors } = useTheme();
  const [notificationData, setNotificationData] = useState<OSNotification>();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal
    .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification();
      setNotificationData(response)
    })

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      { notificationData?.title && (
        <Notification
          data={notificationData}
          onClose={() => setNotificationData(undefined)}
        />
      )}

    </NavigationContainer>
  );
}