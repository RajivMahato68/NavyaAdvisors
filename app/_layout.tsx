import { Stack } from "expo-router";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Main app with tabs */}
        <Stack.Screen name="(tabs)" />
      </Stack>
         <Toast />
    </QueryClientProvider>
  );
}
