import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
const width = Dimensions.get("window").width;

const MenuTile = ({ index, item, navigation ,dashboardData }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.page ? item.page : "404")}
    >
      <View style={styles.item}>
        <View style={styles.info}>
          <Image source={item.image} alt="home" style={styles.icon} />
          <Text style={styles.infoTitle}>{item.title}</Text>
          <Text style={styles.data}>{dashboardData[item.data]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuTile;

const styles = StyleSheet.create({
  itemContainer: {
    width: width / 3 - 10,
    height: 150,
    elevation: 5,
  },
  item: {
    flex: 1,
    margin: 3,
    borderRadius: 5,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row",
    gap: 1,
    backgroundColor: Colors.white,
    padding: 5,
  },
  data: {
    // flex:1,

    // justifyContent:"center",
    // alignSelf:"center",
    fontSize: FontSize.medium,
    fontWeight: "600",
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    maxWidth: 50,
    maxHeight: 50,
  },
  infoTitle: {
    fontSize: FontSize.small,
    fontWeight: "600",
    alignSelf: "center",
  },
});
