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
import { COLORS } from "../constant";
import { showToast } from "../utils/toasts";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  // 👁️ password toggle
  const [showPassword, setShowPassword] = useState(false);

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
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Sign Up Failed";

      showToast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    if (!code) {
      showToast.error("Enter Verification code");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        showToast.success("Account Created");
        router.replace("/");
      }
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Verification failed";

      showToast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          {!pendingVerification ? (
            <>
              {/* BACK */}
              <TouchableOpacity
                onPress={() => router.push("/")}
                className="absolute top-10 left-6 z-10"
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>

              {/* HEADER */}
              <View className="mb-10 mt-10">
                <Text className="text-3xl font-bold text-gray-900">
                  Create Account
                </Text>
                <Text className="text-gray-500 mt-2">
                  Sign up to get started
                </Text>
              </View>

              {/* INPUTS */}
              <View className="space-y-4">
                <View>
                  <Text className="mb-2">First Name</Text>
                  <TextInput
                    className="bg-gray-100 p-4 rounded-xl"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>

                <View>
                  <Text className="mb-2">Last Name</Text>
                  <TextInput
                    className="bg-gray-100 p-4 rounded-xl"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>

                <View>
                  <Text className="mb-2">Email</Text>
                  <TextInput
                    className="bg-gray-100 p-4 rounded-xl"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                  />
                </View>

                {/* PASSWORD WITH ICON */}
                <View>
                  <Text className="mb-2">Password</Text>

                  <View className="flex-row items-center bg-gray-100 rounded-xl px-3">
                    <TextInput
                      className="flex-1 py-4"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="********"
                    />

                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={
                          showPassword ? "eye-off" : "eye"
                        }
                        size={22}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* BUTTON */}
              <TouchableOpacity
                onPress={onSignUpPress}
                disabled={loading}
                className="bg-primary py-4 rounded-xl mt-8 items-center"
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
                <Text>Already have an account? </Text>
                <Link href="/sign-in">
                  <Text className="text-primary font-semibold">
                    Login
                  </Text>
                </Link>
              </View>
            </>
          ) : (
            <>
              {/* VERIFY */}
              <View className="mt-20 mb-10">
                <Text className="text-3xl font-bold">
                  Verify Email
                </Text>
                <Text className="text-gray-500 mt-2">
                  Enter code sent to email
                </Text>
              </View>

              <TextInput
                className="bg-gray-100 p-4 rounded-xl text-center text-lg"
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
              />

              <TouchableOpacity
                onPress={onVerifyPress}
                disabled={loading}
                className="bg-primary py-4 rounded-xl mt-6 items-center"
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