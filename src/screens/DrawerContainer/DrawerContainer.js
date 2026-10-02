import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ToastAndroid,
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../../constants/Colors.js";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Navigation from "../../data/DrawerNavigation.json";
import { useSelector, useDispatch } from "react-redux";
import { removeAuth } from "../../Store/UserSlice.js";
import { imgUrl } from "../../http/server-base.js";
import { Auth } from "../../http/server-apis.js";
import { ActivityIndicator } from "react-native";

export default function DrawerContainer(props) {
  const { navigation } = props;
  const {
    UserProfile: { name, profilePic },
    DeviceToken,
  } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      let { status } = await Auth("post", {
        postfix: `/deleteFirebaseTocken?tocken=${DeviceToken}`,
      });
      if (status === 200) {
        setLoading(false);

        dispatch(removeAuth());
        navigation.navigate("login");
      }
    } catch (error) {
      setLoading(false);

      ToastAndroid.showWithGravity(
        error?.response?.data?.message || "Oops! Could not logout",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View className="flex-[2]  justify-center items-center bg-red-400">
        <Image
          style={{
            height: 100,
            width: 100,
            marginBottom: 20,
            borderRadius: 50,
            overflow: "hidden",
            elevation: 5,
          }}
          resizeMode="cover"
          source={
            profilePic
              ? {
                  uri: `${imgUrl}${profilePic}`,
                }
              : require("../../../assets/icons/profile.png")
          }
        />
        <Text className="text-lg font-extrabold text-white">
          {name ? name : "User"}
        </Text>
      </View>
      <View className="flex-[5] mt-10">
        {Navigation.map((nav, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="flex-row px-4 items-center py-2 "
              onPress={() =>
                nav?.navigate
                  ? navigation.navigate(nav.navigate ? nav.navigate : "404")
                  : Linking.openURL(nav?.url)
              }
            >
              <MaterialIcons
                name={nav.icon}
                style={{
                  fontSize: 16,
                  flex: 1,
                  paddingHorizontal: 5,
                  color: Colors.primary,
                }}
              />
              <Text
                className={`text-md font-semibold flex-[5] `}
                style={{
                  color: Colors.primary,
                }}
              >
                {nav.name}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          className="flex-row px-4 items-center py-2 "
          onPress={handleLogout}
        >
          {loading ? (
            <ActivityIndicator
              color={Colors.primary}
              size={16}
              style={{
                flex: 1,

                paddingHorizontal: 5,
              }}
            />
          ) : (
            <MaterialIcons
              name="logout"
              style={{
                fontSize: 16,
                flex: 1,

                paddingHorizontal: 5,
                color: Colors.primary,
              }}
            />
          )}
          <Text
            className={`text-md font-semibold flex-[5] `}
            style={{
              color: Colors.primary,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
