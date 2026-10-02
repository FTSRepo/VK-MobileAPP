import { Text, View, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";

const LaunchingSoon = ({ message , beta}) => {
  return (
    <View className="flex-1 items-center justify-center">
   
      <Image source={require("../../assets/app_icon/commingsoon.png")} className="h-40 w-40"/>
      <View className="flex-row items-center">
      <Text className="text-lg font-semibold text-red-400">
        We Are Launching Soon..
      </Text>
      <MaterialCommunityIcons
        name="rocket-launch"
        size={34}
        color={Colors.primary}
      />
   
      </View>
      
      <TouchableOpacity  onPress={beta} style={{alignSelf:"flex-end"}}>
        <Text>Beta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LaunchingSoon;
