import { useSignIn } from "@clerk/clerk-expo";
import type { EmailCodeFactor } from "@clerk/types";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import {
  Pressable,
  TextInput,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { showToast } from "../utils/toasts";
import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "../utils/theme";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [showEmailCode, setShowEmailCode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // SIGN IN
  const onSignInPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      showToast.error("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
        });

        showToast.success("Login successful");
        router.replace("/");
      } else if (signInAttempt.status === "needs_second_factor") {
        const emailCodeFactor =
          signInAttempt.supportedSecondFactors?.find(
            (factor): factor is EmailCodeFactor =>
              factor.strategy === "email_code"
          );

        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });

          setShowEmailCode(true);
          showToast.success("Verification code sent");
        }
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Invalid email or password";

      showToast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // VERIFY
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    if (!code) {
      showToast.error("Enter verification code");
      return;
    }

    setLoading(true);

    try {
      const attempt = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (attempt.status === "complete") {
        await setActive({
          session: attempt.createdSessionId,
        });

        showToast.success("Verification successful");
        router.replace("/");
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Invalid verification code";

      showToast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 justify-center px-7 ${colors.background}`}
    >
      {!showEmailCode ? (
        <>
          {/* HEADER */}
          <View className="items-center mb-8">
            <Text className={`text-3xl font-bold ${colors.text}`}>
              Welcome Back
            </Text>
            <Text className={colors.secondaryText}>
              Sign in to continue
            </Text>
          </View>

          {/* EMAIL */}
          <View className="mb-4">
            <Text className={`${colors.text} font-medium mb-2`}>
              Email
            </Text>
            <TextInput
              className={`border p-2 rounded mt-1 ${colors.inputBorder} ${colors.inputBg} ${colors.text}`}
              placeholder="user@example.com"
              placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
              autoCapitalize="none"
              keyboardType="email-address"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
          </View>

          {/* PASSWORD */}
          <View className="mb-6">
            <Text className={`${colors.text} font-medium mb-2`}>
              Password
            </Text>
            <TextInput
              className={`border p-2 rounded mt-1 ${colors.inputBorder} ${colors.inputBg} ${colors.text}`}
              placeholder="********"
              placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* BUTTON */}
          <Pressable
            className={`w-full py-4 rounded-full items-center mb-10 ${
              loading || !emailAddress || !password
                ? "bg-gray-400"
                : "bg-primary"
            }`}
            onPress={onSignInPress}
            disabled={loading || !emailAddress || !password}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Sign In
              </Text>
            )}
          </Pressable>

          {/* FOOTER */}
          <View className="flex-row justify-center">
            <Text className={colors.secondaryText}>
              Don&apos;t have an account?{" "}
            </Text>
            <Link href="/sign-up">
              <Text className={`${colors.text} font-bold`}>
                Sign up
              </Text>
            </Link>
          </View>
        </>
      ) : (
        <>
          {/* VERIFY */}
          <View className="items-center mb-8">
            <Text className={`text-3xl font-bold ${colors.text}`}>
              Verify Email
            </Text>
            <Text className={`${colors.secondaryText} text-center`}>
              Enter the code sent to your email
            </Text>
          </View>

          <View className="mb-6">
            <TextInput
              className={`w-full p-4 rounded-xl text-center tracking-widest ${colors.card} ${colors.text}`}
              placeholder="123456"
              placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            />
          </View>

          <Pressable
            className="w-full bg-primary py-4 rounded-full items-center"
            onPress={onVerifyPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Verify
              </Text>
            )}
          </Pressable>
        </>
      )}
    </SafeAreaView>
  );
}