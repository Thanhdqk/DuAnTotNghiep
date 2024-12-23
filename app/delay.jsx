import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const Delay = (delay = 2000) => {
  // Thêm tham số delay mặc định là 2 giây
  const router = useRouter();

  useEffect(() => {
    const checkShipperId = async () => {
      const shipperidStorage = await AsyncStorage.getItem("shipperid");
      if (!shipperidStorage) {
        router.push("/login"); // Điều hướng nếu không có shipperid
      } else {
        router.push("/(tabs)"); // Điều hướng nếu đã có shipperid
      }
    };

    const timer = setTimeout(() => {
      checkShipperId(); // Gọi hàm kiểm tra sau thời gian delay
    }, delay);

    return () => clearTimeout(timer); // Xóa bộ đếm thời gian nếu component bị hủy
  }, [delay]);
};
