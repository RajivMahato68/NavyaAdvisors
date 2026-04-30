import { Stack } from "expo-router";
import "@/global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Main app with tabs */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
