import { StyleSheet, ScrollView, ToastAndroid, View, Text } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Bilty } from "../../http/server-apis";
import NotFound from "../../components/NotFound";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import BiltyCard from "../../components/Bilty/BiltyCard";

const BiltyPage = ({ navigation }) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const [statementData, setStatementData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStatementData = async () => {
    try {
      setLoading(true);

      let {
        data: { status, data, message },
      } = await Bilty("get", {
        params: `getBiltyByCustomerId/?customerId=${userId}`,
        token: true,
      });

      if (status === true) {
        setStatementData(data);
      } else {
        ToastAndroid.showWithGravity(
          message || "",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
      }
    } catch (error) {
      console.log("Bilty error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got Statement data",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getStatementData();
  }, []);


  if (loading) {
    return <Loading />;
  }

  return (

      <ScrollView className="flex-1 ">
        {statementData?.length > 0 ? (
          statementData?.map((bilty, index) => {
            return <BiltyCard key={index} bilty={bilty} />;
          })
        ) : (
          <NotFound message={"Bilty data not available"} />
        )}
      </ScrollView>
  );
};

export default BiltyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing,
  },
});
