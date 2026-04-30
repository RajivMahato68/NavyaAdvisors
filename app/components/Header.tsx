import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { HeaderProps } from "../constant/types";
import { COLORS } from "../constant";

export default function Header({
  title,
  showBack,
  showSearch,
  showMenu,
  showLogo,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 py-2 bg-white shadow">
      {/* left side */}
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.primary}
              className="mr-4"
            />
          </TouchableOpacity>
        )}

        {showMenu && (
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        {showLogo ? (
          <View>
            <Text className="flex-1">
              <Image
                source={require("@/assets/images/icon.png")}
                style={{ width: "100%", height: 24 }}
                resizeMode="contain"
              />
            </Text>
          </View>
        ) : (
          title && (
            <Text className="text-lg font-bold text-primary text-center flex-1 mr-8">
              {title}
            </Text>
          )
        )}

        {!title && !showSearch && <View className="flex-1" />}
      </View>
      {/* right side */}
      <View>
        {showSearch && (
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={24}
              color={COLORS.primary}
              className="mr-4"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
