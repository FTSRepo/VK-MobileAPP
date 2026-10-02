import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { imgUrl } from "../../http/server-base";
import dayjs from "dayjs";

const SchemeHistoryCard = ({ redeem }) => {
  return (
    <View
      style={{
        elevation: 5,
      }}
      className="w-[90%] bg-gray-50 mx-auto  my-2  border-l-blue-300 border-l-4  rounded-md overflow-hidden"
    >
      <View className="bg-blue-50 px-4 py-2">
        <Text className="text-blue-600 font-semibold">
          Request Date :{redeem?.redeemDate}
        </Text>
      </View>
      <View className="bg-white px-4 py-2 ">
        <View className="my-1 flex-row">
          <Text className="text-blue-500 font-bold text-sm flex-[3]">
            Gift:
          </Text>
          <Text className="font-semibold flex-[5] text-sm">{redeem?.gift}</Text>
        </View>
        {redeem.brandName ? (
          <View className="my-1 flex-row">
            <Text className="text-blue-500 font-bold text-sm flex-[3]">
              Brand Name:
            </Text>
            <Text className="font-semibold flex-[5] text-sm">
              {redeem?.brandName}
            </Text>
          </View>
        ) : null}
        <View className="my-1 flex-row">
          <Text className="text-blue-500 font-bold text-sm flex-[3]">
            Scheme Name:
          </Text>
          <Text className="font-semibold flex-[5] text-sm">
            {redeem?.schemeName}
          </Text>
        </View>

        {redeem.slabName ? (
          <View className="my-1 flex-row">
            <Text className="text-blue-500 font-bold text-sm flex-[3]">
              Slab Name:
            </Text>
            <Text className="font-semibold flex-[5] text-sm">
              {redeem?.slabName}
            </Text>
          </View>
        ) : null}
        {redeem.totalPurchase ? (
          <View className="my-1 flex-row">
            <Text className="text-blue-500 font-bold text-sm flex-[3]">
              Slab Amount:
            </Text>
            <Text className="font-semibold flex-[5] text-sm">
              ₹{redeem?.totalPurchase || 0}
            </Text>
          </View>
        ) : null}
        <View className="my-1 flex-row">
          <Text className="text-blue-500 font-bold text-sm flex-[3]">
            Request Status:
          </Text>
          <Text
            className={`font-semibold ${
              redeem.status === "Approved" ? "text-teal-600" : "text-red-400"
            }  flex-[5] text-sm `}
          >
            {redeem?.status || ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SchemeHistoryCard;
