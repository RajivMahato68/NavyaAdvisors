import { Stack } from "expo-router";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";

SplashScreen.preventAutoHideAsync();

const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const queryClient = new QueryClient();

export default function RootLayout() {

   useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>

        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}