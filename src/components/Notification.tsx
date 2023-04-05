import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { OSNotification } from 'react-native-onesignal';

type Props = {
  data: OSNotification;
  onClose: () => void;
}

type NotificationAdditionalData = {
  route?: 'details';
  productId?: string;
}

export function Notification({ data, onClose }: Props) {
  const { navigate } = useNavigation();

  function handlePress() {
    const { route, productId } = data.additionalData as NotificationAdditionalData;

    if(route === 'details' && productId) {
      navigate(route, {
        productId
      });
    }

    onClose();
  }

  return (
    <Pressable
      w="full"
      p={4}
      pt={12}
      position="absolute"
      top={0}
      bgColor="gray.200"
      onPress={handlePress}
    >
      <HStack 
        justifyContent="space-between" 
        alignItems="center" 
      >
          <Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2}/>

          <Text fontSize="md" color="black" flex={1}>
            {data.title}
          </Text>

        <IconButton 
          variant="unstyled" 
          _focus={{ borderWidth: 0 }} 
          icon={<CloseIcon size="3" />} 
          _icon={{ color: "coolGray.600"}} 
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}