import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  BackHandler,
} from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import AppTextInput from "../../components/FormInputs/AppTextInput";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setUserDeviceToken } from "../../Store/UserSlice";
import { Auth } from "../../http/server-apis";
import DropdownInput from "../../components/FormInputs/Dropdown";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { DeviceToken } = useSelector((state) => state.user);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [accountData, setAccountData] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const saveToken = async (userInfo) => {
    try {
      let {
        status
      } = await Auth("post", {
        data: {
          tocken: DeviceToken || "",
          userId: userInfo?.userId,
        },
        params: "saveFirebaseTocken",
      });
      if(status === 200){
        dispatch(setUserDeviceToken(true))}
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };


  console.log(accountData)
  const loginHandler = async () => {
    try {
      setLoading(true);
      if (!mobile || !password) {
        Alert.alert("Invalid Credntials", "Please use valid credential", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        setLoading(false);
        return;
      }
      let {
        data: { status, data, message },
      } = await Auth("post", {
        data: {
          mobile,
          password,
          accountId,
        },
        params: "v1_validate",
      });
      if (status === true) {
        dispatch(
          setAuth({
            AuthInfo: data,
            isAuthenticated: true,
          })
        );
        await saveToken(data);
        if (mobile === password) navigation.replace("password");
        else navigation.replace("home");
      } else {
        Alert.alert("Invalid Credntials", "Please use valid credential", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        setLoading(false);
      }
    } catch (error) {
     
      ToastAndroid.showWithGravity(
        "Oops! Could not login",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      console.log(error);
      setLoading(false);
    }
  };

  const getAccount = useMemo(async () => {
    const mobileRegex = /^([+]\d{2})?\d{10}$/;

    if (mobileRegex.test(mobile)) {
      setAccountLoading(true);
      try {
        const { data } = await Auth("get", {
          params: "GetAccountNameByMobile",
          postfix: `?Mobile=${mobile}`,
        });
        if (data.status === true) setAccountData(data.data);
      } catch (error) {
        console.log(error);
      }
      setAccountLoading(false);
    }

    return [];
  }, [mobile]);

  const backActionHandler = () => {
    Alert.alert("Alert!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backActionHandler
    );

    // removeEventListener no longer exists in React Native 0.77+
    return () => subscription.remove();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        className="h-[200px] w-[250px] mx-auto  py-20"
        resizeMode="contain"
        source={require("../../../assets/logo.png")}
      />
      <View className="mx-4">
        <AppTextInput
          placeholder="Enter Mobile Number"
          handleChange={(e) => setMobile(e)}
          disabled={loading ? true : false}
        />
        <AppTextInput
          placeholder="Password"
          handleChange={(e) => setPassword(e)}
          secureTextEntry={true}
          disabled={loading ? true : false}
        />
        <DropdownInput
          placeholder="Select Account"
          data={accountData || []}
          value={accountId}
          changeValue={(value) => setAccountId(value)}
          labelName="accountName"
          valueName="accountId"
          loading={accountLoading}
        />
        <Text
          style={{
            fontSize: FontSize.small,
            color: Colors.primary,
            alignSelf: "flex-end",
          }}
        >
          Forgot your password ?
        </Text>

        <TouchableOpacity
          onPress={loginHandler}
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
            Sign in 
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("signup")}
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.secondary,
            borderRadius: Spacing,
            shadowColor: Colors.secondary,
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
          <Text
            style={{
              color: Colors.white,
              textAlign: "center",
              fontSize: FontSize.large,
              fontWeight: "800",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    justifyContent: "center",
    marginVertical: Spacing,
    marginHorizontal: Spacing,
    flex: 2,
  },
});
