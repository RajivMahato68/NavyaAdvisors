import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { getThemeColors } from "@/app/utils/theme";

const screenWidth = Dimensions.get("window").width;

type BarChartComponentProps = {
  data: any;
  loading: boolean;
};

export default function BarChartComponent({
  data,
  loading,
}: BarChartComponentProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!data) return null;

  return (
    <View className={`${colors.card} p-4 rounded-xl mt-4`}>
      <Text className={`${colors.text} text-lg font-bold mb-2`}>
        Trading Volume
      </Text>

      <BarChart
        data={data}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: theme === "dark" ? "#111" : "#fff",
          backgroundGradientTo: theme === "dark" ? "#111" : "#fff",
          decimalPlaces: 0,

          // bar color
          color: (opacity = 1) =>
            theme === "dark"
              ? `rgba(34,197,94,${opacity})`
              : `rgba(52,199,89,${opacity})`,

          // label color
          labelColor: () => (theme === "dark" ? "#fff" : "#333"),
        }}
      />
    </View>
  );
}