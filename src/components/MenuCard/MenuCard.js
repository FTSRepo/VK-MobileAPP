import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
const width = Dimensions.get("window").width;

const MenuCard = ({ index, item , navigation}) => {
  return (
 <View className="bg-slate-300 w-screen my-2 rounded-md drop-shadow-lg">
 

      <Image
        source={{ uri: "https://source.unsplash.com/random" }}
        style={tailwind`w-full h-64 rounded-t-xl`}
        resizeMode="cover"
      />
      <View style={tailwind`p-6`}>
        <Text style={tailwind`text-slate-900 text-lg font-bold`}>
          With Image
        </Text>
      </View>
  
    </View>
 
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  itemContainer: {
  
    
  },
  item: {
    width: width  - 10,
    flex: 1,
    margin: 3,
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    maxWidth: 80,
    maxHeight: 80,
  },
  text:{
    fontSize:FontSize.small,
    overflow:"hidden"
  }
});
