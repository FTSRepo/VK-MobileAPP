import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { ScrollView } from "react-native";
import { imgUrl } from "../../http/server-base";
import { Image } from "react-native";

const AdvertisementDetail = ({ route, navigation }) => {
  const { title, description, imagePath } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title || "Detail",
    });
  }, []);
  return (
    <View className="flex-1 mx-2 my-2">
      <View className="flex-[2]">
        <Image
          source={{
            uri: `${imgUrl}${imagePath}`,
          }}
          className="rounded-md overflow-hidden"
          style={{
            resizeMode: "contain",
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <ScrollView className="flex-1">
        <Text className="text-lg text-center font-bold my-2 text-red-400 ">{title}</Text>
        <Text className="text-sm   ">{description}</Text>
      </ScrollView>
    </View>
  );
};

export default AdvertisementDetail;

const styles = StyleSheet.create({});
