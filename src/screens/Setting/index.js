import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Spacing from "../../constants/Spacing";

import FontSize from "../../constants/FontSize";

const index = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
      style={styles.settingCard}
       onPress={()=>navigation.navigate("changePassword")}>
        <MaterialCommunityIcons
          name="form-textbox-password"
          size={24}
          color="black"
        />
        <Text style={styles.fontText}>Change Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing * 2,
    backgroundColor:Colors.white
  },
  settingCard: {
    backgroundColor: Colors.white,
    padding: Spacing * 2,
    marginHorizontal:Spacing*1,
    elevation: 3,
    borderWidth:1,
    borderColor:Colors.gray,
    borderRadius:5,
    flexDirection:"row",
    // justifyContent:"center",
    alignItems:"center",
    gap:Spacing*3
  },
  fontText:{
    fontWeight:"600",
    paddingHorizontal:Spacing*2,
    fontSize:FontSize.medium

  }
});
