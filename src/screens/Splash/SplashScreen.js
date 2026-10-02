import { ImageBackground, View } from "react-native";
import React, { useEffect } from "react";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("login");
    }, 3000);
  }, []);
  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="contain"
        source={require("../../../assets/splash.png")}
        className="flex-1 justify-center items-center bg-red-400/80"
      />
    </View>
  );
};

export default SplashScreen;
