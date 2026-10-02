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
import Spacing from "../../constants/Spacing";
import { useSelector } from "react-redux";
import SchoolInfo from "../../constants/SchoolInfo";
import { getPrefix } from "../../utils";

const width = Dimensions.get("window").width;
const ImageUrl = SchoolInfo.ImageUrl;

const MenuCard = ({ index }) => {
  const {
    UserInfo: { userName, address, logo , userType , gender},
    UserProfile: { profileImg },
  } = useSelector((state) => state.user);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <View style={styles.profileIcon}>
          {logo ? (
            <Image
              source={{
                uri: `${ImageUrl}${logo}`,
              }}
              resizeMode="cover"
              className="w-[150] h-[150] rounded-full"
            />
          ) : (
            <Image
              source={require("../../../assets/icons/profile.png")}
              style={styles.icon}
            />
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.text}>{getPrefix(userType , gender)}{userName} </Text>
          <Text style={styles.text1}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  itemContainer: {
    height: 300,
    margin: Spacing,
  },
  item: {
    flex: 1,
    margin: 3,
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 1,
  },
  profileIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: FontSize.xLarge,
    overflow: "hidden",
    padding: 2,
    fontWeight: "800",
  },
  text1: {
    marginHorizontal: 2,
    fontSize: FontSize.medium,
    overflow: "hidden",
    padding: 2,
    fontWeight: "800",
    color: Colors.gray,
  },
});
