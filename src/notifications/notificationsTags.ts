import OneSignal from "react-native-onesignal";

export function tagUserCreateInfo() {
    OneSignal.sendTags({
        'user_name': 'Clovis',
        'user_role': 'personal_trainer'
    });
}

export function tagCartUpdate(itemsCount: string) {
    OneSignal.sendTag('cart_items_count', itemsCount);
}