import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
  FlatList,
} from "react-native";
import MenuImage from "../../components/MenuImage/MenuImage";
import Spacing from "../../constants/Spacing";
import HeaderRight from "../../components/HeaderRight/HeaderRight";
import ImageSlider from "./Slider";

import { Auth, Dashboard, User } from "../../http/server-apis";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuth,
  setDashboardInfo,
  setMaintainence,
  setUserDeviceToken,
} from "../../Store/UserSlice";
import { useEffect } from "react";
import { imgUrl } from "../../http/server-base";
import MenuCard from "./MenuCard";

const tileData = [
  {
    id: "1",
    image: require("../../../assets/icons/statement.png"),
    title: "Statements",
    page: "statement",
  },
  {
    id: "2",
    image: require("../../../assets/icons/bilty.png"),
    title: "Bilty",
    page: "bilty",
  },
  {
    id: "3",
    image: require("../../../assets/icons/gift.png"),
    title: "VK Gifts",
    page: "loyality",
  },
  {
    id: "4",
    image: require("../../../assets/icons/anounce.png"),
    title: "VK Scheme",
    page: "scheme",
  },
  {
    id: "2",
    image: require("../../../assets/icons/profile.png"),
    title: "Profilie",
    page: "profile",
  },
  {
    id: "15",
    image: require("../../../assets/icons/call.png"),
    title: "Request Callback",
    page: "",
    function: "callback",
  },
];

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(false);

  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({
    bannerList: [],
    totalPoints: 0,
    redeemedPoints: 0,
    giftsCollected: 0,
    pointsRequiredForPlatinum: 0,
    customerCategory: "Basic",
  });
  const {
    AuthInfo: { userId, accessToken },
    isAuthenticated,
    DeviceToken,
    UserDeviceToken,
    Maintainance,
  } = useSelector((state) => state.user);

  const saveToken = async () => {
    setTokenLoading(true);
    try {
      let { status } = await Auth("post", {
        data: {
          tocken: DeviceToken || "",
          userId: userId,
        },
        params: "saveFirebaseTocken",
      });
      if (status === 200) {
        dispatch(setUserDeviceToken(true));
      }
    } catch (error) {
      setTokenLoading(false);

      console.log(error?.response?.data?.message);
    }
    setTokenLoading(false);
  };

  useEffect(() => {
    if (!UserDeviceToken && !tokenLoading) saveToken();
  }, [UserDeviceToken, tokenLoading]);

  const getUserInfo = async () => {
    try {
      let {
        data: { status, data, message },
      } = await User("get", {
        params: `getbyid/${userId}`,
        token: true,
      });
      if (status === true) {
        dispatch(
          setAuth({
            UserProfile: data,
          })
        );
      } else {
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    } catch (error) {
      console.log("User error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not get user info",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };
  const getDashboardInfo = async () => {
    try {
      let {
        data: { status, data, message },
      } = await Dashboard("get", {
        params: `customer-dashboard`,
        postfix: `?userId=${userId}`,
        token: true,
      });
      if (status === true) {
        dispatch(setDashboardInfo(data));
        setDashboardData(data);
      } else {
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    } catch (error) {
      console.log("Dashboard error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got dashboard data",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  useEffect(() => {
    getUserInfo();
    getDashboardInfo();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <HeaderRight navigation={navigation} />,
    });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) navigation.replace("login");
  }, [isAuthenticated]);

  const checkAppUnderConstruction = async () => {
    try {
      const { data, status } = await Auth("get", {
        params: "checkUnderConsturction",
      });

      if (status === 200) {
        if (data.status)
          dispatch(
            setMaintainence({
              Maintainance: true,
              MaintainanceMsg: data.message,
            })
          );
        else
          dispatch(
            setMaintainence({
              Maintainance: false,
              MaintainanceMsg: data.message,
            })
          );
      }
    } catch (error) {
      dispatch(
        setMaintainence({
          Maintainance: false,
          MaintainanceMsg: "",
        })
      );
    }
  };

  useEffect(() => {
    checkAppUnderConstruction();
  }, []);

  useEffect(() => {
    if (Maintainance) navigation.replace("maintainance");
  }, [Maintainance]);

  return (
    <>
      <View style={styles.homeContainer}>
        <View style={styles.header} className="bg-slate-50">
          <Text className="text-md font-semibold"> Dashboard </Text>
        </View>
        <ScrollView className="">
          <ImageSlider
            baners={
              dashboardData?.bannerList?.filter((b) => !b?.isAdvertisments) ||
              []
            }
            navigation={navigation}
            images={[require("../../../assets/icon.png")]}
          />

          <View className="justify-center items-center py-2">
            <FlatList
              data={tileData}
              renderItem={({ item }) => (
                <MenuCard item={item} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id}
              numColumns={3}
            />
          </View>

          {dashboardData?.bannerList
            ?.filter((b) => b?.isAdvertisments)
            ?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("detail", item)}
                className=" flex mx-4 my-1 rounded-md  p-2"
              >
                <Image
                  source={{
                    uri: `${imgUrl}${item?.imagePath}`,
                  }}
                  className="rounded-md "
                  style={{
                    width: "100%",
                    backgroundColor:"transparent",
                    aspectRatio:3/4,
                    resizeMode: "contain",
                    borderRadius: 8,
                  }}
                />

                <Text
                  className="text-lg text-center font-bold my-2 text-red-400 "
                  numberOfLines={1}
                >
                  {item?.title}
                </Text>
                <Text
                  className="text-md text-center font-semibold  text-black "
                  numberOfLines={3}
                >
                  {item?.description}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  homeContainer: { flex: 1 },
  header: {
    padding: Spacing,
    flexDirection: "row",
  },

  list: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
