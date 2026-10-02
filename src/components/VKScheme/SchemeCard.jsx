import { View, Text, ImageBackground, ToastAndroid, Image } from "react-native";
import React from "react";
import orange from "../../../assets/background/orange.jpeg";
import green from "../../../assets/background/green.jpeg";
import yellow from "../../../assets/background/yellow.jpeg";
import black from "../../../assets/background/black.jpeg";
import blue from "../../../assets/background/blue.jpeg";
import darkblue from "../../../assets/background/darkblue.jpeg";
import logo from "../../../assets/background/logo.png";

import { useState } from "react";
import { Scheme } from "../../http/server-apis";
import { useSelector } from "react-redux";
import { imgUrl } from "../../http/server-base";

const SchemeCard = ({ info, scheme, refetch, index }) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const getImage = (color) => {
    if (color) {
      if (color === "orange") return orange;
      if (color === "green") return green;
      if (color === "Red") return black;
      if (color === "Yellow") return yellow;
    } else {
      if (index % 6 === 0) return orange;
      if (index % 6 === 1) return green;
      if (index % 6 === 2) return blue;
      if (index % 6 === 3) return yellow;
      if (index % 6 === 4) return darkblue;
      if (index % 6 === 5) return darkblue;
    }
  };

  const handleRedeem = async () => {
    const params = {
      customerId: userId,
      schemeId: scheme.schemeId,
      slabId: info.slabId,
      brandId: scheme.brandId,
    };
    setLoading(true);

    try {
      let {
        data: { status, data, message },
      } = await Scheme("post", {
        params: `redeem-scheme`,
        data: params,
        token: true,
      });
      if (status === true) {
        refetch();
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
      console.log("Scheme error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not redeem",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <View className={`w-screen  `}>
      <ImageBackground
        // source={getImage(info.bgColour)}
        source={
          scheme.brandImage
            ? { uri: `${imgUrl}/${scheme?.brandImage}` }
            : getImage(info.bgColour)
        }
        style={{ elevation: 5 }}
        resizeMode="cover"
        className="m-4 flex-row min-h-[220] p-4 rounded-md overflow-hidden"
      >
        <View className="flex-1 justify-between items-between">
          <View>
            <View className="flex-row justify-between">
              <Text
                className="text-md font-serif flex-1 text-left font-bold text-white"
                style={{ elevation: 2 }}
              >
                {scheme?.schemeName}
              </Text>
              <Image
                source={logo}
                className="h-12 w-12 "
                style={{ resizeMode: "contain", elevation: 5 }}
              />
            </View>

            <Text
              className="text-sm font-semibold text-white"
              style={{ elevation: 2 }}
            >
              {info?.name}
            </Text>
            <Text
              className="text-xs font-semibold text-white"
              style={{ elevation: 2 }}
            >
              Total purchase value More than
            </Text>
            <Text
              className="text-xs font-semibold text-white"
              style={{ elevation: 2 }}
            >
              ₹{info?.slabRange}
            </Text>
          </View>
          <View className=" ">
            <Text className="text-xs font-semibold text-white text-right p-2">
              Voucher
            </Text>
            <Text className="text-xs font-bold text-right text-white p-2 bg-slate-50/10 rounded-lg ">
              {info?.gift}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SchemeCard;
