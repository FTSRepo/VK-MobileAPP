import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons, Feather, AntDesign } from "@expo/vector-icons";
import Spacing from "../../constants/Spacing";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

const HomeCards = ({ dashboardData, navigation }) => {
  return (
    <>
      <View className="p-4 my-1 bg-emerald-50 border-l-emerald-300 border-l-4 mx-auto w-[90%] rounded-md flex  flex-row">
        <View className="flex-1">
          <Text className="text-emerald-400 font-bold text-lg">
            Total Points Available{" "}
          </Text>
          <Text className=" font-bold text-xl text-emerald-500 py-2 px-4">
            {dashboardData?.totalPoints || 0}{" "}
          </Text>
        </View>
        <View className="flex items-end gap-8 py-4">
          <MaterialCommunityIcons
            name="star-four-points"
            size={30}
            color="#34d399"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("redeem")}
            className="bg-emerald-400"
            style={{
              padding: Spacing,

              borderRadius: Spacing,
              shadowColor: Colors.secondary,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
              elevation: 3,
            }}
          >
            <Text className="text-white font-semibold text-md text-center px-4">
              Redeem
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-4 my-1  bg-red-100 border-l-red-400 border-l-4 mx-auto w-[90%] rounded-md flex  flex-row">
        <View className="flex-1">
          <Text className="text-red-400 font-bold text-lg">
            Total Points Redeemed{" "}
          </Text>
          <Text className=" font-bold text-red-500 text-xl py-2 px-4">
            {dashboardData?.redeemedPoints || 0}
          </Text>
        </View>
        <View className="flex items-end gap-8 py-4">
          <Feather name="dollar-sign" size={30} color="#ef4444" />
          <TouchableOpacity
            onPress={() => navigation.navigate("transaction")}
            className="bg-red-400"
            style={{
              padding: Spacing,

              borderRadius: Spacing,
              shadowColor: Colors.secondary,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
              elevation: 3,
            }}
          >
            <Text className="text-white font-semibold text-md text-center px-4">
              More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-4 my-1 bg-blue-50 border-l-blue-300 border-l-4 mx-auto w-[90%] rounded-md flex  flex-row">
        <View className="flex-1">
          <Text className="text-blue-400 font-bold text-lg">
            Total Gift Collected{" "}
          </Text>
          <Text className="text-blue-400 font-bold text-xl py-2 px-4">
            {dashboardData?.giftsCollected || 0}{" "}
          </Text>
        </View>
        <View className="flex items-end gap-8 py-4">
          <AntDesign name="gift" size={30} color="#3b82f6" />
          <TouchableOpacity
            onPress={() => navigation.navigate("history")}
            className="bg-blue-400"
            style={{
              padding: Spacing,

              borderRadius: Spacing,
              shadowColor: Colors.secondary,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
              elevation: 3,
            }}
          >
            <Text className="text-white font-semibold text-md text-center px-4">
              More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default HomeCards;
