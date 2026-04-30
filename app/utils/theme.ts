export const getThemeColors = (theme: "light" | "dark") => {
  return {
    background: theme === "dark" ? "bg-black" : "bg-white",
    card: theme === "dark" ? "bg-zinc-900" : "bg-white",
    text: theme === "dark" ? "text-white" : "text-black",
    secondaryText: theme === "dark" ? "text-gray-300" : "text-gray-600",
    inputBorder: theme === "dark" ? "border-gray-600" : "border-gray-300",
    inputBg: theme === "dark" ? "bg-zinc-800" : "bg-white",
  };
};