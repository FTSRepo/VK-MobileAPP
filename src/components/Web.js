import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { BackHandler, Platform } from "react-native";
import { WebView } from "react-native-webview";

import NetInfo from "@react-native-community/netinfo";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";

const Web = ({ url }) => {
  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(true);
  const [connection, setConnection] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", HandleBackPressed);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", HandleBackPressed);
      };
    }
  }, [canGoBack]);

  useEffect(() => {
    checkConnection();
  }, []);

  const HandleBackPressed = () => {
    if (webView.current && canGoBack) {
      webView.current.goBack();
      return true;
    }

    return false;
  };

  const checkConnection = () => {
    NetInfo.addEventListener((state) => {
      setConnection(state.isConnected);
      setLoading(false);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.blue} size="large" />
      ) : connection ? (
        <WebView
          className="w-screen h-auto"
          source={{ uri: url }}
          isFileUploadSuported={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowUniversalAccessFromFileURLs={true}
          ref={webView}
          onNavigationStateChange={(navState) =>
            setCanGoBack(navState.canGoBack)
          }
        />
      ) : (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.large,
              color: Colors.blue,
              fontWeight: "800",
            }}
          >
            No Internet
          </Text>
          <Text
            style={{
              fontSize: FontSize.medium,
              color: Colors.red,
              fontWeight: "500",
            }}
          >
            Please Check your Internet connection
          </Text>
        </View>
      )}
    </View>
  );
};

export default Web;

const styles = StyleSheet.create({});
