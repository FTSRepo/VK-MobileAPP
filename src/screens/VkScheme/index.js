import { StyleSheet, ScrollView, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import Spacing from "../../constants/Spacing";
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";
import VKSchemeCard from "../../components/VKScheme/VKSchemCard";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Scheme } from "../../http/server-apis";
import { TouchableOpacity } from "react-native-gesture-handler";
import dayjs from "dayjs";
import LaunchingSoon from "../../components/Launching-soon";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const VkScheme = ({ navigation }) => {
  const {
    UserProfile: { name },
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [schemeData, setSchemeData] = useState([]);
  const [beta, setBeta] = useState(false);

  const getScheme = async (l = true) => {
    setLoading(l);

    try {
      let {
        data: { status, data, message },
      } = await Scheme("get", {
        params: `scheme-dashboard`,
        postfix: `?userId=${userId}`,
        token: true,
      });
      if (status === true) {
        setSchemeData(data);
      } else {
        setLoading(false);

        ToastAndroid.showWithGravity(
          message || "",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
      }
    } catch (error) {
      console.log("Schem error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got scheme data",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getScheme();
  }, []);

  if (dayjs() < dayjs("2023-12-18") && !beta)
    return <LaunchingSoon beta={() => setBeta(true)} />;

  if (loading) {
    return <Loading />;
  }
  return (
    <View className="flex-1">
      <View className="bg-slate-50  p-2 flex-row justify-between">
        <Text className="text-md font-semibold ">
          Welcome {name || "User"} !
        </Text>
       
      </View>
      <View className="bg-slate-50 flex-row gap-2 py-2 justify-center ">
        <TouchableOpacity
          className="bg-red-400 border-2 rounded-lg py-2 px-2  flex-row  border-red-400"
          onPress={() => navigation.navigate("schemeRedeem")}
        >
          <View className="flex-row">
            <MaterialIcons
              name={"multiline-chart"}
              color={"white"}
              style={{
                fontSize: 16,

                paddingHorizontal: 5,
              }}
            />
            <Text className="text-md font-semibold text-white ">
              Redeem Voucher
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-400 border-2 rounded-lg py-2 px-2   border-red-400"
          style={{  }}
          onPress={() => navigation.navigate("schemeHistory")}
        >
          <View className="flex-row">
            <MaterialIcons
              name={"history"}
              color={"white"}
              style={{
                fontSize: 16,

                paddingHorizontal: 5,
              }}
            />
            <Text className="text-md font-semibold text-white ">Redeem History</Text>
          </View>
        </TouchableOpacity>
       
      </View>

      <ScrollView className="flex-1">
        {schemeData.length > 0 ? (
          schemeData.map((scheme, index) => {
            return (
              <VKSchemeCard
                key={index}
                scheme={scheme}
                refetch={() => {
                  getScheme(false);
                }}
                navigation={navigation}
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

export default VkScheme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing,
  },
});
