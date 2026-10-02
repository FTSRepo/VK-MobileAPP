import { Image, StyleSheet, Text, View , TouchableOpacity} from "react-native";
import React from "react";
import { Modal } from "react-native";
import Colors from "../../constants/Colors";
import { imgUrl } from "../../http/server-base";
import {  } from "react-native-gesture-handler";

const SliderModal = ({ open, img, setModal }) => {
  const close = () =>
    setModal({
      open: false,
      img: null,
    });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={close}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={close}>
        <View style={styles.modalView} className="">
          <View className="" >
          <Image
            className="object-contain "
            source={{
              uri: `${imgUrl}${img}`,
            }}
            style={{
              width:"100%",
              height:"100%",
              resizeMode:"contain"
            }}
            
          />
          </View>
        
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SliderModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,.8)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginVertical: 20,
   
    borderRadius: 20,
    padding: 10,

    paddingVertical: 20,
    justifyContent: "center",
    // alignItems: "center",
    width:"100%",
    height:"auto",

  },
  artworkImg: {
    width: "100px",
    height: "100px",
    borderRadius: 15,
    resizeMode: "contain",
  },
});
