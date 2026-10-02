import { Text, View } from "react-native";
import React from "react";

const StatementCard = ({ statement }) => {
  return (
    <View
      style={{
        elevation: 5,
      }}
      className="w-[90%] bg-gray-50 mx-auto  my-2  border-l-red-300 border-l-4  rounded-md overflow-hidden"
    >
      <View className="bg-red-50 px-4 py-2">
        <Text className="text-primary-600 font-bold ">
          Date:{" "}
          <Text className="text-slate-600 ">
            {"  "} {statement?.date}
          </Text>
        </Text>
      </View>
      <View className="bg-white px-4 py-2 ">
        <View className="my-2 flex flex-row  ">
          <Text className="text-blue-500 font-bold text-md flex-[2]">
            Vr.No.
          </Text>
          <Text className="font-bold flex-[4] ">{statement?.vrNo}</Text>
        </View>
        <View className="my-2 flex flex-row  ">
          <Text className="text-blue-500 font-bold text-md flex-[2]">
            Narration{" "}
          </Text>
          <Text className="font-bold flex-[4]  ">{statement?.narration}</Text>
        </View>
        <View className="my-2 flex flex-row  ">
          <Text className="text-blue-500 font-bold   text-md flex-[2]">
            Ammount{" "}
          </Text>
          <Text className={`flex-[4] font-bold    `}>
            ₹{statement?.amount || 0}{" "}
            <Text
              className={`${
                statement?.amountType === "Cr"
                  ? "text-teal-600"
                  : "text-red-500"
              }`}
            >
              {statement?.amountType || ""}
            </Text>
          </Text>
        </View>
        <View className="my-2 flex flex-row  ">
          <Text className="text-blue-500 font-bold text-md flex-[2]">
            Balance
          </Text>
          <Text className={`font-bold flex-[4]  `}>
            ₹{statement?.balance || 0}{" "}
            <Text
              className={`${
                statement?.balanceType === "Cr"
                  ? "text-teal-600"
                  : "text-red-500"
              }`}
            >
              {statement?.balanceType || ""}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StatementCard;
