import { Dimensions , StyleSheet } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const globalStyles = StyleSheet.create({
  card:{
    flex:1,
    elevation:3
  }
})

export default {
  width,
  height,
  isSmallDevice: width < 375,
  globalStyles
};
