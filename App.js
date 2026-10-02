import AppNavigation from "./src/navigation/AppNavigation";
import { store, persistor } from "./src/Store/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Alert, ToastAndroid } from "react-native";
import { useState } from "react";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";

export default function App() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const requestUserPermission = async () => {
    const { status, canAskAgain } = await Notifications.getPermissionsAsync();

    if (status !== "granted" && canAskAgain) {
      await Notifications.requestPermissionsAsync();
    } else if (status === "granted") {
      console.log("Notification permission already granted");
    } else if (!canAskAgain) {
      console.log("Permission denied permanently. Direct user to settings.");
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          if (token) setToken(token);
        });
    } else {
      console.log("Could not get token");
    }

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || "Message",
        remoteMessage.notification?.body
      );
    });

    return unsubscribe;
  }, []);

  async function onFetchUpdateAsync() {
    setLoading(true);
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        ToastAndroid.showWithGravity(
          "App is being update .....",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation token={token} />
      </PersistGate>
    </Provider>
  );
}

// export NODE_OPTIONS=--openssl-legacy-provider
