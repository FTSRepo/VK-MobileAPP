import { StyleSheet, TextInput, Text } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import Spacing from "../../constants/Spacing";

const AppTextInput = ({ ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  return (
    <>
      {otherProps.label ? (
        <Text className="font-semibold text-slate-600 pl-2">
          {otherProps.label} :
        </Text>
      ) : null}
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={(text) => otherProps.handleChange(text)}
        placeholderTextColor={Colors.darkText}
        style={[
          {
            fontSize: FontSize.small,
            padding: Spacing * 2,
            backgroundColor: Colors.lightBlue,
            borderRadius: Spacing,
            marginVertical: Spacing,
          },
          focused && {
            borderWidth: 3,
            borderColor: Colors.dark,
            shadowOffset: { width: 4, height: Spacing },
            shadowColor: Colors.dark,
            shadowOpacity: 0.2,
            shadowRadius: Spacing,
          },
        ]}
        {...otherProps}
      />
    </>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
