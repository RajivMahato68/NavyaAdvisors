import Toast from "react-native-toast-message";

export const showToast = {
  success: (msg: string) => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: msg,
    });
  },

  error: (msg: string) => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: msg,
    });
  },
};