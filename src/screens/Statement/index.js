import { StyleSheet, ScrollView, ToastAndroid, View, Text } from "react-native";
import React from "react";
import Spacing from "../../constants/Spacing";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Bilty } from "../../http/server-apis";
import NotFound from "../../components/NotFound";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from "../../constants/Colors";
import StatementCard from "../../components/Statement/StatementCard";

const Statement = ({ navigation }) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);
  const [statementData, setStatementData] = useState({});
  const [loading, setLoading] = useState(false);

  const getStatementData = async () => {
    try {
      setLoading(true);

      let {
        data: { status, data, message },
      } = await Bilty("get", {
        params: `getStatementsByCustomerId/?customerId=${userId}`,
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
      console.log("Statement error ", error);
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

  console.log(statementData, "statementData");

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1">
      <View className="bg-slate-50 p-2 flex flex-row justify-around gap-2">
        <View className="flex flex-col p-2  ">
          <View className="flex justify-center flex-row gap-2 ">
            <AntDesign
              name={"minuscircle"}
              style={{
                fontSize: 20,
                color: Colors.primary,
              }}
            /> 
            <Text className="text-md font-semibold text-red-400">Debit </Text>
          </View>

          <Text className="text-md font-semibold text-center text-slate-600"> ₹{statementData?.debit || 0}</Text>
        </View>
        <View className="flex flex-col p-2  ">
          <View className="flex justify-center flex-row gap-2 ">
            <AntDesign
              name={"pluscircle"}
              style={{
                fontSize: 20,
                color: Colors.green,
              }}
            /> 
            <Text className="text-md font-semibold text-emerald-400">Credit </Text>
          </View>

          <Text className="text-md font-semibold text-center text-slate-600"> ₹{statementData?.credit || 0}</Text>
        </View>
        <View className="flex flex-col p-2  ">
          <View className="flex justify-center flex-row gap-2 ">
            <FontAwesome
              name={"money"}
              style={{
                fontSize: 20,
                color: Colors.secondary,
              }}
            /> 
            <Text className="text-md font-semibold text-blue-500">Balance </Text>
          </View>

          <Text className="text-md font-semibold text-center text-slate-600"> ₹{statementData?.balance || 0}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 ">
        {statementData?.statementLines?.length > 0 ? (
          statementData?.statementLines?.map((statement, index) => {
            return <StatementCard key={index} statement={statement} />;
          })
        ) : (
          <NotFound message={"Statement data not available"} />
        )}
      </ScrollView>
    </View>
  );
};

export default Statement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing,
  },
});
