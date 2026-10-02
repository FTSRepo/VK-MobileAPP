import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageView from "react-native-image-viewing";

const ImageContainer = (props) => {
  const {open , images , close} = props
    return (
        <ImageView
            images={images}
            imageIndex={0}
            visible={open}
            onRequestClose={close}
        />
    )
}

export default ImageContainer

const styles = StyleSheet.create({})