import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Customer } from "../../http/server-apis";
import { useSelector } from "react-redux";

const HeaderRight = ({ navigation }) => {
  const [notificationData, setNotificationData] = useState([]);
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const getNotification = async () => {
    try {
      let { data } = await Customer("get", {
        params: `get-notification`,
        postfix: `?userId=${userId}`,

        token: true,
      });
    

      setNotificationData(data);
    } catch (error) {
      console.log("Notification  error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got notification data",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        className="relative"
        onPress={() => navigation.navigate("notification")}
      >
        {notificationData?.length ? (
          <View className="bg-amber-400 items-center justify-center absolute top-1 right-8 rounded-full h-4 w-4">
            <Text className="text-white text-[10px]">
              {notificationData?.length}
            </Text>
          </View>
        ) : null}
        <AntDesign
          name="bells"
          size={24}
          color={Colors.white}
          style={{ fontWeight: "bold" }}
        />
      </TouchableOpacity>
    </>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  btn: {
    fontWeight: "600",
  },
});
