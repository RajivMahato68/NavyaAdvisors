import { View, Text } from "react-native";

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
  return (
    <View className="bg-white p-4 rounded-xl shadow mt-4">
      <Text className="text-lg font-bold mb-2">{title}</Text>

      {stocks?.map((item) => (
        <View
          key={item.symbol}
          className="flex-row justify-between py-2 border-b border-gray-200"
        >
          <Text className="font-semibold">{item.symbol}</Text>

          <Text className={item.change > 0 ? "text-green-500" : "text-red-500"}>
            {item.change}%
          </Text>

          <Text>{item.turnover}</Text>
        </View>
      ))}
    </View>
  );
}
