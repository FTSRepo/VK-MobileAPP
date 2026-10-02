import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Spacing from "../../constants/Spacing";
import RedeemCard from "../../components/Redeem/RedeemCard";
import { useSelector } from "react-redux";
import { Loyality } from "../../http/server-apis";
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";
import basic from "../../../assets/app_icon/basic.jpg";
import gold from "../../../assets/app_icon/gold.png";
import premium from "../../../assets/app_icon/premium.png";
import vip from "../../../assets/app_icon/vip.png";
import { Image } from "react-native";

const RedeemPoints = ({ navigation }) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const { DashboardInfo } = useSelector((state) => state.user);
  const [catalogData, setCatalogData] = useState([]);
  const [loyalityPoints, setLoyalityPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  const getRedeemCatalog = async (l = true) => {
    setLoading(l);

    try {
      let {
        data: { status, data, message },
      } = await Loyality("get", {
        params: `get-redeem-catalogs`,
        postfix: `?userId=${userId}`,
        token: true,
      });
      if (status === true) {
        setCatalogData(data);
      } else {
        setLoading(false);

        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
      }
    } catch (error) {
      console.log("Catalog error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got catalog data",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      setLoading(false);
    }
  };
  const getPoints = async (l = true) => {
    setLoading(l);
    try {
      let {
        data: { status, data, message },
      } = await Loyality("get", {
        params: `get-loyality-point-by-customer`,
        postfix: `?userId=${userId}`,
        token: true,
      });
      if (status === true) {
        setLoyalityPoints(data);
      } else {
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
      }
    } catch (error) {
      console.log("Point  error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got point data",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRedeemCatalog();
    getPoints();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-center items-end gap-4 my-1">
        <View
          className={`${
            DashboardInfo?.customerCategory === "Basic"
              ? "bg-amber-400 "
              : "bg-slate-300"
          }  flex flex-row items-center justify-center gap-1 rounded-lg p-1 w-25  `}
        >
          <Image
            source={basic}
            className="w-4 h-4 rounded-full drop-shadow-lg "
          />

          <Text className=" text-center  text-white text-xs  font-bold ">
            BASIC
          </Text>
        </View>
        <View
          className={`${
            DashboardInfo?.customerCategory === "Premium"
              ? "bg-amber-400 "
              : "bg-slate-300"
          }  flex flex-row items-center justify-center gap-1 rounded-lg p-1 w-25  `}
        >
          <Image
            source={premium}
            className="w-4 h-4 rounded-full drop-shadow-lg"
          />

          <Text className=" text-center  text-white text-xs  font-bold ">
            PREMIUM
          </Text>
        </View>
        <View
          className={`${
            DashboardInfo?.customerCategory === "GOLD"
              ? "bg-amber-400 "
              : "bg-slate-300"
          }  flex flex-row items-center justify-center gap-1 rounded-lg p-1 w-25  `}
        >
          <Image
            source={gold}
            className="w-4 h-4 rounded-full drop-shadow-lg"
          />

          <Text className=" text-center  text-white text-xs  font-bold ">
            GOLD
          </Text>
        </View>

        <View
          className={`${
            DashboardInfo?.customerCategory === "GOLD VIP"
              ? "bg-amber-400 "
              : "bg-slate-300"
          }  flex flex-row items-center justify-center gap-1 rounded-lg p-1 w-25  `}
        >
          <Image source={vip} className="w-4 h-4 rounded-full drop-shadow-lg" />

          <Text className=" text-center  text-white text-xs  font-bold ">
            VIP GOLD
          </Text>
        </View>
      </View>
      <Text className="mx-auto font-bold text-lg my-2 text-red-400">
        Choose From Your Favourite Products
      </Text>
      <ScrollView className="flex-1">
        {catalogData.length > 0 ? (
          catalogData.map((catalog, index) => {
            return (
              <RedeemCard
                key={index}
                catalog={catalog}
                point={loyalityPoints}
                refetch={() => {
                  getRedeemCatalog(false);
                  getPoints(false);
                }}
              />
            );
          })
        ) : (
          <NotFound message={"Category data not available"} />
        )}
      </ScrollView>
    </View>
  );
};

export default RedeemPoints;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing,
  },
});
