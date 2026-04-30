import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { z } from "zod";
import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "@/app/utils/theme";

type Stock = {
  id?: string;
  symbol: string;
  companyName: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
};

const stockSchema = z.object({
  symbol: z.string().min(1, "Symbol is required"),
  companyName: z.string().min(1, "Company name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  purchasePrice: z.number().min(1, "Purchase price is required"),
  currentPrice: z.number().min(1, "Current price is required"),
});

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Stock) => void;
  initialData?: Stock | null;
};

export default function StockModal({
  visible,
  onClose,
  onSave,
  initialData,
}: Props) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const [form, setForm] = useState<Stock>({
    symbol: "",
    companyName: "",
    quantity: 0,
    purchasePrice: 0,
    currentPrice: 0,
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        symbol: "",
        companyName: "",
        quantity: 0,
        purchasePrice: 0,
        currentPrice: 0,
      });
    }
    setErrors({});
  }, [initialData, visible]);

  const handleChange = (key: keyof Stock, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]:
        key === "symbol" || key === "companyName"
          ? value
          : Number(value),
    }));
  };

  const handleSave = () => {
    const result = stockSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: any = {};

      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSave(result.data);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/40">

        <View className={`p-5 rounded-t-2xl ${colors.card}`}>

          {/* TITLE */}
          <Text className={`text-lg font-bold mb-3 ${colors.text}`}>
            {initialData ? "Edit Stock" : "Add Stock"}
          </Text>

          {/* Symbol */}
          <Text className={colors.secondaryText}>Symbol</Text>
          <TextInput
            placeholder="e.g. AAPL"
            placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
            value={form.symbol}
            onChangeText={(v) => handleChange("symbol", v)}
            className={`border p-2 rounded mt-1 ${colors.inputBorder} ${colors.inputBg} ${colors.text}`}
          />
          {errors.symbol && (
            <Text className="text-red-500 text-xs mb-2">
              {errors.symbol}
            </Text>
          )}

          {/* Company */}
          <Text className={`mt-2 ${colors.secondaryText}`}>
            Company Name
          </Text>
          <TextInput
            placeholder="Apple Inc."
            placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
            value={form.companyName}
            onChangeText={(v) => handleChange("companyName", v)}
            className={`border p-2 rounded mt-1 ${colors.inputBorder} ${colors.inputBg} ${colors.text}`}
          />
          {errors.companyName && (
            <Text className="text-red-500 text-xs mb-2">
              {errors.companyName}
            </Text>
          )}

          {/* Quantity */}
          <Text className={`mt-2 ${colors.secondaryText}`}>
            Quantity
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="10"
            placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
            value={String(form.quantity)}
            onChangeText={(v) => handleChange("quantity", v)}
            className={`border p-2 rounded mt-1 ${colors.inputBorder} ${colors.inputBg} ${colors.text}`}
          />
          {errors.quantity && (
            <Text className="text-red-500 text-xs mb-2">
              {errors.quantity}
            </Text>
          )}

          {/* Purchase Price */}
          <Text className={`mt-2 ${colors.secondaryText}`}>
            Purchase Price
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="150"
            placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
            value={String(form.purchasePrice)}
            onChangeText={(v) => handleChange("purchasePrice", v)}
            className={`border p-2 rounded mt-1 ${colors.inputBorder} ${colors.inputBg} ${colors.text}`}
          />
          {errors.purchasePrice && (
            <Text className="text-red-500 text-xs mb-2">
              {errors.purchasePrice}
            </Text>
          )}

          {/* Current Price */}
          <Text className={`mt-2 ${colors.secondaryText}`}>
            Current Price
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="175"
            placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
            value={String(form.currentPrice)}
            onChangeText={(v) => handleChange("currentPrice", v)}
            className={`border p-2 rounded mt-1 ${colors.inputBorder} ${colors.inputBg} ${colors.text}`}
          />
          {errors.currentPrice && (
            <Text className="text-red-500 text-xs mb-2">
              {errors.currentPrice}
            </Text>
          )}

          {/* BUTTONS */}
          <View className="flex-row gap-2 mt-4">

            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-500 p-3 rounded"
            >
              <Text className="text-white text-center">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-blue-500 p-3 rounded"
            >
              <Text className="text-white text-center">
                Save
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    </Modal>
  );
}