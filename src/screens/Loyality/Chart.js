import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
const { width } = Dimensions.get('window');

const Chart = ({ dashboardData }) => {

    const earnData = [
        {
            name: "January",
            data: +dashboardData?.earningsOrverview?.January || 0,
            color: "#475569",
            legendFontColor: "#475569",
            legendFontSize: 8
        },
        {
            name: "February",
            data: +dashboardData?.earningsOrverview?.February || 0,
            color: "#ef4444",
            legendFontColor: "#ef4444",
            legendFontSize: 8
        },
        {
            name: "March",
            data: +dashboardData?.earningsOrverview?.March || 0,
            color: "#f97316",
            legendFontColor: "#f97316",
            legendFontSize: 8
        },
        {
            name: "April",
            data: +dashboardData?.earningsOrverview?.April || 0,
            color: "#f59e0b",
            legendFontColor: "#f59e0b",
            legendFontSize: 8
        },
        {
            name: "May",
            data: +dashboardData?.earningsOrverview?.May || 0,
            color: "#a3e635",
            legendFontColor: "#a3e635",
            legendFontSize: 8
        },
        {
            name: "June",
            data: +dashboardData?.earningsOrverview?.June || 0,
            color: "#3f6212",
            legendFontColor: "#3f6212",
            legendFontSize: 8
        },
        {
            name: "July",
            data: +dashboardData?.earningsOrverview?.July || 0,
            color: "#86efac",
            legendFontColor: "#86efac",
            legendFontSize: 8
        },
        {
            name: "August",
            data: +dashboardData?.earningsOrverview?.August || 0,
            color: "#6ee7b7",
            legendFontColor: "#6ee7b7",
            legendFontSize: 8
        },
        {
            name: "September",
            data: +dashboardData?.earningsOrverview?.September || 0,
            color: "#115e59",
            legendFontColor: "#115e59",
            legendFontSize: 8
        },
        {
            name: "October",
            data: +dashboardData?.earningsOrverview?.October || 0,
            color: "#22d3ee",
            legendFontColor: "#22d3ee",
            legendFontSize: 8
        },
        {
            name: "November",
            data: +dashboardData?.earningsOrverview?.November || 0,
            color: "#db2777",
            legendFontColor: "#db2777",
            legendFontSize: 8
        },
        {
            name: "December",
            data: +dashboardData?.earningsOrverview?.December || 0,
            color: "#e11d48",
            legendFontColor: "#e11d48",
            legendFontSize: 8
        }
    ];
    const burnData = [
        {
            name: "January",
            data: +dashboardData?.burnOrverview?.January || 0,
            color: "#475569",
            legendFontColor: "#475569",
            legendFontSize: 8
        },
        {
            name: "February",
            data: +dashboardData?.burnOrverview?.February || 0,
            color: "#ef4444",
            legendFontColor: "#ef4444",
            legendFontSize: 8
        },
        {
            name: "March",
            data: +dashboardData?.burnOrverview?.March || 0,
            color: "#f97316",
            legendFontColor: "#f97316",
            legendFontSize: 8
        },
        {
            name: "April",
            data: +dashboardData?.burnOrverview?.April || 0,
            color: "#f59e0b",
            legendFontColor: "#f59e0b",
            legendFontSize: 8
        },
        {
            name: "May",
            data: +dashboardData?.burnOrverview?.May || 0,
            color: "#a3e635",
            legendFontColor: "#a3e635",
            legendFontSize: 8
        },
        {
            name: "June",
            data: +dashboardData?.burnOrverview?.June || 0,
            color: "#3f6212",
            legendFontColor: "#3f6212",
            legendFontSize: 8
        },
        {
            name: "July",
            data: +dashboardData?.burnOrverview?.July || 0,
            color: "#86efac",
            legendFontColor: "#86efac",
            legendFontSize: 8
        },
        {
            name: "August",
            data: +dashboardData?.burnOrverview?.August || 0,
            color: "#6ee7b7",
            legendFontColor: "#6ee7b7",
            legendFontSize: 8
        },
        {
            name: "September",
            data: +dashboardData?.burnOrverview?.September || 0,
            color: "#115e59",
            legendFontColor: "#115e59",
            legendFontSize: 8
        },
        {
            name: "October",
            data: +dashboardData?.burnOrverview?.October || 0,
            color: "#22d3ee",
            legendFontColor: "#22d3ee",
            legendFontSize: 8
        },
        {
            name: "November",
            data: +dashboardData?.burnOrverview?.November || 0,
            color: "#db2777",
            legendFontColor: "#db2777",
            legendFontSize: 8
        },
        {
            name: "December",
            data: +dashboardData?.burnOrverview?.December || 0,
            color: "#e11d48",
            legendFontColor: "#e11d48",
            legendFontSize: 8
        }
    ];

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };
    return (
        <>
            <View className="mx-auto bg-gray-50 p-4 my-1  border-l-teal-400 border-l-4  w-[90%] rounded-md flex  flex-col">
                <Text className="text-teal-400 font-bold text-lg">Earned Points </Text>

                <PieChart
                    data={earnData}
                    width={width}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"data"}
                    backgroundColor={"transparent"}

                    hasLegend="true"
                    absolute
                />
            </View>
            <View className="mx-auto bg-gray-50 p-4 my-1  border-l-fuchsia-400 border-l-4  w-[90%] rounded-md flex  flex-col">
                <Text className="text-fuchsia-400 font-bold text-lg">Used Points </Text>

                <PieChart
                    data={burnData}
                    width={width}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"data"}
                    backgroundColor={"transparent"}

                    hasLegend="true"
                    absolute
                />
            </View>

        </>

    )
}

export default Chart

const styles = StyleSheet.create({})