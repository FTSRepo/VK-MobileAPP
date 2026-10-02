import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

const CommingSoon = () => {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.logo} source={require("../../../assets/images/.png")} /> */}
      <Text style={styles.headText}>OOPS....</Text>
      <Text style={styles.text}>Data not Available</Text>

    </View>
  );
};

export default CommingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  logo:{
    width:200,
    height:200
  },

  text: {
    color: Colors.dark,
    fontSize:FontSize.large,
    fontWeight:"600"
  },
  headText:{
    color: Colors.dark,
    fontSize:FontSize.xxLarge,
    fontWeight:"600"
  }
});
