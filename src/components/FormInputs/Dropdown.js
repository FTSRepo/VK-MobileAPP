import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { ActivityIndicator } from "react-native";

const DropdownInput = ({
  changeValue,
  labelName,
  valueName,
  value,
  loading,
  ...otherProps
}) => {
  //   const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>
          {labelName ? item[labelName] : item.label}
        </Text>
        {(valueName ? item[valueName] === value : item.value === value) && (
          <AntDesign style={styles.icon} color="black" name="check" size={20} />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      maxHeight={300}
      labelField={labelName ? labelName : "label"}
      valueField={valueName ? valueName : "value"}
      onChange={(item) => {
        changeValue(valueName ? item[valueName] : item.value);
      }}
      renderItem={renderItem}
      renderLeftIcon={() => (
        loading ? 
        <ActivityIndicator
          size={"small"}
          color={Colors.primary}
          className="mr-2"
        /> : null
      )}
      {...otherProps}
    />
  );
};

export default DropdownInput;
const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 10,
    height: 50,
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,

    elevation: 5,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
