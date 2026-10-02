import React from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MenuImage(props) {
  return (
    <View className="flex-1 flex-row gap-2 items-center">
      <TouchableOpacity
        style={styles.headerButtonContainer}
        onPress={props.onPress}
      >
        <MaterialCommunityIcons
          name="menu"
          size={20}
          style={{ fontWeight: "bold" }}
          color={Colors.white}
        />

      </TouchableOpacity>
      <Image
        className="w-20 h-12  object-contain"
        source={require("../../../assets/logo.png")}
        resizeMode="contain"
      />


    </View>

  );
}

MenuImage.propTypes = {
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10,
  },
  headerButtonImage: {
    justifyContent: "center",
    width: 25,
    height: 25,
    margin: 6,
  },
});
