import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useClerk } from "@clerk/clerk-expo";
import Header from "../components/Header";
import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "../utils/theme";

export default function User() {
  const { user, signOut } = useClerk();
  const router = useRouter();
  const { theme } = useTheme();

  const colors = getThemeColors(theme);

  const handleLogout = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <Header title="Profile" showBack />

      <ScrollView className="flex-1 px-4 mt-4">
        {!user ? (
          // ================= GUEST UI =================
          <View className="items-center mt-20">
            <View className={`${colors.card} p-6 rounded-2xl items-center w-full`}>

              <View className="bg-gray-300 p-5 rounded-full mb-4">
                <Ionicons
                  name="person"
                  size={40}
                  color={theme === "dark" ? "#fff" : "#555"}
                />
              </View>

              <Text className={`text-xl font-bold ${colors.text} mb-2`}>
                Guest User
              </Text>

              <Text className={`${colors.secondaryText} text-center mb-6`}>
                Login to access your profile, orders, and settings
              </Text>

              <TouchableOpacity
                className="bg-primary px-8 py-3 rounded-full"
                onPress={() => router.push("/sign-in")}
              >
                <Text className="text-white font-semibold">
                  Login / Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            {/* PROFILE CARD */}
            <View className={`${colors.card} rounded-2xl p-6 items-center`}>

              <Image
                source={{ uri: user.imageUrl }}
                className="w-24 h-24 rounded-full"
              />

              <Text className={`text-xl font-bold mt-3 ${colors.text}`}>
                {user.firstName} {user.lastName}
              </Text>

              <Text className={`${colors.secondaryText} text-sm mt-1`}>
                {user.emailAddresses[0].emailAddress}
              </Text>
            </View>

            {/* MENU */}
            <View className={`${colors.card} rounded-2xl mt-6`}>
              {[
                { icon: "person-outline", label: "Edit Profile" },
                { icon: "settings-outline", label: "Settings" },
                { icon: "help-circle-outline", label: "Help & Support" },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center p-4 border-b border-gray-200"
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={theme === "dark" ? "#fff" : "#555"}
                  />
                  <Text className={`ml-3 ${colors.text}`}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* LOGOUT */}
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-500 mt-8 py-4 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-lg">
                Log Out
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}