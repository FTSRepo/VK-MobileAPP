import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Spacing from '../../constants/Spacing'
import Font from '../../constants/Font'
import Colors from '../../constants/Colors'
import FontSize from '../../constants/FontSize'

const FormButton = (props) => {
    const {title,onPress, loading , disabled }= props
  return (
    
    <View style={styles.bottom}>
    <View
      style={{
        paddingHorizontal: Spacing * 2,
        paddingTop: Spacing * 6,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={ onPress}
        style={{
          backgroundColor: disabled ? Colors.gray : Colors.blue,
          paddingVertical: Spacing * 1.5,
          paddingHorizontal: Spacing * 2,
          width: "48%",
          borderRadius: Spacing,
          shadowColor: Colors.dark,
           display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          shadowOffset: {
            width: 0,
            height: Spacing,
          },
          shadowOpacity: 0.3,
          shadowRadius: Spacing,
          elevation:3
        }}
      >

         {loading ? (
          <ActivityIndicator color={Colors.white} style={{ paddingRight: 5 }} />
        ):null}
        <Text
          style={{
            fontFamily: Font["pins-bold"],
            color: Colors.white,
            fontSize: FontSize.large,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default FormButton

const styles = StyleSheet.create({})