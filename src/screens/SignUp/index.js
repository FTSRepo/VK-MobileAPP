import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import AppTextInput from "../../components/FormInputs/AppTextInput";
import { useDispatch } from "react-redux";
import { Customer, login } from "../../http/server-apis";
import { Image } from "react-native";
import { imgUrl } from "../../http/server-base";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    mobile: "",
    password: "",
    shopName: "",
    gstNo: "",
    adharNo: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const validateUser = () => {
    const adharRegex =
      /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
    const mobileRegex = /^([+]\d{2})?\d{10}$/;
   
    let mobiletest = mobileRegex.test(userInfo?.mobile);
    let adhartest = adharRegex.test(userInfo.adharNo);


    if (!mobiletest) {
      ToastAndroid.showWithGravity(
        "Invalid mobile no.",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setLoading(false);
      return {
        err: true,
        message: "Invalid mobile no.",
      };
    }
    if (!adhartest) {
      ToastAndroid.showWithGravity(
        "Invalid adhar",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setLoading(false);
      return {
        err: true,
        message: "Invalid adhar",
      };
    }

    return {
      err: false,
      message: "",
    };
  };

  const signUpHandler = async () => {
    setLoading(true);
    const validate = validateUser();
   

    if (!validate.err)
      try {
        let {
          data,
        } = await Customer("post", {
          params: `create-temp-customer`,
          data: {
            ...userInfo,
          },
        });
        
        if (data?.status === true) {
          ToastAndroid.showWithGravity(
            data?.message ? data?.message : "User created",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.navigate("login");
          setLoading(false)
        } else {
          ToastAndroid.showWithGravity(
            data?.message ? data?.message : "User could not created",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setLoading(false);
        }
      } catch (error) {
        console.log("User data  error ", error?.response);
        ToastAndroid.showWithGravity(
         error?.response?.data?.message ||  "Oops! Could not create user",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );

        setLoading(false);
      }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView className="mx-4 my-4">
        <Image
          source={
            userInfo?.profileImage
              ? { uri: imgUrl + userInfo.profileImage }
              : require("../../../assets/icons/profile.png")
          }
          className="h-36 w-36 mx-auto rounded-full"
          style={{ elevation: 5 }}
        />

        <AppTextInput
          placeholder="Enter Name"
          label="Name"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              name: e,
            })
          }
          value={userInfo?.name}
          disabled={loading ? true : false}
        />
        <AppTextInput
          label="Shop Name"
          placeholder="Enter Shop Name"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              shopName: e,
            })
          }
          disabled={loading ? true : false}
        />
        <AppTextInput
          label="Mobile Number"
          placeholder="Enter Mobile Number"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              mobile: e,
            })
          }
          disabled={loading ? true : false}
        />

        <AppTextInput
          label="GST Number"
          placeholder="Enter Gst Number"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              gstNo: e,
            })
          }
          disabled={loading ? true : false}
        />
        <AppTextInput
          label="Aadhar Number"
          placeholder="Enter Aadhar Number"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              adharNo: e,
            })
          }
          disabled={loading ? true : false}
        />

        <AppTextInput
          label="Password"
          placeholder="Enter Password"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              password: e,
            })
          }
          secureTextEntry={true}
          disabled={loading ? true : false}
        />
        <AppTextInput
          label="Address"
          placeholder="Enter Address"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              address: e,
            })
          }
          disabled={loading ? true : false}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          onPress={signUpHandler}
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
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("login")}
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
            Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  schoolName: {
    fontWeight: "600",
    fontSize: FontSize.xLarge,
  },
  schoolAddress: {
    fontWeight: "600",
    fontSize: FontSize.medium,
  },
  schoolInfo: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
    flex: 1,
  },
  infoText: {
    fontWeight: "600",
    fontSize: FontSize.medium,
  },

  mainContainer: {
    justifyContent: "center",
    marginVertical: Spacing,
    marginHorizontal: Spacing,
    flex: 2,
  },
  bottomText: {
    fontSize: FontSize.medium,
    fontWeight: "900",
    color: Colors.dark,
    textAlign: "center",
    alignItems: "flex-end",
    paddingVertical: Spacing * 2,
  },
});
