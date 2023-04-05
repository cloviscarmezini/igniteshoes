import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import OneSignal from 'react-native-onesignal';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserCreateInfo } from './src/notifications/notificationsTags';

OneSignal.setAppId('b57fc388-9e5b-4582-8e0e-1b7694386512');

OneSignal.promptForPushNotificationsWithUserResponse();

tagUserCreateInfo();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    const unsubscribe = OneSignal
    .setNotificationOpenedHandler((response) => {

      const { actionId } = response.action as any;

      if(actionId === 'accept-button') {
        console.log('Aceito')
      }
      else if(actionId === 'refuse-button') {
        console.log('Recusado')
      } else {
        console.log('ignorado')
      }
    })

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}