import { useWatchlistQuery } from "@/hooks/useWatchlist";
import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useWatchlistStore } from "../store/useWatchlistStore";
import Header from "../components/Header";

export default function WatchList() {
  const { data: stocks, isLoading } = useWatchlistQuery();

  const { search, setSearch, refreshWatchlist } = useWatchlistStore();

  const filteredStocks =
    stocks?.filter((item) =>
      item.symbol.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4">
      <Header title="WatchList" showBack />

      {/* SEARCH */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search stock..."
        className="bg-white px-4 py-3 rounded-xl mt-4"
      />

      {/*  MANUAL REFRESH BUTTON */}
      <View className="mt-3">
        <Button title="Refresh Watchlist" onPress={refreshWatchlist} />
      </View>

      {/* LIST */}
      {isLoading ? (
        <Text className="mt-10 text-center">Loading...</Text>
      ) : (
        <FlatList
          data={filteredStocks}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <TouchableOpacity className="flex-1 flex-row justify-between bg-white p-4 rounded-xl mb-3 mt-3">
              <Text className="text-lg font-bold">{item.symbol}</Text>
              <Text
                className={`font-semibold ${
                  item.change < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.change}%
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
