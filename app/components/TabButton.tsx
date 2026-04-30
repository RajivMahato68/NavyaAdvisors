import { TouchableOpacity, Text } from "react-native";

interface TabButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

const TabButton = ({ title, active, onPress }: TabButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 py-3 items-center ${
        active ? "bg-blue-500" : "bg-white"
      }`}
    >
      <Text
        className={`font-semibold ${active ? "text-white" : "text-gray-600"}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabButton;
