import { Text, View, ActivityIndicator } from "react-native";

import React from "react";
import Colors from "../constants/Colors";

const Loading = ({ message }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text className="text-lg font-semibold">
        {message ? message : `Fetching Data...`}
      </Text>
    </View>
  );
};

export default Loading;
