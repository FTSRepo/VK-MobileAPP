import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import dayjs from 'dayjs'

const TransactionCard = ({transaction}) => {
    return (
        <View style={{
            elevation: 5
        }} className="w-[90%] bg-gray-50 mx-auto  my-2  border-l-blue-300 border-l-4  rounded-md overflow-hidden">
            <View className="bg-blue-50 px-4 py-2">
                <Text className="text-blue-600 font-bold ">Transaction Id :{transaction?.transactionNumber} </Text>
                <Text className="text-blue-600 text-semibold text-md">Transaction Date :{transaction?.activityDate} </Text>

            </View>
            <View className="bg-white px-4 py-2 ">
                <View className="my-2">
                    <Text className="text-blue-500 font-bold text-md">Points</Text>
                    <Text className="font-bold ">{transaction?.points}</Text>
                </View>
                <View className="my-2">
                    <Text className="text-blue-500 font-bold text-md">Offer</Text>
                    <Text className="font-bold ">{transaction?.partnerBrand}</Text>
                </View>
                <View className="my-2">
                    <Text className="text-blue-500 font-bold text-md">Transaction Type</Text>
                    <Text className={`font-bold ${transaction?.transactionType === "EARNED" ?"text-teal-600":"text-red-500" } `}>{transaction?.transactionType}</Text>
                </View>
            </View>
        </View>
    )
}

export default TransactionCard

