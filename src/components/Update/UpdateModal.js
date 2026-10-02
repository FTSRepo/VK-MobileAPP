import { StyleSheet, Text, View,Linking, Button } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";


const UpdateModal = ({  updateData },) => {
const linkHandler =() =>{
  Linking.openURL(updateData.appurl);

}
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <View className="flex-1 justify-center items-center"
         
        >
          <Text style={styles.header}> Update Info</Text>
          <View style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            width:"80%",
          }}>
            <Text style={styles.description}>{updateData?.message}</Text>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            title="Update"
            color={Colors.primary}
            onPress={linkHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,.8)",    
    justifyContent: "center",
    alignItems: "center",
    flex:1
  },
  modalView: {
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    minHeight: 400,
    minWidth: 300,
    paddingVertical: 20,
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontWeight: "600",
    alignSelf: "center",
    fontSize:FontSize.xLarge,
    color:Colors.primary
  },
  description:{
    fontWeight:"600",
    fontSize:FontSize.large
  },
  formLable: {
    fontWeight: "600",
    fontSize: FontSize.medium,
    color: Colors.dark,
  },
});
