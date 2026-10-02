import { StyleSheet, ScrollView, ToastAndroid } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Loyality, Scheme } from "../../http/server-apis";
import NotFound from "../../components/NotFound";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import HistoryCard from "../../components/RedeemHistory/HistoryCard";
import RedeemVoucherCard from "../../components/VKScheme/RedeemVoucherCard";

const RedeemVoucher = ({ navigation }) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRedeemVoucher = async (l) => {
    try {
      setLoading(l || false);

      let { data } = await Scheme("get", {
        params: `get-scheme-redeem`,
        postfix: `?userId=${userId}`,
        token: true,
      });

      if (data.status === true) {
        setTransactionData(data?.data || []);
      } else {
        ToastAndroid.showWithGravity(
          data?.message || "",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
      }
    } catch (error) {
      console.log("Transaction error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got redeem voucher",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getRedeemVoucher(true);
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView className="flex-1 ">
      {transactionData.length > 0 ? (
        transactionData.map((transaction, index) => {
          return (
            <RedeemVoucherCard
              key={index}
              redeem={transaction}
              refetch={()=>getRedeemVoucher(true)}
              navigation={navigation}
            />
          );
        })
      ) : (
        <NotFound message={"Redeem voucher not available"} />
      )}
    </ScrollView>
  );
};

export default RedeemVoucher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing,
  },
});
