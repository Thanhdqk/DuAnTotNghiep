import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const checkShipperId = async () => {
      const shipperidStorage = await AsyncStorage.getItem("shipperid");
      if (!shipperidStorage) {
        router.push("/login"); // Chuyển đến trang đăng nhập nếu không có shipperid
      } else {
        router.push("/(tabs)"); // Chuyển đến trang chính nếu đã có shipperid
      }
    };

    checkShipperId();
  }, []);
};
