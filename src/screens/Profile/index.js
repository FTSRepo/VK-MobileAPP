import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Customer, User } from "../../http/server-apis";
import AppTextInput from "../../components/FormInputs/AppTextInput";
import { useState } from "react";
import Colors from "../../constants/Colors";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import { baseUrl, imgUrl } from "../../http/server-base";
import ImageModal from "../../components/ImageModal";
import FormData from "form-data";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { setProfilePic } from "../../Store/UserSlice";

const Profile = ({ navigation }) => {
  const {
    AuthInfo: { userId, accessToken },
  } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    profileImage: "",
    whatsAppNumber: "",
    address: "",
    doB: null,
    maritalStatus: false,
    dateOfAnniversary: null,
    isActive: true,
    pointsEarned: 0,
    accountNo: null,
    gstNo: null,
    adharNo: null,
    shopName: null,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // Android photo picker; needs no storage/media permission (Play policy).
  async function selectFile() {
    setImageModal(false);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    } catch (err) {
      setImage(null);
      return false;
    }
  }

  const openCamera = async () => {
    setImageModal(false);
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      type: "image/*",
    });

    // Explore the result

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const getUserProfile = async () => {
    setLoading(true);
    try {
      let {
        data: { status, data, message },
      } = await User("get", {
        params: `get-user-profile`,
        postfix: `?userId=${userId}`,
        token: true,
      });
      if (status === true) {
        setUserInfo({
          name: data?.customer?.name || "",
          mobile: data?.customer?.mobile || "",
          whatsAppNumber: data?.customer?.whatsAppNumber || "",
          doB: data?.customer?.doB || "",
          address: data?.customer?.address || "",
          profileImage: data?.customer?.profileImage || "",
          dateOfAnniversary: data?.customer?.dateOfAnniversary || "",
        });
      } else {
        ToastAndroid.showWithGravity(
          message ? message : "could not get user profile",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
      }
    } catch (error) {
      console.log("User data  error ", error);
      ToastAndroid.showWithGravity(
        "Oops! Could not got user data",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );

      setLoading(false);
    }
    setLoading(false);
  };
  const validateUser = () => {
    const mobileRegex = /^([+]\d{2})?\d{10}$/;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    const dateRegex =
      /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])$/;

    let emailtest = userInfo.email ? emailRegex.test(userInfo?.email) : true;
    let mobiletest = mobileRegex.test(userInfo?.mobile);
    let whatsapptest = userInfo.whatsAppNumber
      ? mobileRegex.test(userInfo?.whatsAppNumber)
      : true;
    let dobTest = userInfo.doB ? dateRegex.test(userInfo.doB) : true;
    let aniversaryTest = userInfo?.dateOfAnniversary
      ? dateRegex.test(userInfo.dateOfAnniversary)
      : true;

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
    if (!whatsapptest) {
      ToastAndroid.showWithGravity(
        "Invalid whatsapp no.",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setLoading(false);
      return {
        err: true,
        message: "Invalid whatsapp no.",
      };
    }
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
    if (!emailtest) {
      ToastAndroid.showWithGravity(
        "Invalid email",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setLoading(false);
      return {
        err: true,
        message: "Invalid email",
      };
    }
    if (!dobTest) {
      ToastAndroid.showWithGravity(
        "Invalid date format use yyyy-mm-dd",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setLoading(false);
      return {
        err: true,
        message: "Invalid email",
      };
    }
    if (!aniversaryTest) {
      ToastAndroid.showWithGravity(
        "Invalid date format use yyyy-mm-dd",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setLoading(false);
      return {
        err: true,
        message: "Invalid email",
      };
    }

    return {
      err: false,
      message: "",
    };
  };
  
  const updateUserProfile = async () => {
    setLoading(true);
    const validate = validateUser();
    if (!validate.err)
      try {
        let {
          data,
        } = await Customer("post", {
          params: `update-customer`,
          token: true,
          data: {
            name:userInfo.name,
            email:userInfo.email,
            mobile:userInfo.mobile,
            waNumber:userInfo.whatsAppNumber,
            address:userInfo.address,
            doB:userInfo.doB,
            dateOfAnniversary :userInfo.dateOfAnniversary,
            customerNumber: userId,
          },
        });
      
        if (data.status === true) {
          ToastAndroid.showWithGravity(
            message ? message : "User updated",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.replace("home");
        } else {
          ToastAndroid.showWithGravity(
            message ? message : "User could not updated",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setLoading(false);
        }
      } catch (error) {
        console.log("User data  error ", error.response);
        ToastAndroid.showWithGravity(
          error?.response?.data?.message || "Oops! Could not update user data",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );

        setLoading(false);
      }
    setLoading(false);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const uploadImage = async () => {
    setLoading(true);
    if (image != null) {
      const data = new FormData();
      data.append("file", {
        uri: image.uri,
        name: image?.name || image.uri.slice(-10),
        type: image?.mimeType || "image/jpeg",
      });

      try {
        const response = await axios.post(
          baseUrl + `User/upload-profile-image/?userId=${userId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          if (response.data?.newFile) {
            setLoading(false);

            dispatch(setProfilePic(response.data.newFile));
            ToastAndroid.showWithGravity(
              "Profile image uploaded successfully",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
          } else {
            setLoading(false);

            ToastAndroid.showWithGravity(
              "Profile image could not uploaded",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
          }
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        ToastAndroid.showWithGravity(
          error?.response?.data?.message || "Profile image could not uploaded",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
    }
  };

  useEffect(() => {
    if (image) uploadImage();
  }, [image]);

  return (
    <View className="flex-1  my-4">
      <ScrollView className="mx-4 mb-4">
        <TouchableOpacity onPress={() => setImageModal(true)} className="items-center justify-center relative">
          <View className=" border-red-400  border-4  rounded-full bo">
          <Image
            source={
              image
                ? { uri: image?.uri }
                : userInfo?.profileImage
                ? { uri: imgUrl + userInfo.profileImage }
                : require("../../../assets/icons/profile.png")
            }
            className="h-36 w-36 mx-auto rounded-full  border-red-400  border-4"
            style={{ elevation: 5 }}
          />
          </View>
         
          <View className="pl-16 mt-[-20px]">
          <AntDesign name="camera" size={40} className="" color={Colors.primary} />

          </View>
        </TouchableOpacity>

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
          label="Mobile Number"
          placeholder="Enter Mobile Number"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              mobile: e,
            })
          }
          value={userInfo?.mobile}
          disabled={loading ? true : false}
        />
        <AppTextInput
          label="Whatsapp Number"
          placeholder="Enter Whatsapp Number"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              whatsAppNumber: e,
            })
          }
          value={userInfo?.whatsAppNumber}
          disabled={loading ? true : false}
        />
        <AppTextInput
          label="Email Address"
          placeholder="Enter Email Address"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              email: e,
            })
          }
          value={userInfo?.email}
          disabled={loading ? true : false}
        />
        {/* <View className="flex-row items-center justify-between">
          <View>
            <Text className="font-semibold text-slate-600 pl-2 my-2">
              Date of Birth :  {userInfo?.doB ? dayjs(userInfo.doB).format("DD MMM YYYY") : "Not added"}
            </Text>
          </View>

          <View className="mx-auto">
            <AntDesign
              name="calendar"
              size={34}
              color={Colors.primary}

              onPress={() => setDobModal(true)}
            />
          </View>

        </View>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="font-semibold text-slate-600 pl-2 my-2">
              Date of Birth :  {userInfo?.dateOfAnniversary ? dayjs(userInfo.dateOfAnniversary).format("DD MMM YYYY") : "Not added"}
            </Text>
          </View>

          <View className="mx-auto">
            <AntDesign
              name="calendar"
              size={34}
              color={Colors.primary}

              onPress={() => setAniversaryModal(true)}
            />
          </View>

        </View> */}
        <AppTextInput
          label="DOB (YYYY-MM-DD)"
          placeholder="YYYY-MM-DD"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              doB: e,
            })
          }
          value={userInfo?.doB}
          disabled={loading ? true : false}
        />
        <AppTextInput
          label="Aniversary Date (YYYY-MM-DD)"
          placeholder="YYYY-MM-DD"
          handleChange={(e) =>
            setUserInfo({
              ...userInfo,
              dateOfAnniversary: e,
            })
          }
          value={userInfo?.dateOfAnniversary}
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
          value={userInfo.address}
          secureTextEntry={true}
          disabled={loading ? true : false}
          multiline
          numberOfLines={4}
        />
      </ScrollView>
      <TouchableOpacity
        className="mx-4"
        onPress={updateUserProfile}
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
          <ActivityIndicator color={Colors.white} style={{ paddingRight: 5 }} />
        )}
        <Text
          style={{
            color: Colors.white,
            textAlign: "center",
            fontSize: FontSize.large,
            fontWeight: "800",
          }}
        >
          Update Profile
        </Text>
      </TouchableOpacity>

      {/* {dobModal ? (
        <CalenderModal
          setDate={(e) => setUserInfo({
            ...userInfo,
            doB: e
          })}
          closeModal={() => setDobModal(false)}
        />
      ) : null}
      {aniversaryModal ? (
        <CalenderModal
          setDate={(e) => setUserInfo({
            ...userInfo,
            dateOfAnniversary: e
          })}
          closeModal={() => setAniversaryModal(false)}
        />
      ) : null} */}
      {imageModal ? (
        <ImageModal
          selectFile={selectFile}
          openCamera={openCamera}
          closeModal={() => setImageModal(false)}
        />
      ) : null}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
