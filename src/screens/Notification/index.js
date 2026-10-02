import {
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Text,
  TouchableOpacity,
} from "react-native";
import Spacing from "../../constants/Spacing";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import NotFound from "../../components/NotFound";

import { Customer } from "../../http/server-apis";
import Loading from "../../components/Loading";
import NotificationCard from "../../components/Notification/NotificationCard";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

const Notification = ({navigation}) => {
  const {
    AuthInfo: { userId },
  } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [notificationData, setNotificationData] = useState([]);

  const getNotification = async (l=true) => {
    setLoading(l);
    try {
      let { data } = await Customer("get", {
        params: `get-notification`,
        postfix: `?userId=${userId}`,

        token: true,
      });

      setNotificationData(data);
    } catch (error) {
      console.log("Notification  error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got notification data",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );

      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNotification();
  }, []);



  if (loading) return <Loading />;

  return (
    <>
      <ScrollView style={styles.container}>
        {notificationData?.length > 0 ? (
          notificationData?.map((catalog, index) => {
            return <NotificationCard key={index} notification={catalog} reload={()=>getNotification(false)} />;
          })
        ) : (
          <NotFound message={"No Notifications"} />
        )}
      </ScrollView>
      
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing,
  },
});
