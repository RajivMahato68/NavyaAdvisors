import React from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "@/app/utils/theme";

const screenWidth = Dimensions.get("window").width;

type LineChartComponentProps = {
  data: any;
  loading: boolean;
};

export default function LineChartComponent({
  data,
  loading,
}: LineChartComponentProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!data) return null;

  return (
    <View className={`${colors.card} p-4 rounded-xl`}>
      <Text className={`${colors.text} text-lg font-bold mb-2`}>
        Stock Price Trend
      </Text>

      <LineChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundGradientFrom: theme === "dark" ? "#111" : "#fff",
          backgroundGradientTo: theme === "dark" ? "#111" : "#fff",
          decimalPlaces: 2,

          // line color
          color: (opacity = 1) =>
            theme === "dark"
              ? `rgba(59,130,246,${opacity})`
              : `rgba(0,122,255,${opacity})`,

          // label color
          labelColor: () => (theme === "dark" ? "#fff" : "#333"),
        }}
        bezier
      />
    </View>
  );
}