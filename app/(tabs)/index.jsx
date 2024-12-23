import {
  Image,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import URL_HinhAnh from "../../hinhanh.js";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import BASE_URL from "../../config.js";
export default function HomeScreen() {
  const [shipperid, setShipperid] = useState("");
  const [hinhAnh, setHinhAnh] = useState("");
  const [hovaten, setHovaten] = useState("");
  const [donChuaNhan, setDonChuaNhan] = useState(0);
  const [donDaNhan, setDonDaNhan] = useState(0);
  const [donDaGiao, setDonDaGiao] = useState(0);

  const getAccountID = async () => {
    try {
      const shipperIDNe = await AsyncStorage.getItem("shipperid");
      const hovatenNe = await AsyncStorage.getItem("hovaten");
      const hinhAnhNe = await AsyncStorage.getItem("hinhAnh");
      setHinhAnh(hinhAnhNe || "");
      setShipperid(shipperIDNe || "");
      setHovaten(hovatenNe || "");
      soLuongDonDaNhan(shipperIDNe);
      soLuongDonDaGiao(shipperIDNe);
    } catch (error) {
      console.error("Error retrieving accountID:", error);
    }
  };

  useEffect(() => {
    getAccountID();
    soLuongDonChuaNhan();
    console.log("Đơn hàng chưa nhận nè: ", donChuaNhan);
  }, []);

  const soLuongDonChuaNhan = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/list/count/donHangChuaNhan`
      );
      const data = response.data;
      setDonChuaNhan(data);
      console.log("Số lượng đơn hàng chưa nhận nè: ", data);
    } catch {
      console.error("Error retrieving accountID:", error);
    }
  };

  const soLuongDonDaNhan = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/list/count/donHangDaNhan`, {
        params: { shipperid: id },
      });
      const data = response.data;
      setDonDaNhan(data);
      console.log("Số lượng đơn hàng đã nhận nè: ", data);
    } catch {
      console.error("Error retrieving accountID:", error);
    }
  };

  const soLuongDonDaGiao = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/list/count/donHangDaGiao`, {
        params: { shipperid: id },
      });
      const data = response.data;
      setDonDaGiao(data);
      console.log("Số lượng đơn hàng đã giao nè: ", data);
    } catch {
      console.error("Error retrieving accountID:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <Image
          source={{ uri: `${URL_HinhAnh}/images/${hinhAnh}` }}
          style={styles.profileImage}
        />
        <Text style={styles.greetingText}>Xin chào, {hovaten}!</Text>
        <Button
          title="Đăng xuất"
          style={{ paddingTop: 30 }}
          onPress={handleLogout}
          color="#FF3B3B"
        />
      </ThemedView>
      {/* Danh sách đơn hàng */}
      <View style={styles.ordersContainer}>
        {[
          {
            title: "Đơn hàng chưa nhận",
            quantity: donChuaNhan,
            colors: ["#FF7E5F", "#FD3A69"],
          },
          {
            title: "Đơn hàng đã nhận",
            quantity: donDaNhan,
            colors: ["#00F260", "#0575E6"],
          },
          {
            title: "Đơn hàng đã giao thành công",
            quantity: donDaGiao,
            colors: ["#DCE35B", "#45B649"],
          },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.orderItem}
            activeOpacity={0.85}
            onPress={() => console.log(`${item.title} được nhấn!`)}
          >
            <LinearGradient
              colors={item.colors}
              style={styles.gradientBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.orderTitle}>{item.title}</Text>
              <Text style={styles.orderQuantity}>
                Số lượng: {item.quantity}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 5, // Hiệu ứng bóng mờ trên Android
    shadowColor: "#000", // Hiệu ứng bóng mờ trên iOS
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "rgba(255, 59, 59, 0.8)",
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ordersContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  orderItem: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden", // Để gradient không tràn ra ngoài
  },
  gradientBackground: {
    padding: 20,
    borderRadius: 12,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  orderQuantity: {
    marginTop: 4,
    fontSize: 14,
    color: "#fff",
  },
});
