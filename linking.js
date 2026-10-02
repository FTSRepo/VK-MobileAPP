import * as Linking from "expo-linking";
const linking = {
  prefixes: ["vklub://", Linking.createURL("/")],
  config: {
    screens: {
      Main: {
        screens: {
          home: "home",
          profile: "profile",
          loyality: "loyality",
          redeem: "redeem",
          transaction: "transaction",
          history: "history",
          scheme: "scheme",
          schemeHistory: "schemeHistory",
          schemeRedeem: "schemeRedeem",
          notification: "notification",
          statement: "statement",
          bilty: "bilty",
        },
      },
    },
  },
};

export default linking;
