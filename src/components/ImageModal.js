import { StyleSheet, Text, View, Button, Modal, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const ImageModal = ({ openCamera, selectFile, closeModal }) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={true}
    onRequestClose={closeModal}>
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
       <Text className="mx-auto flex-1 text-red-400 text-xl font-extrabold">Select Image</Text>
       <View className="flex-row justify-center gap-2">
        <TouchableOpacity className="bg-red-400 p-4 rounded-md"  onPress={selectFile}>
            <Text className="text-white text-md font-bold mx-auto">Select File</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-400 p-4 rounded-md"  onPress={openCamera}>
            <Text className="text-white text-md font-bold mx-auto">Open Camera</Text>
        </TouchableOpacity>
       
       </View>
      </View>
    </View>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,.8)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex:1000
  },
  modalView: {
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    minHeight: 200,
    minWidth: 300,
    paddingVertical: 20,
    justifyContent: "center",
    // alignItems: "center",
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
