import { StyleSheet, ScrollView, ToastAndroid } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import { useState } from "react";
import { useSelector } from "react-redux";
import {  Loyality } from "../../http/server-apis";
import NotFound from "../../components/NotFound";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import HistoryCard from "../../components/RedeemHistory/HistoryCard";

const RedeemHistory = ({ navigation }) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const [transactionData, setTransactionData] = useState([])
  const [loading, setLoading] = useState(false)

  const getRedeemHistory = async () => {

    try {
      setLoading(true)

      let {
        data,
      } = await Loyality("get", {
        params: `get-customer-redeem`,
        postfix: `?customerId=${userId}`,
        token: true
      });
      
      if (data.status === true) {
        setTransactionData(data?.data || [])
      } else {
        ToastAndroid.showWithGravity(
          data?.message ||"",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
      }
    } catch (error) {
      console.log("Transaction error ", error)
      ToastAndroid.showWithGravity(
        "Oops! Could not got Transaction data",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );


    }
    setLoading(false);
  }


  useEffect(() => {
    getRedeemHistory()


  }, [])
  if (loading) {
    return <Loading/>
  }

  return (
    <ScrollView className="flex-1 ">


     {transactionData.length > 0 ? transactionData.map((transaction, index) => {
        return <HistoryCard key={index} redeem={transaction} />
      }) : <NotFound message={"Transaction data not available"} />} 

    </ScrollView>
  )
};

export default RedeemHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing,
  },
});
