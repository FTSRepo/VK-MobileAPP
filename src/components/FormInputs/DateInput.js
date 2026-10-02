import { StyleSheet, Text, View, Button, Modal } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import Calender from "react-native-calendars/src/calendar";

const CalenderModal = ({ setDate, closeModal }) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={true}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      
    }}>
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <Calender
          onDayPress={(day) => {
            setDate(day.dateString);
            closeModal();
          }}
          markingType={"multi-period"}
        />
      </View>
    </View>
    </Modal>
  );
};

export default CalenderModal;

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
    minHeight: 400,
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
