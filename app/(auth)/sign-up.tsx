import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { showToast } from "../utils/toasts";

import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "@/app/utils/theme";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // SIGNUP
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      showToast.error("Fill all required fields");
      return;
    }

    setLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      showToast.success("Verification code sent");
      setPendingVerification(true);
    } catch (err: any) {
      showToast.error(err?.errors?.[0]?.message || "Sign Up Failed");
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      showToast.error(err?.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
          {!pendingVerification ? (
            <>

              {/* HEADER */}
              <View className="mb-10 mt-10">
                <Text className={`text-3xl font-bold ${colors.text}`}>
                  Create Account
                </Text>
                <Text className={colors.secondaryText}>
                  Sign up to get started
                </Text>
              </View>

              {/* INPUTS */}
              <View className="space-y-4">
                {["First Name", "Last Name", "Email"].map((label, index) => {
                  const values = [
                    firstName,
                    lastName,
                    emailAddress,
                  ];
                  const setters = [
                    setFirstName,
                    setLastName,
                    setEmailAddress,
                  ];

                  return (
                    <View key={label}>
                      <Text className={`${colors.text} mb-2`}>
                        {label}
                      </Text>
                      <TextInput
                       className={`border p-2 rounded mt-1 ${colors.inputBorder} ${colors.inputBg} ${colors.text}`}
                        value={values[index]}
                        onChangeText={setters[index]}
                      />
                    </View>
                  );
                })}

                {/* PASSWORD */}
                <View>
                  <Text className={`${colors.text} mb-2`}>
                    Password
                  </Text>

                  <View
                    className={`flex-row items-center border  rounded-xl px-3 ${colors.inputBorder} ${colors.inputBg} ${colors.text}`}
                  >
                    <TextInput
                      className={`flex-1 py-4 ${colors.text}`}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />

                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={22}
                        color={theme === "dark" ? "#fff" : "#000"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* BUTTON */}
              <TouchableOpacity
                onPress={onSignUpPress}
                disabled={loading}
                className="bg-blue-500 py-4 rounded-xl mt-8 items-center"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-lg font-semibold">
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              {/* FOOTER */}
              <View className="flex-row justify-center mt-6">
                <Text className={colors.secondaryText}>
                  Already have an account?
                </Text>
                <Link href="/sign-in">
                  <Text className={`${colors.text} font-semibold`}>
                    Login
                  </Text>
                </Link>
              </View>
            </>
          ) : (
            <>
              {/* VERIFY */}
              <View className="mt-20 mb-10">
                <Text className={`text-3xl font-bold ${colors.text}`}>
                  Verify Email
                </Text>
                <Text className={colors.secondaryText}>
                  Enter code sent to email
                </Text>
              </View>

              <TextInput
                className={`${colors.card} p-4 rounded-xl text-center ${colors.text}`}
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
              />

              <TouchableOpacity
                onPress={onVerifyPress}
                className="bg-blue-500 py-4 rounded-xl mt-6 items-center"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-lg font-semibold">
                    Verify Account
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}