import {
  ActivityIndicator,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { Scheme } from "../../http/server-apis";
import { useState } from "react";
import moment from "moment";

const RedeemVoucherCard = ({ redeem, refetch }) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const handleRedeem = async () => {
    const params = {
      userId,
      schemeId: redeem.schemeId,
      slabId: redeem.slabId,
      brandId: redeem.brandId,
      brandCode: redeem.brandCode,
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
        ToastAndroid.showWithGravity(
          message || "Redeemed",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
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
  const disable = () => {
    if (moment() < moment(`${redeem?.redeemDate}`, "DD/MM/YYYY")) return true;
    else return false;
  };

  return (
    <View
      style={{
        elevation: 5,
      }}
      className="w-[90%] bg-gray-50 mx-auto  my-2  border-l-blue-300 border-l-4  rounded-md overflow-hidden"
    >
      <View className="bg-white px-4 py-2 ">
        <View className="my-1 flex-row">
          <Text className="text-blue-500 font-bold text-sm flex-[3]">
            Gift:
          </Text>
          <Text className="font-semibold flex-[5] text-sm">{redeem?.gift}</Text>
        </View>
        {redeem?.brandName ? (
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

        {redeem?.slab ? (
          <View className="my-1 flex-row">
            <Text className="text-blue-500 font-bold text-sm flex-[3]">
              Slab :
            </Text>
            <Text className="font-semibold flex-[5] text-sm">
              {redeem?.slab}
            </Text>
          </View>
        ) : null}
        {redeem?.totalPurchase ? (
          <View className="my-1 flex-row">
            <Text className="text-blue-500 font-bold text-sm flex-[3]">
              Total Purchase:
            </Text>
            <Text className="font-semibold flex-[5] text-sm">
              ₹{redeem?.totalPurchase || 0}
            </Text>
          </View>
        ) : null}

        <View className="my-1 ">
          <TouchableOpacity
            onPress={handleRedeem}
            disabled={!redeem?.isRedeemEligible || loading}
            className={`${!redeem?.isRedeemEligible ? "bg-red-300" : "bg-red-400"} `}
            style={{
              padding: Spacing,

              borderRadius: Spacing,
              shadowColor: Colors.primary,
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
            {loading && (
              <ActivityIndicator
                color={Colors.white}
                style={{ paddingRight: 5 }}
              />
            )}
            <Text className="text-white font-semibold text-md text-center px-4">
              Redeem Now
            </Text>
          </TouchableOpacity>
          {disable() ? (
            <Text className="text-xs text-gray-600 font-semibold my-2">
              ** This scheme will be available from{" "}
              {moment(`${redeem?.redeemDate}`, "DD/MM/YYYY").format(
                "DD-MMM-YYYY"
              )}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default RedeemVoucherCard;
