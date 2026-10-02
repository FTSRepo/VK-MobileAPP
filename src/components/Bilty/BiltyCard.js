import { Text, View } from "react-native";
import React from "react";

const BiltyCard = ({ bilty }) => {
  console.log(bilty);
  return (
    <View
      style={{
        elevation: 5,
      }}
      className="w-[90%] bg-gray-50 mx-auto  my-2  border-l-red-300 border-l-4  rounded-md overflow-hidden"
    >
      <View className="bg-red-50 px-4 py-2 flex flex-row  justify-between">
        <Text className="text-primary-600 font-semibold ">
          Invoice No.:{" "}
          <Text className="text-slate-600 ">
            {"  "} {bilty?.invoiceNo}
          </Text>
        </Text>
        <Text className="text-primary-600 font-semibold ">
          Date:{" "}
          <Text className="text-slate-600 ">
            {"  "} {bilty?.biltyDate}
          </Text>
        </Text>
      </View>
      <View className="bg-white px-4 py-2 ">
        <View className="my-2 flex flex-row  ">
          <Text className="text-blue-500 font-bold text-sm flex-[2]">
            Bilty.No.
          </Text>
          <Text className="font-bold flex-[4] ">{bilty?.biltyNo}</Text>
        </View>
        <View className="my-2 flex flex-row  ">
          <Text className="text-blue-500 font-bold text-sm flex-[2]">
            Bilty Date{" "}
          </Text>
          <Text className="font-bold flex-[4]  ">{bilty?.biltyDate}</Text>
        </View>
        <View className="my-2 flex flex-row  ">
          <Text className="text-blue-500 font-bold text-sm flex-[2]">
            No. of Bales{" "}
          </Text>
          <Text className="font-bold flex-[4]  ">{bilty?.noOfBales}</Text>
        </View>
        <View className="my-2 flex flex-row  ">
          <Text className="text-blue-500 font-bold text-sm flex-[2]">
            Transporter
          </Text>
          <Text className="font-bold flex-[4]  ">{bilty?.transporterName}</Text>
        </View>
      </View>
    </View>
  );
};

export default BiltyCard;
