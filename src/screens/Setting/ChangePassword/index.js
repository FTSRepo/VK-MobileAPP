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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import Spacing from "../../../constants/Spacing";
import FontSize from "../../../constants/FontSize";
import AppTextInput from "../../../components/FormInputs/AppTextInput";
import { Auth } from "../../../http/server-apis";

const ChangePassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const {UserProfile} = useSelector((state) => state.user);

  const [mobile, setMobile] = useState(UserProfile?.mobile);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("")
  const [loading, setLoading] = useState(false);

 
  

  const validatePassword = () => {
    var re = {
      capital: /(?=.*[A-Z])/,
      length: /(?=.{7,40}$)/,
      digit: /(?=.*[0-9])/,
    };

    return (re.capital.test(password) &&
      re.length.test(password) &&
      re.digit.test(password))
  }

  const passwordHandler = async () => {
    try {

      setLoading(true);
      if (!mobile || !password || !oldPassword) {
        Alert.alert("Invalid credentials", "Please enter all fields", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        setLoading(false);
        return;
      }
      // if (!validatePassword()) {
      //   ToastAndroid.showWithGravity(
      //     "Password must contain 8 character and atleast one uparcase, one lowercase letter and one digit",
      //     ToastAndroid.LONG,
      //     ToastAndroid.CENTER
      //   );
      //   setLoading(false);

      //   return
      // }

      if (password !== cPassword) {
        Alert.alert("Error", "Password did not matched", [
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
          oldPassword
        },
        params: "change-password"
      });
      if (status === true) {
        ToastAndroid.showWithGravity(
          message ? message : "Passwrod updated",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);


        navigation.replace("home");
      } else {
        ToastAndroid.showWithGravity(
          message ? message : "",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
      }
    } catch (error) {
      console.log("Auth change password ", error)
      ToastAndroid.showWithGravity(
        "Oops! Could not change password",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <ScrollView style={styles.container}>




      <View className="mx-4 my-4" >

        <AppTextInput
          label="Mobile Number"
          placeholder="Enter Mobile Number"
          handleChange={(e) => setMobile(e)}
          value={mobile}
          disabled={loading ? true : false}
        />
        <AppTextInput
          label="Old Password"
          placeholder="Enter old password"
          handleChange={(e) => setOldPassword(e)}
          secureTextEntry={true}
          disabled={loading ? true : false}
        />
        <AppTextInput
          label="New Password"
          placeholder="Enter new password"
          handleChange={(e) => setPassword(e)}
          secureTextEntry={true}
          disabled={loading ? true : false}
        />
        <AppTextInput
          label="Verify Password"
          placeholder="Renter new password"
          handleChange={(e) => setCPassword(e)}
          secureTextEntry={true}
          disabled={loading ? true : false}
        />


        <TouchableOpacity

          onPress={passwordHandler}
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
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace("home")}
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
            Home
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

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
