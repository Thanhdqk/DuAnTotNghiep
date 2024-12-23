import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import axios from "axios";
import BASE_URL from "../../config.js";
import { useLocalSearchParams, router } from "expo-router";
import { Table, Row, Rows } from "react-native-table-component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
export default function Chitietdonhang() {
  const { id } = useLocalSearchParams();
  const [shipperid, setShipperid] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [formattedAddress, setFormattedAddress] = useState("");
  const [trangThaiDonHang, setTrangThaiDonHang] = useState("");
  // Tối ưu 1: Sử dụng ref để tránh re-render không cần thiết
  const shipperIdRef = useRef(shipperid);
  shipperIdRef.current = shipperid;

  // Tối ưu 3: Chuyển logging sang development mode
  // if (process.env.NODE_ENV === "development") {
  //   useEffect(() => {
  //     console.log("id nè:", id);
  //     console.log("shipperid nè:", shipperid);
  //   }, [id, shipperid]);
  // }

  // Tối ưu 4: Thêm memo cho tableHead
  const tableHead = useMemo(() => ["Tên sản phẩm", "Số lượng", "Đơn giá"], []);

  const tableData = useMemo(() => {
    if (!orderDetails || !Array.isArray(orderDetails)) return [];
    return orderDetails.map((item) => [item[8], item[10], item[9]]);
  }, [orderDetails]);

  // Tối ưu 6: Thêm loading state cho các action
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmNhanDonHang = useCallback(async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const response = await axios.put(
        `${BASE_URL}/update/shipper/nhandon`,
        null,
        {
          params: { shipperid: shipperIdRef.current, don_hangid: id },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      Alert.alert("Thành công", "Bạn đã nhận đơn hàng thành công!", [
        {
          text: "OK",
          onPress: () => {
            router.push("/(tabs)/listDonHang");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể nhận đơn hàng. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  }, [id, router]);

  const handleNhanDonHang = useCallback(() => {
    if (isSubmitting) return;
    Alert.alert(
      "Xác nhận nhận đơn",
      "Bạn có chắc chắn muốn nhận đơn hàng này?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: confirmNhanDonHang,
        },
      ],
      { cancelable: false }
    );
  }, [confirmNhanDonHang, isSubmitting]);

  const [isNavigatingToMap, setIsNavigatingToMap] = useState(false);

  const handleClickToMap = (address) => {
    const formattedAddress = encodeURIComponent(address);
    router.push(`/map/${formattedAddress}`);
  };
  // const handleClickToMap = useCallback(async () => {
  //   if (!formattedAddress) {
  //     Alert.alert("Lỗi", "Địa chỉ không hợp lệ.");
  //     return;
  //   }

  //   try {
  //     setIsNavigatingToMap(true); // Bắt đầu loading
  //     await router.push(`/map/${formattedAddress}`);
  //   } catch (error) {
  //     console.error("Lỗi khi chuyển trang:", error);
  //     Alert.alert("Lỗi", "Không thể chuyển trang. Vui lòng thử lại.");
  //   } finally {
  //     setIsNavigatingToMap(false); // Kết thúc loading
  //   }
  // }, [router, formattedAddress]);

  // Tối ưu 5: Sử dụng Promise.race cho timeout
  const fetchOrderDetails = useCallback(async (orderId) => {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 10000)
      );
      const fetchPromise = axios.get(`${BASE_URL}/detail/donhang/${orderId}`);

      const response = await Promise.race([fetchPromise, timeoutPromise]);
      setOrderDetails(response.data);
      setTrangThaiDonHang(response.data[0][13]);
      console.log("Dữ liệu khi nhấn chi tiết nè: ", response.data);
      console.log("Trạng thái nè ytroi: ", response.data[0][13]);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API chi tiết đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  // Tối ưu 2: Gộp 2 useEffect đầu tiên lại
  useEffect(() => {
    const initData = async () => {
      if (id) {
        await fetchOrderDetails(id);
        if (orderDetails && orderDetails[0]) {
          const address = `${orderDetails[0][4]}, ${orderDetails[0][5]}, ${orderDetails[0][6]}, ${orderDetails[0][7]}`;
          setFormattedAddress(encodeURIComponent(address));
        }
      }
    };
    initData();
  }, [id]); // Thêm orderDetails nếu cần

  // useEffect(() => {
  //   console.log("Sản phẩm nè: ", orderDetails);
  // });
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!orderDetails) {
    return <Text>Không có dữ liệu đơn hàng</Text>;
  }

  return (
    <>
      {isNavigatingToMap && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Đang chuyển trang...</Text>
        </View>
      )}
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Chi tiết đơn hàng {id}</Text>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.orderLabel}>
            Mã đơn hàng:
            <Text style={styles.orderDetails}>{orderDetails[0][0]}</Text>
          </Text>
          <Text style={styles.orderLabel}>
            Tên khách hàng:
            <Text style={styles.orderDetails}>{orderDetails[0][2]}</Text>
          </Text>
          <Text style={styles.orderLabel}>
            Số điện thoại:
            <Text style={styles.orderDetails}>{orderDetails[0][3]}</Text>
          </Text>
          <Text style={styles.orderLabel}>
            Địa chỉ:
            <Text style={styles.orderDetails}>
              {orderDetails[0][4]}, {orderDetails[0][5]}, {orderDetails[0][6]},{" "}
              {orderDetails[0][7]}
            </Text>
          </Text>
        </View>

        {/* <View style={styles.containerTable}>
          <View style={styles.tableRow}>
            {tableHead.map((header, index) => (
              <Text key={index} style={[styles.cell, styles.headerCell]}>
                {header}
              </Text>
            ))}
          </View>

          {tableData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {row.map((cell, cellIndex) => (
                <Text key={cellIndex} style={styles.cell}>
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View> */}

        <View style={styles.containerTable}>
          {/* Tiêu đề bảng */}
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.headerCell]}>{tableHead[0]}</Text>
            <Text style={[styles.cell, styles.headerCell]}>{tableHead[1]}</Text>
            <Text style={[styles.cell, styles.headerCell]}>{tableHead[2]}</Text>
          </View>

          {/* Dữ liệu bảng */}
          {tableData &&
            tableData.length > 0 &&
            tableData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                <Text style={styles.cell}>{row[0]}</Text>
                <Text style={styles.cell}>{row[1]}</Text>
                <Text style={styles.cell}>{row[2]}</Text>
              </View>
            ))}
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng tiền:</Text>
          <Text style={styles.totalAmount}>{orderDetails[0][1]} VND</Text>
        </View>
        {trangThaiDonHang !== "Đã giao" && (
          <>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() =>
                handleClickToMap(
                  `${orderDetails[0][4]}, ${orderDetails[0][5]}, ${orderDetails[0][6]}, ${orderDetails[0][7]}`
                )
              }
            >
              <Text style={styles.mapButtonText}>Xem bản đồ</Text>
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                style={styles.mapButtonNhanDon}
                onPress={() => handleNhanDonHang()}
              >
                <Text style={styles.mapButtonTextNhanDon}>Nhận đơn hàng</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  text: {
    margin: 6,
    textAlign: "center",
    fontSize: 14,
  },
  tableHead: {
    height: 40,
    backgroundColor: "#f1f8ff",
  },
  mapButton: {
    backgroundColor: "#4CAF50", // Màu xanh lá đẹp
    paddingVertical: 12, // Đệm dọc
    paddingHorizontal: 20, // Đệm ngang
    borderRadius: 25, // Bo góc
    alignItems: "center", // Căn giữa nội dung
    marginTop: 15, // Khoảng cách bên trên
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
    shadowOpacity: 0.25, // Độ mờ của bóng
    shadowRadius: 3.84, // Bán kính bóng
    elevation: 5, // Độ nâng (chỉ Android)
  },
  mapButtonText: {
    color: "#fff", // Màu chữ trắng
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // In đậm chữ
  },
  mapButtonNhanDon: {
    backgroundColor: "#4CAF50", // Màu xanh lá đẹp
    paddingVertical: 12, // Đệm dọc
    paddingHorizontal: 20, // Đệm ngang
    borderRadius: 25, // Bo góc
    alignItems: "center", // Căn giữa nội dung
    marginTop: 15, // Khoảng cách bên trên
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
    shadowOpacity: 0.25, // Độ mờ của bóng
    shadowRadius: 3.84, // Bán kính bóng
    elevation: 5, // Độ nâng (chỉ Android)
  },
  mapButtonTextNhanDon: {
    color: "#fff", // Màu chữ trắng
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // In đậm chữ
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 10,
    fontSize: 16,
  },
  // Chi tiết đơn hàng
  orderInfoContainer: {
    marginVertical: 15, // Khoảng cách giữa các phần tử
    paddingHorizontal: 20, // Khoảng cách hai bên
    backgroundColor: "#f8f9fa", // Nền sáng
    borderRadius: 10, // Bo góc
    paddingTop: 10,
    paddingBottom: 15,
    shadowColor: "#000", // Hiệu ứng bóng đổ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
  orderLabel: {
    fontSize: 16,
    fontWeight: "500", // Giảm bớt độ đậm
    color: "#343a40", // Màu chữ chính
    marginBottom: 8, // Khoảng cách dưới mỗi dòng
  },
  orderDetails: {
    fontSize: 16,
    fontWeight: "600", // Đậm để dễ đọc
    color: "#007bff", // Màu xanh dương cho thông tin quan trọng
  },
  // Sản phẩm
  containerTable: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3, // Tạo hiệu ứng bóng nhẹ cho bảng
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Căn giữa các cột trong hàng
    alignItems: "center", // Căn giữa theo chiều dọc
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1, // Mỗi ô sẽ chiếm đều không gian trong dòng
    textAlign: "center", // Căn giữa nội dung theo chiều ngang
    fontSize: 16,
    color: "#333",
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f8f9fa", // Màu nền nhẹ cho tiêu đề
    paddingVertical: 12,
    //paddingHorizontal: 8,
    textAlign: "center", // Căn giữa tiêu đề theo chiều ngang
  },
  // Tổng tiền
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff", // Màu nền nhẹ cho phần tổng tiền
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: "#000", // Thêm hiệu ứng bóng cho phần tổng tiền
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e74c3c", // Màu đỏ đậm để nổi bật
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#ecf0f1", // Nền sáng để làm nổi bật
    borderRadius: 5,
  },
});

