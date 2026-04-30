import React from "react";
import { TouchableOpacity, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger" | "secondary";
};

export default function Button({
  title,
  onPress,
  variant = "primary",
}: Props) {
  const styles = {
    primary: "bg-blue-500",
    danger: "bg-red-500",
    secondary: "bg-gray-500",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${styles[variant]} px-3 py-2 rounded-lg`}
    >
      <Text className="text-white font-semibold text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
}