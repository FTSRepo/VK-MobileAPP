import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import Spacing from "../../constants/Spacing";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { Auth } from "../../http/server-apis";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth, setMaintainence } from "../../Store/UserSlice";

const Maintenance = ({navigation}) => {
  const { DeviceToken, Maintainance , MaintainanceMsg} = useSelector((state) => state.user);
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const width = useWindowDimensions("window").width;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);


  const checkAppUnderConstruction = async () => {
    try {
      const { data, status } = await Auth("get", {
        params: "checkUnderConsturction",
      });

      if (status === 200) {
        if (data.status)
          dispatch(
            setMaintainence({
              Maintainance: true,
              MaintainanceMsg: data.message,
            })
          );
        else
          dispatch(
            setMaintainence({
              Maintainance: false,
              MaintainanceMsg: data.message,
            })
          );
      }
    } catch (error) {
      dispatch(
        setMaintainence({
          Maintainance: false,
          MaintainanceMsg: "",
        })
      );
    }
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (!Maintainance) navigation.replace("home");
  }, [Maintainance]);
  useEffect(() => {
    checkAppUnderConstruction();

    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      let { status } = await Auth("post", {
        postfix: `/deleteFirebaseTocken?tocken=${DeviceToken}`,
      });
      if (status === 200) {
        setLoading(false);

        dispatch(removeAuth());
        navigation.replace("login");
      }
    } catch (error) {
      setLoading(false);
      console.log(error)

      ToastAndroid.showWithGravity(
        error?.response?.data?.message || "Oops! Could not logout",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  return (
    <View className="flex-1 my-4">
      <ImageBackground
        resizeMode="contain"
        source={require("../../../assets/splash.png")}
        imageStyle={{ opacity: 0.02 }}
        className="flex-1  justify-center items-center "
      >
        <View className="flex-1 items-center justify-center">
          <Animated.View
            className="bg-red-400/20 rounded-full justify-center "
            style={{
              padding: ring2padding,
            }}
            sharedTransitionTag="splash"
          >
            <Animated.View
              className="bg-red-400/20 rounded-full "
              style={{ padding: ring1padding }}
            >
              <Image
                source={require("../../../assets/app_icon/setting_icon.png")}
                style={{
                  width: width * 0.4,
                  height: width * 0.4,
                  borderRadius: (width * 0.4) / 2,
                  overflow: "hidden",
                }}
              />
            </Animated.View>
          </Animated.View>
        </View>
        <View className="flex-1 justify-center items-center bg-transparent">
          <Text className="text-2xl my-2 font-semibold  text-red-400 ">
            Important Notice
          </Text>
          <Text className="text-md font-semibold text-center my-1 mx-2 text-black/95 ">
            We will be back soon !
          </Text>
          <Text className="text-md font-semibold text-center my-1 mx-2 text-black/95 ">
        {  MaintainanceMsg}
          </Text>

     
          <View className="items-end">
            <TouchableOpacity
              className="mx-4"
              onPress={handleLogout}
              style={{
                padding: Spacing * 2,
                backgroundColor: Colors.primary,
                marginVertical: Spacing * 3,
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
              <Text
                style={{
                  color: Colors.white,
                  textAlign: "center",
                  fontSize: FontSize.large,
                  fontWeight: "800",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Maintenance;

const styles = StyleSheet.create({});