// const tableData =
//   orderDetails?.length > 0
//     ? orderDetails.map((item) => {
//         item[8], item[10], item[9];
//       })
//     : [];
// const tableData = useMemo(
//   () => orderDetails.map((item) => [item[8], item[10], item[9]]),
//   [orderDetails]
// );
// const handleNhanDonHang = async () => {
//   const shipperidNe = await AsyncStorage.getItem("shipperid");
//   setShipperid(shipperidNe);
//   const don_hangid = id;
//   console.log("Shipperid khi nhấn nhận đơn: ", shipperidNe);
//   console.log("Mã đơn hàng cho nhận:", don_hangid);

//   // Hiển thị Alert hỏi người dùng có chắc chắn muốn nhận đơn không
//   Alert.alert(
//     "Xác nhận nhận đơn",
//     "Bạn có chắc chắn muốn nhận đơn hàng này?",
//     [
//       {
//         text: "Hủy", // Nếu chọn hủy, không làm gì cả
//         onPress: () => console.log("Người dùng hủy nhận đơn"),
//         style: "cancel",
//       },
//       {
//         text: "OK", // Nếu chọn OK, thực hiện hành động nhận đơn
//         onPress: async () => {
//           try {
//             const response = await axios.put(
//               `${BASE_URL}/update/shipper/nhandon`,
//               null, // Không cần gửi body dữ liệu vì đã gửi qua query
//               {
//                 params: {
//                   shipperid: shipperidNe,
//                   don_hangid: don_hangid,
//                 },
//                 headers: {
//                   "Content-Type": "application/x-www-form-urlencoded",
//                 },
//               }
//             );
//             console.log("Phản hồi từ API:", response.data);
//             Alert.alert("Thành công", "Bạn đã nhận đơn hàng thành công!");
//             router.push("/(tabs)/listDonHang");
//           } catch (error) {
//             console.error("Lỗi khi gọi API nhan_don_hang:", error);
//             Alert.alert("Lỗi", "Không thể nhận đơn hàng. Vui lòng thử lại.");
//           }
//         },
//       },
//     ],
//     { cancelable: false } // Không cho phép đóng Alert ngoài các nút lựa chọn
//   );
// };

// const fetchOrderDetails = async (id) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/detail/donhang/${id}`);
//     setOrderDetails(response.data);
//     console.log("Dữ liệu đơn hàng:", response.data);
//     setLoading(false);
//   } catch (error) {
//     console.error("Lỗi khi gọi API chi tiết đơn hàng:", error);
//     setLoading(false);
//   }
// };

// const handleClickToMap = (address) => {
//   const formattedAddress = encodeURIComponent(address);
//   router.push(`/map/${formattedAddress}`);
// };
