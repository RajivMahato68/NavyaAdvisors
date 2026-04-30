import React from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
type BarChartComponentProps = {
  data: any;
  loading: boolean;
};

export default function BarChartComponent({
  data,
  loading,
}: BarChartComponentProps) {
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!data) return null;

  return (
    <View className="bg-white p-4 rounded-xl shadow mt-4">
      <Text className="text-lg font-bold mb-2">Trading Volume</Text>

      <BarChart
        data={data}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(52,199,89,${opacity})`,
          labelColor: () => "#333",
        }}
      />
    </View>
  );
}
