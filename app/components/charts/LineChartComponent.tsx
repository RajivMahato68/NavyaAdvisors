import React from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type LineChartComponentProps = {
  data: any;
  loading: boolean;
};

export default function LineChartComponent({ data, loading }: LineChartComponentProps) {
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!data) return null;

  return (
    <View className="bg-white p-4 rounded-xl shadow">
      <Text className="text-lg font-bold mb-2">Stock Price Trend</Text>

      <LineChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0,122,255,${opacity})`,
          labelColor: () => "#333",
        }}
        bezier
      />
    </View>
  );
}
