// import { useState, useEffect } from "react";
// import { ScrollView, Text, StyleSheet } from "react-native";
// import axios from "axios";
// import BASE_URL from "../../../config.js";
// import { useRouter } from "expo-router";

// export default function Chitietdonhang() {
//   const router = useRouter();
//   const id = router.query; // Lấy id từ URL

//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   console.log("Id từ search query:", id); // Kiểm tra id

//   const fetchOrderDetails = async (id) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/detail/donhang/${id}`);
//       console.log("Dữ liệu đơn hàng:", response.data);
//       setOrderDetails(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Lỗi khi gọi API chi tiết đơn hàng:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchOrderDetails(id);
//     } else {
//       console.log("Không có id");
//     }
//   }, [id]);

//   if (loading) {
//     return <Text>Đang tải...</Text>;
//   }

//   if (!orderDetails) {
//     return <Text>Không có dữ liệu đơn hàng</Text>;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Chi tiết đơn hàng {id}</Text>
//       <Text style={styles.label}>Mã đơn hàng: {orderDetails[0][0]}</Text>
//       <Text style={styles.label}>Tên khách hàng: {orderDetails.hovaten}</Text>
//       <Text style={styles.label}>
//         Số điện thoại: {orderDetails.so_dien_thoai}
//       </Text>
//       <Text style={styles.label}>
//         Địa chỉ: {orderDetails.dia_chi}, {orderDetails.phuong},{" "}
//         {orderDetails.quan}, {orderDetails.thanh_pho}
//       </Text>
//       <Text style={styles.label}>Sản phẩm: {orderDetails.ten_san_pham}</Text>
//       <Text style={styles.label}>Tổng tiền: {orderDetails.tong_tien}</Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 16,
//     marginVertical: 5,
//   },
// });

import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function chitietdonhang() {
  const router = useRouter();

  // Lấy id từ URL
  const { id } = router.query;

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
