import {
  Button,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { imgUrl } from "../../http/server-base";
import { Loyality } from "../../http/server-apis";
import { useSelector } from "react-redux";
import { useState } from "react";

const RedeemCard = ({ catalog, point, refetch }) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const [disabled, setDisabled] = useState(false);
  const redeemPoint = async () => {
    try {
      let {
        data: { status, data, message },
      } = await Loyality("post", {
        params: `add-redeem`,
        data: {
          catalogId: catalog?.rowId,
          userId,
        },
        token: true,
      });

      if (status === true) {
        refetch();
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      } else {
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
    } catch (error) {
      setDisabled(false);

      console.log(error);
      ToastAndroid.showWithGravity(
        "Oops! Could not redeem point ",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  const handlePoint = async () => {
    setDisabled(true);
    await redeemPoint();
    setDisabled(false);
  };

  return (
    <View
      style={{
        elevation: 5,
      }}
      className="w-[90%] bg-gray-50 mx-auto  my-2 rounded-md overflow-hidden"
    >
      <View className="w-full bg-white h-48 items-center justify-center p-2 ">
        <Image
          source={{ uri: `${imgUrl}${catalog?.image}` }}
          style={{
            width: 200,
            height: 200,
            resizeMode: "contain",
          }}
        />
      </View>

      <View className="bg-white b px-4 py-2 border-t-2 border-t-red-400">
        <View className="my-2">
          <Text className="text-red-500 font-bold text-md">
            {catalog?.productName}
          </Text>
          <Text className="font-semibold text-xs  text-slate-500 h-30">
            {catalog?.description}
          </Text>
        </View>

        <View className="flex flex-row justify-between">
          <View className="flex-row  ">
            <Text className="text-red-500 font-bold text-lg">
              {catalog?.points}
            </Text>
            <Text className="text-xs text-red-500 font-semibold">P</Text>
          </View>

          <TouchableOpacity
            className="rounded-lg bg-red-400 justify-center items-center p-2 overflow-hidden"
            disabled={disabled}
            style={{ elevation: 2 }}
            onPress={() => handlePoint()}
          >
            <Text className="text-white font-bold ">Redeem</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RedeemCard;
