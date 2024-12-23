import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function mapne() {
  // Lấy id từ URL
  const { id } = useLocalSearchParams();
  console.log("Địa chỉ nè: ", id);
  if (!id) {
    console.error("Lỗi: id là undefined.");
  } else {
    console.log("id từ URL:", id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chi tiết đơn hàng</Text>
      <Text>ID Đơn hàng: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
