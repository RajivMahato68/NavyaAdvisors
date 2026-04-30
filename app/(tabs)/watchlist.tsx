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

type Stock = {
  symbol: string;
  change: number;
};

export default function WatchList() {
  const { data: stocks, isLoading } = useWatchlistQuery();

  const { search, setSearch, refreshWatchlist } =
    useWatchlistStore();

  // SAFE FILTER
  const filteredStocks: Stock[] =
    stocks?.filter((item: Stock) =>
      item.symbol.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4">

      {/* HEADER */}
      <Header title="WatchList" showBack />

      {/* SEARCH */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search stock..."
        className="bg-white px-4 py-3 rounded-xl mt-4"
      />

      {/* REFRESH BUTTON */}
      <TouchableOpacity
        onPress={refreshWatchlist}
        className="bg-blue-500 py-3 rounded-xl mt-3"
      >
        <Text className="text-white text-center font-semibold">
          Refresh Watchlist
        </Text>
      </TouchableOpacity>

      {/* LIST */}
      <View className="flex-1 mt-4">

        {isLoading ? (
          <Text className="text-center mt-10">
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
              <View className="flex-row justify-between bg-white p-4 rounded-xl mb-3">

                {/* SYMBOL */}
                <Text className="text-lg font-bold">
                  {item.symbol}
                </Text>

                {/* CHANGE */}
                <Text
                  className={`font-semibold ${
                    item.change < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
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