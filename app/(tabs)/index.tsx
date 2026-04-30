import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function DashBoard() {
  return (
    <SafeAreaView>
      <Header title="Navya Advisors" />
      <Text>DashBoard</Text>
    </SafeAreaView>
  );
}
