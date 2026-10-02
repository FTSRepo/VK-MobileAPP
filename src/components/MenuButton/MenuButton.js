import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function MenuButton(props) {
  const { title, onPress, icon } = props;
  const [openAccordin, setOpenAccordin] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "column",
          padding: 5,
          marginTop: 5,
          marginBottom: 5,
        }}
        underlayColor="rgba(128, 128, 128, 0.1)"
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <MaterialIcons
            name={icon}
            style={{
              fontSize: 16,
              marginLeft: 10,
              marginTop: 2,
            }}
          />

          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              marginTop: 2,
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

MenuButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
  subMenu: PropTypes.array,
};
