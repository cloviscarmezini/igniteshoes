import OneSignal from "react-native-onesignal";

export function tagUserCreateInfo() {
    OneSignal.sendTags({
        'user_name': 'Clovis',
        'user_role': 'personal_trainer'
    });
}