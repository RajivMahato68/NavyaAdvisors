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
import { COLORS } from "../constant";

export default function User() {
  const { user, signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Profile" showBack />

      <ScrollView className="flex-1 px-4 mt-4">
        {!user ? (
          // ================= GUEST UI =================
          <View className="items-center mt-20">
            <View className="bg-white p-6 rounded-2xl shadow-md items-center w-full">
              <View className="bg-gray-200 p-5 rounded-full mb-4">
                <Ionicons name="person" size={40} color={COLORS.secondary} />
              </View>

              <Text className="text-xl font-bold text-primary mb-2">
                Guest User
              </Text>

              <Text className="text-secondary text-center mb-6">
                Login to access your profile, orders, and settings
              </Text>

              <TouchableOpacity
                className="bg-primary px-8 py-3 rounded-full"
                onPress={() => router.push("/sign-in")}
              >
                <Text className="text-white font-semibold text-base">
                  Login / Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            {/* ================= PROFILE CARD ================= */}
            <View className="bg-white rounded-2xl p-6 items-center shadow-md">
              <Image
                source={{ uri: user.imageUrl }}
                className="w-24 h-24 rounded-full border-4 border-white shadow"
              />

              <Text className="text-xl font-bold text-primary mt-3">
                {user.firstName} {user.lastName}
              </Text>

              <Text className="text-secondary text-sm mt-1">
                {user.emailAddresses[0].emailAddress}
              </Text>
            </View>

            {/* ================= MENU SECTION ================= */}
            <View className="bg-white rounded-2xl mt-6 shadow-md">
              <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
                <Ionicons name="person-outline" size={20} color="#555" />
                <Text className="ml-3 text-base text-primary">
                  Edit Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
                <Ionicons name="settings-outline" size={20} color="#555" />
                <Text className="ml-3 text-base text-primary">
                  Settings
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center p-4">
                <Ionicons name="help-circle-outline" size={20} color="#555" />
                <Text className="ml-3 text-base text-primary">
                  Help & Support
                </Text>
              </TouchableOpacity>
            </View>

            {/* ================= LOGOUT BUTTON ================= */}
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-500 mt-8 py-4 rounded-xl items-center shadow-md"
            >
              <Text className="text-white font-bold text-lg">Log Out</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}