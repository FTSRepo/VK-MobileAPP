import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { imgUrl } from '../../http/server-base'


const HistoryCard = ({ redeem }) => {

    return (
        <View style={{
            elevation: 5
        }} className="w-[90%] bg-gray-50 mx-auto  my-2  border-l-blue-300 border-l-4  rounded-md overflow-hidden">
            <View className="bg-blue-50 px-4 py-2">
                <Text className="text-blue-600 font-bold ">Transaction Id :{redeem?.transactionNumber || redeem?.transactionNo || ""} </Text>
                <Text className="text-blue-600 font-semibold">Placed On :{redeem?.redeemDate} </Text>

            </View>
            <View className="bg-white px-4 py-2 ">
                <Image source={{uri:imgUrl+redeem.catalogDefaultImg}} className="w-20 h-20" />
                <View className="my-2">
                    <Text className="text-blue-500 font-bold text-md">Point Redeemed</Text>
                    <Text className="font-bold ">{redeem?.redeemPoints}</Text>
                </View>
                <View className="my-2">
                    <Text className="text-blue-500 font-bold text-md">Product Requested</Text>
                    <Text className="font-bold ">{redeem?.catalogName}</Text>
                </View>
                <View className="my-2">
                    <Text className="text-blue-500 font-bold text-md">Request Status</Text>
                    <Text className={`font-bold ${redeem?.isIssued ? "text-teal-600" : "text-red-500"} `}>{redeem?.isIssued ? "Coupon received on ("+redeem?.issueDate+")" : "Requested for coupon"}</Text>
                </View>
            </View>
        </View>
    )
}

export default HistoryCard

