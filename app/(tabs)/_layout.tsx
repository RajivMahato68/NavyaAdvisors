import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "../utils/theme";
import { COLORS } from "../constant";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor:
          theme === "dark" ? "#ffffff" : COLORS.primary,

        tabBarInactiveTintColor:
          theme === "dark" ? "#888" : "#CDCDE0",

        tabBarShowLabel: true,

        // ✅ DARK / LIGHT TAB BAR
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#111" : "#fff",
          borderTopWidth: 1,
          borderTopColor: theme === "dark" ? "#222" : "#f0f0f0",
          height: 58 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom,
        },
      }}
    >
      {/* DASHBOARD */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* PORTFOLIO */}
      <Tabs.Screen
        name="protfolio"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "library" : "library-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* WATCHLIST */}
      <Tabs.Screen
        name="watchlist"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "watch" : "watch-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* USER */}
      <Tabs.Screen
        name="user"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}