import { StyleSheet, ScrollView, ToastAndroid } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import TransactionCard from "../../components/Transaction/TransactionCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Customer } from "../../http/server-apis";
import NotFound from "../../components/NotFound";
import { useEffect } from "react";
import Loading from "../../components/Loading";

const Transaction = ({ navigation }) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const [transactionData, setTransactionData] = useState([])
  const [loading, setLoading] = useState(false)

  const getTransaction = async () => {

    try {
      setLoading(true)

      let {
        data,
      } = await Customer("get", {
        params: `get-customers-transactions`,
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
    getTransaction()


  }, [])
  if (loading) {
    return <Loading/>
  }

  return (
    <ScrollView className="flex-1 ">


     {transactionData.length > 0 ? transactionData.map((transaction, index) => {
        return <TransactionCard key={index} transaction={transaction} />
      }) : <NotFound message={"Transaction data not available"} />} 

    </ScrollView>
  )
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing,
  },
});
