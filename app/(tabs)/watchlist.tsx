import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useWatchlistQuery } from "@/hooks/useWatchlist";
import { useWatchlistStore } from "../store/useWatchlistStore";

import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "@/app/utils/theme";

type Stock = {
  symbol: string;
  change: number;
};

export default function WatchList() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const { data: stocks, isLoading } = useWatchlistQuery();
  const { search, setSearch, refreshWatchlist } =
    useWatchlistStore();

  const filteredStocks: Stock[] =
    stocks?.filter((item: Stock) =>
      item.symbol.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <SafeAreaView className={`flex-1 ${colors.background} px-4`}>

      {/* HEADER */}
      <Header title="WatchList" showBack />

      {/* SEARCH */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search stock..."
        placeholderTextColor={theme === "dark" ? "#a1a1aa" : "#9ca3af"}
        className={`px-4 py-3 rounded-xl mt-4 ${colors.card} ${colors.text}`}
      />

      {/* REFRESH BUTTON */}
      <TouchableOpacity
        onPress={refreshWatchlist}
        style={{
          backgroundColor: "#3b82f6",
        }}
        className="py-3 rounded-xl mt-3"
      >
        <Text className="text-white text-center font-semibold">
          Refresh Watchlist
        </Text>
      </TouchableOpacity>

      {/* LIST */}
      <View className="flex-1 mt-4">

        {isLoading ? (
          <Text className={`text-center mt-10 ${colors.text}`}>
            Loading...
          </Text>
        ) : (
          <FlatList
            data={filteredStocks}
            keyExtractor={(item) => item.symbol}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            renderItem={({ item }) => (
              <View
                className={`flex-row justify-between p-4 rounded-xl mb-3 ${colors.card}`}
              >

                {/* SYMBOL */}
                <Text className={`text-lg font-bold ${colors.text}`}>
                  {item.symbol}
                </Text>

                {/* CHANGE */}
                <Text
                  style={{
                    color:
                      item.change < 0
                        ? "#ef4444" // red-500
                        : "#22c55e", // green-500
                  }}
                  className="font-semibold"
                >
                  {item.change}%
                </Text>

              </View>
            )}
          />
        )}

      </View>
    </SafeAreaView>
  );
}