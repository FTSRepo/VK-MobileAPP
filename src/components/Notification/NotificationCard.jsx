import { Text, ToastAndroid, View } from "react-native";
import React from "react";
import dayjs from "dayjs";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Customer } from "../../http/server-apis";

const NotificationCard = ({ notification , reload }) => {

  const clearNotification = async () => {
    try {
      let { data } = await Customer("get", {
        params: `read-notification`,
        postfix: `?Id=${notification?.id}`,
        token: true,
      });
    

      if (data.status === true) {
        ToastAndroid.showWithGravity(
          "Notification removed",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        reload()
      }

    } catch (error) {
      console.log("Notification  error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got notification data",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  };
  return (
    <View
      style={{
        elevation: 5,
      }}
      className="w-[90%] bg-gray-50 mx-auto  my-2 rounded-md overflow-hidden flex-row"
    >
      <View className="bg-white flex-1 b px-4 py-2 border-t-2 border-t-red-400">
        <View className="my-2">
          <Text className="text-red-500 font-bold text-sm">
            {dayjs(notification?.addDate).format("DD MMM YYYY")}
          </Text>
          <Text className="font-bold  text-slate-800 text-md">
            {notification?.message}
          </Text>
        </View>
      </View>

      <View className="items-center justify-center bg-red-400 px-2">
        <TouchableOpacity onPress={clearNotification}>
          <AntDesign
            className=""
            name="delete"
            size={24}
            color={Colors.white}
            style={{ fontWeight: "bold" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationCard;
