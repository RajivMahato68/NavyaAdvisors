import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { HeaderProps } from "../constant/types";
import { useTheme } from "@/context/ThemeContext";

export default function Header({
  title,
  showBack,
  showSearch,
  showLogo,
}: HeaderProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <View
      className="flex-row items-center justify-between px-4 py-3"
      style={{
        backgroundColor: isDark ? "#111" : "#fff",
        borderBottomWidth: 0.5,
        borderBottomColor: isDark ? "#333" : "#eee",
      }}
    >
      {/* LEFT SIDE */}
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDark ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        )}

        {showLogo ? (
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 120, height: 24 }}
            resizeMode="contain"
          />
        ) : (
          title && (
            <Text
              className="text-lg font-bold flex-1 text-center"
              style={{
                color: isDark ? "#fff" : "#000",
              }}
            >
              {title}
            </Text>
          )
        )}
      </View>

      {/* RIGHT SIDE */}
      <View className="flex-row items-center gap-4">
        {/* SEARCH */}
        {showSearch && (
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={24}
              color={isDark ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        )}

        {/*  DARK / LIGHT TOGGLE */}
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={isDark ? "sunny-outline" : "moon-outline"}
            size={24}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}