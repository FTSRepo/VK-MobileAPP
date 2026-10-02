import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import MenuImage from "../../components/MenuImage/MenuImage";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import HeaderRight from "../../components/HeaderRight/HeaderRight";
import ImageSlider from "./Slider";
import HomeCards from "./HomeCards";
import Chart from "./Chart";
import MemberShip from "./MemberShip";
import { Auth, Dashboard, User } from "../../http/server-apis";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuth,
  setDashboardInfo,
  setUserDeviceToken,
} from "../../Store/UserSlice";
import { useEffect } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function Loyality({ navigation }) {
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
        setLoading(false);
      }
    } catch (error) {
      console.log("User error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not get user info",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      setLoading(false);
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
        setLoading(false);
      }
    } catch (error) {
      console.log("Dashboard error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got dashboard data",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    getDashboardInfo();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) navigation.replace("login");
  }, [isAuthenticated]);

  console.log(dashboardData);

  return (
    <>
      <View style={styles.homeContainer}>
        <ScrollView className="">
          <View className="gap-2 p-2 flex-row">
            <TouchableOpacity
              className="flex-1 border-2 rounded-lg py-2  flex-row border-red-400 bg-red-400"
              onPress={() => navigation.navigate("transaction")}
            >
              <View className="flex-1 flex-row justify-center">
                <MaterialIcons
                  name={"multiline-chart"}
                  color={"white"}
                  style={{
                    fontSize: 16,

                    paddingHorizontal: 5,
                  }}
                />
                <Text className="text-white text-md font-bold">
                  My Transaction
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 border-2 rounded-lg  py-2 flex-row border-red-400 bg-red-400"
              onPress={() => navigation.navigate("history")}
            >
              <View className="flex-1 flex-row justify-center">
                <MaterialIcons
                  name={"show-chart"}
                  color={"white"}
                  style={{
                    fontSize: 16,

                    paddingHorizontal: 5,
                  }}
                />
                <Text className="text-white text-md font-bold">
                  Redeem History
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <HomeCards dashboardData={dashboardData} navigation={navigation} />
          <MemberShip dashboardData={dashboardData} navigation={navigation} />
          <Chart dashboardData={dashboardData} />
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
