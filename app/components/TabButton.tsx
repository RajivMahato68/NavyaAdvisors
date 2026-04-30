import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "@/app/utils/theme";

interface TabButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

const TabButton = ({ title, active, onPress }: TabButtonProps) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 py-3 items-center ${
        active
          ? "bg-blue-500"
          : theme === "dark"
          ? "bg-zinc-800"
          : "bg-white"
      }`}
    >
      <Text
        className={`font-semibold ${
          active
            ? "text-white"
            : theme === "dark"
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabButton;