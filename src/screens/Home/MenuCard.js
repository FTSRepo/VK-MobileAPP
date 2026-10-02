import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { useSelector } from "react-redux";
import { Bilty } from "../../http/server-apis";
const width = Dimensions.get("window").width;

const MenuCard = ({ index, item, navigation }) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);

  const callback = async () => {
    try {
      let {
        data: { status, data, message },
      } = await Bilty("post", {
        params: `saveCallBackRequest/?customerId=${userId}`,
        token: true,
      });

      if (status === true) {
        ToastAndroid.showWithGravity(
          message || "We will call you back shortly",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      } else {
        ToastAndroid.showWithGravity(
          message || "Something went wrong",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    } catch (error) {
      // console.log("User error ", error.response.data.message);
      ToastAndroid.showWithGravity(
        "Something went wrong",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  const showAlert = () =>
    Alert.alert("Alert", "Confirm Action? Request a Callback", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => callback() },
    ]);

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        item.function
          ? showAlert()
          : navigation.navigate(item.page ? item.page : "404")
      }
    >
      <View style={styles.item}>
        <Image source={item.image} alt="home" style={styles.icon} />
        <Text className="font-bold text-sm text-center">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  itemContainer: {
    width: width / 3 - 10,
    height: 150,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    maxWidth: 80,
    maxHeight: 80,
  },
  text: {
    fontSize: FontSize.small,
    overflow: "hidden",
  },
});
