import { useEffect, useState } from 'react';

import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';


import { Notification } from '../components/Notification';
import { AppRoutes } from './app.routes';

const linking  ={
  prefixes: ['com.rocketseat.igniteshoes://', 'igniteshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

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
    <NavigationContainer theme={theme} linking={linking}>
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