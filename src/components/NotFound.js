import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
const { height } = Dimensions


const NotFound = ({ message }) => {

  return (
    <View  className="rounded-md overflow-hidden h-[100vh] justify-center items-center bg-white flex-1 p-10">
      <Image source={require("../../assets/icons/info.png")} />
      <Text style={styles.text}>{message ? message : `Data not Available`}</Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {

    elevation: 5
  },
  logo: {
    width: 50,
    height: 50,
  },

  text: {
    color: Colors.dark,
    fontSize: FontSize.small,
    fontWeight: "600",
  },
  headText: {
    color: Colors.dark,
    fontSize: FontSize.medium,
    fontWeight: "600",
  },
});
