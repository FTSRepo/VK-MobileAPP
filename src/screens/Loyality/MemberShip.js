import { Text, View, Image } from "react-native";
import basic from "../../../assets/app_icon/basic.jpg";
import gold from "../../../assets/app_icon/gold.png";
import premium from "../../../assets/app_icon/premium.png";
import vip from "../../../assets/app_icon/vip.png";

import React, {  useLayoutEffect, useState } from "react";

const MemberShip = ({ dashboardData }) => {
  const [icon, setIcon] = useState(basic);

  useLayoutEffect(() => {
    if (dashboardData?.customerCategory === "Premium") setIcon(premium);
    if (dashboardData?.customerCategory === "GOLD") setIcon(gold);
    if (dashboardData?.customerCategory === "GOLD VIP") setIcon(vip);
  }, [dashboardData]);

  return (
    <View className="pt-4 px-4 my-1 min-h-[250px]  bg-amber-50 mx-auto border-l-amber-500 border-l-4 w-[90%] rounded-md ">
      <View className="flex-[2]">
        <Text className="text-amber-500 font-bold text-lg my-1">
          Membership Category{" "}
        </Text>
        <View className="flex-1 items-center justify-center py-2">
          <Image
            source={icon}
            className="w-20 h-20 rounded-full drop-shadow-lg my-2"
          />
          <Text className="  font-bold text-lg py-2 px-4 text-amber-600">
            My Category: {dashboardData?.customerCategory}{" "}
          </Text>
        </View>
      </View>
      <View className="flex-1 flex-row flex-wrap justify-center items-end gap-4 py-2 mb-5">
        <View
          className={`${
            dashboardData?.customerCategory === "Basic"
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
        <View className={`${
            dashboardData?.customerCategory === "Premium"
              ? "bg-amber-400 "
              : "bg-slate-300"
          }  flex flex-row items-center justify-center gap-1 rounded-lg p-1 w-25  `}>
          <Image
            source={premium}
            className="w-4 h-4 rounded-full drop-shadow-lg"
          />

          <Text className=" text-center  text-white text-xs  font-bold ">
            PREMIUM
          </Text>
        </View>
        <View className={`${
            dashboardData?.customerCategory === "GOLD"
              ? "bg-amber-400 "
              : "bg-slate-300"
          }  flex flex-row items-center justify-center gap-1 rounded-lg p-1 w-25  `}>
          <Image
            source={gold}
            className="w-4 h-4 rounded-full drop-shadow-lg"
          />

          <Text className=" text-center  text-white text-xs  font-bold ">
            GOLD
          </Text>
        </View>

        <View className={`${
            dashboardData?.customerCategory === "GOLD VIP"
              ? "bg-amber-400 "
              : "bg-slate-300"
          }  flex flex-row items-center justify-center gap-1 rounded-lg p-1 w-25  `} >
          <Image source={vip} className="w-4 h-4 rounded-full drop-shadow-lg" />

          <Text className=" text-center  text-white text-xs  font-bold ">
            VIP GOLD
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MemberShip;
