import { View, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "@/app/utils/theme";

type StockItem = {
  symbol: string;
  change: number;
  turnover: string;
};

type StockListProps = {
  title: string;
  stocks?: StockItem[];
};

export default function StockList({ title, stocks }: StockListProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View className={`${colors.card} p-4 rounded-xl mt-4`}>
      {/* TITLE */}
      <Text className={`${colors.text} text-lg font-bold mb-2`}>
        {title}
      </Text>

      {/* LIST */}
      {stocks?.map((item) => (
        <View
          key={item.symbol}
          className={`flex-row justify-between py-2 border-b ${
            theme === "dark" ? "border-zinc-700" : "border-gray-200"
          }`}
        >
          {/* SYMBOL */}
          <Text className={`${colors.text} font-semibold`}>
            {item.symbol}
          </Text>

          {/* CHANGE */}
          <Text
            className={
              item.change > 0 ? "text-green-500" : "text-red-500"
            }
          >
            {item.change}%
          </Text>

          {/* TURNOVER */}
          <Text className={colors.secondaryText}>
            {item.turnover}
          </Text>
        </View>
      ))}
    </View>
  );
}