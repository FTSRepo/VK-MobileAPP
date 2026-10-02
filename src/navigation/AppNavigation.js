import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home/HomeScreen.js";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer.js";
import Login from "../screens/Login/Login.js";
import SplashScreen from "../screens/Splash/SplashScreen.js";
import Colors from "../constants/Colors";
import CommingSoon from "../screens/CommingSoon/CommingSoon.js";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "../screens/Setting/ChangePassword";
import Profile from "../screens/Profile";
import SignUp from "../screens/SignUp/index.js";
import RedeemPoints from "../screens/RedeemPoints/index.js";
import Transaction from "../screens/Transaction/index.js";
import RedeemHistory from "../screens/RedeemHistory/index.js";
import Notification from "../screens/Notification/index.js";
import { Modal } from "react-native";
import { Auth } from "../http/server-apis.js";
import UpdateModal from "../components/Update/UpdateModal.js";
import { setToken } from "../Store/UserSlice.js";
import FontSize from "../constants/FontSize.js";
import VkScheme from "../screens/VkScheme/index.js";
import SchemeHistory from "../screens/SchemeHistory/index.js";
import Loyality from "../screens/Loyality/index.js";
import AdvertisementDetail from "../screens/Home/AdvertisementDetail.jsx";
import RedeemVoucher from "../screens/RedeemVoucher/index.js";
import Maintenance from "../screens/Maintenance";
import Bilty from "../screens/Bilty/index.js";
import Statement from "../screens/Statement/index.js";
import linking from "../../linking.js";

const Stack = createStackNavigator();
function MainNavigator() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "home" : "login"}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.background,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: FontSize.medium,
          color: Colors.white,
        },
      }}
    >
      <Stack.Screen
        name="splash"
        title="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
        }}
        title="Sign Up"
        component={SignUp}
      />
      <Stack.Screen
        name="home"
        component={isAuthenticated ? HomeScreen : Login}
        options={{
          title: "",
        }}
      />

      <Stack.Screen
        name="maintainance"
        component={Maintenance}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="password"
        component={ChangePassword}
        options={{
          title: "Change Password",
        }}
      />

      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          title: "My Profile",
        }}
      />
      <Stack.Screen name="detail" component={AdvertisementDetail} />
      <Stack.Screen
        name="loyality"
        component={Loyality}
        options={{
          title: "VK Gift",
        }}
      />
      <Stack.Screen
        name="redeem"
        component={RedeemPoints}
        options={{
          title: "Redeem Points",
        }}
      />

      <Stack.Screen
        name="transaction"
        component={Transaction}
        options={{
          title: "My Transaction",
        }}
      />
      <Stack.Screen
        name="history"
        component={RedeemHistory}
        options={{
          title: "Redeem History",
        }}
      />
      <Stack.Screen
        name="scheme"
        component={VkScheme}
        options={{
          title: "VK-Scheme",
        }}
      />
      <Stack.Screen
        name="schemeHistory"
        component={SchemeHistory}
        options={{
          title: "VK-Scheme History",
        }}
      />
      <Stack.Screen
        name="schemeRedeem"
        component={RedeemVoucher}
        options={{
          title: "Redeem Voucher",
        }}
      />
      <Stack.Screen
        name="notification"
        component={Notification}
        options={{
          title: "Notifications",
        }}
      />

      <Stack.Screen
        name="statement"
        component={Statement}
        options={{
          title: "Account Statement",
        }}
      />
      <Stack.Screen
        name="bilty"
        component={Bilty}
        options={{
          title: "Bilty Detail",
        }}
      />
      <Stack.Screen
        name="404"
        component={CommingSoon}
        options={{
          headerTitle: "Data Not Available",
        }}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

export default function AppNavigation({ token }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  let AppVersion = 21;

  const getAPPVersion = async () => {
    const { data } = await Auth("get", {
      params: `AppVersion`,
    });


    if (data.status == true) {
      setUpdateData(data.data);
      if (+data.data.currentVersion > +AppVersion) {
        setModalVisible(true);
      }
    }
  };
  useEffect(() => {
    getAPPVersion();
  }, []);

  useEffect(() => {
    dispatch(setToken(token));
  }, [token]);

  return (
    <NavigationContainer linking={linking}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <UpdateModal updateData={updateData} />
      </Modal>
      <DrawerStack />
    </NavigationContainer>
  );
}
