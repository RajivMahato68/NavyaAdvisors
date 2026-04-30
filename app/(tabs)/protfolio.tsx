import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/Header";
import Button from "../components/Button";

import { usePortfolioQuery } from "@/hooks/useProtfolio";
import { usePortfolioActions } from "@/hooks/useProtfolioMutation";
import StockModal from "../components/StockModal";

export default function Portfolio() {
  const { data: portfolio, isLoading } = usePortfolioQuery();
  const { addStock, updateStock, deleteStock } = usePortfolioActions();

  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  const calculatePL = (item: any) =>
    (item.currentPrice - item.purchasePrice) * item.quantity;

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4">
      {/* HEADER */}
      <Header title="Portfolio" showBack />

      {/*  ADD BUTTON */}
      <View className="mt-3 mb-2">
        <Button
          title="Add Stock"
          onPress={() => {
            setEditData(null);
            setModalVisible(true);
          }}
        />
      </View>

      {/* LOADING */}
      {isLoading && <Text className="text-center mt-10">Loading...</Text>}

      {/* LIST */}
      <FlatList
        data={portfolio}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const pl = calculatePL(item);

          return (
            <View className="bg-white p-4 rounded-xl mb-3">
              <View className="flex-row justify-between">
                <Text className="font-bold text-lg">{item.symbol}</Text>

                <Text>Qty: {item.quantity}</Text>
              </View>

              <Text>{item.companyName}</Text>

              <Text
                className={
                  pl >= 0
                    ? "text-green-500 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                P/L: {pl.toFixed(2)}
              </Text>

              {/* ACTIONS */}
              <View className="flex-row gap-2 mt-3">
                <View className="flex-1">
                  <Button
                    title="Edit"
                    variant="secondary"
                    onPress={() => {
                      setEditData(item);
                      setModalVisible(true);
                    }}
                  />
                </View>

                <View className="flex-1">
                  <Button
                    title="Delete"
                    variant="danger"
                    onPress={() => deleteStock(item.id)}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* REUSABLE MODAL */}
      <StockModal
        visible={modalVisible}
        initialData={editData}
        onClose={() => setModalVisible(false)}
        onSave={(data) => {
          if (editData) {
            updateStock({
              id: editData.id,
              data,
            });
          } else {
            addStock(data);
          }

          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
