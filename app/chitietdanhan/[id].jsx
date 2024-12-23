import { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Button,
  Image,
} from "react-native";
import axios from "axios";
import BASE_URL from "../../config.js";
import URL_HinhAnh from "../../hinhanh.js";
import { useLocalSearchParams, router } from "expo-router";
import { Table, Row, Rows } from "react-native-table-component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import emailjs from "emailjs-com";
export default function Chitietdonhang() {
  const { id } = useLocalSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");
  const [hinhAnhNe, setHinhAnhNe] = useState(null);
  const [shipperid, setShipperid] = useState("");
  const [email, setEmail] = useState("");
  const [phuongthuctt, setPhuongthuctt] = useState("");
  const fetchShipperId = useCallback(async () => {
    const shipperNe = await AsyncStorage.getItem("shipperid");
    setShipperid(shipperNe || "");
  }, []);
  useEffect(() => {
    fetchShipperId();
  }, []);

  const handleChupHinh = async (id) => {
    // router.push({
    //   pathname: `/chuphinhtest1/${id}`,
    //   query: { id: JSON.stringify(id) },
    // });
    router.push({
      pathname: `/chuphinhtest1/${id}`,
      query: { id },
    });
  };

  const loadHinhAnhTheoDonHang = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/donhang/hinhanh/${id}`);
      console.log("Dữ liệu hình ảnh nè:", response.data);
      setHinhAnhNe(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi gọi API hình ảnh nè:", error);
    }
  };

  const sendEmail = async (email, subject, text) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/send`, // Đảm bảo đường dẫn là chính xác
        null,
        {
          params: {
            to: email,
            subject: subject,
            text: text, // Nội dung HTML sẽ được truyền ở đây
          },
        }
      );
      console.log("Email gửi thành công:", response.data);
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
    }
  };

  const handleHoanThanhDonHang = async () => {
    console.log("Hello bạn");
    const don_hangid = id;
    console.log("Mã đơn hàng cho nhận:", don_hangid);

    // Hiển thị Alert hỏi người dùng có chắc chắn muốn nhận đơn không
    Alert.alert(
      "Xác nhận nhận đơn",
      "Bạn muốn cập nhật đơn hàng hoàn thành?",
      [
        {
          text: "Hủy", // Nếu chọn hủy, không làm gì cả
          onPress: () => console.log("Người dùng hủy"),
          style: "cancel",
        },
        {
          text: "OK", // Nếu chọn OK, thực hiện hành động nhận đơn
          onPress: async () => {
            try {
              const response = await axios.put(
                `${BASE_URL}/update/shipper/hoanthanh`,
                null, // Không cần gửi body dữ liệu vì đã gửi qua query
                {
                  params: {
                    don_hangid: don_hangid,
                  },
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              );
              console.log("Email nè: ", email);

              // Tạo HTML cho bảng sản phẩm
              let productDetailsHtml = `
              <html>
                <head>
                  <style>
                    table {
                      width: 100%;
                      border-collapse: collapse;
                    }
                    th, td {
                      padding: 8px;
                      text-align: left;
                      border: 1px solid #ddd;
                    }
                    th {
                      background-color: #f2f2f2;
                    }
                  </style>
                </head>
                <body>
                  <h2>Chào bạn,</h2>
                  <p>Đơn hàng của bạn đã được xác nhận hoàn thành!</p>
                  <h3>Danh sách sản phẩm trong đơn hàng</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                      </tr>
                    </thead>
                    <tbody>
            `;

              tableData.forEach((item) => {
                productDetailsHtml += `
                <tr>
                  <td>${item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price}</td>
                </tr>
              `;
              });

              productDetailsHtml += `
                    </tbody>
                  </table>
                  <p><strong>Mã đơn hàng của bạn là: </strong>${don_hangid}</p>
                  <p>Chân thành cảm ơn!</p>
                </body>
              </html>
            `;

              // Gửi email với HTML nội dung
              await sendEmail(
                email,
                "Xác nhận đơn hàng hoàn thành",
                productDetailsHtml // Đây là HTML đầy đủ
              );
              console.log("Phản hồi từ API:", response.data);
              Alert.alert("Thành công", "Bạn xác nhận đơn hàng thành công!");
              router.push("/(tabs)/listDonHang");
            } catch (error) {
              console.error("Lỗi khi gọi API nhan_don_hang:", error);
              Alert.alert(
                "Lỗi",
                "Không thể xác nhận đơn hàng. Vui lòng thử lại."
              );
            }
          },
        },
      ],
      { cancelable: false } // Không cho phép đóng Alert ngoài các nút lựa chọn
    );
  };

  const fetchOrderDetails = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/detail/donhang/${id}`);
      setOrderDetails(response.data);
      setEmail(response.data[0][11]);
      setPhuongthuctt(response.data[0][12]);
      console.log("Dữ liệu đơn hàng:", response.data);
      console.log("Dữ liệu đơn hàng thứ 11 nè :", response.data[0][11]);
      console.log("Dữ liệu đơn hàng thứ 12 nè :", response.data[0][12]);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi gọi API chi tiết đơn hàng:", error);
      setLoading(false);
    }
  };

  const handleClickToMap = (address) => {
    const formattedAddress = encodeURIComponent(address);
    router.push(`/map/${formattedAddress}`);
  };

  useEffect(() => {
    if (id) {
      fetchOrderDetails(id);
      loadHinhAnhTheoDonHang(id);
    }
  }, []);

  if (loading) {
    return <Text>Đang tải...</Text>;
  }

  if (!orderDetails) {
    return <Text>Không có dữ liệu đơn hàng</Text>;
  }

  // const tableHead = ["Tên sản phẩm", "Số lượng", "Đơn giá"];
  // const tableData = orderDetails.map((item) => [item[8], item[10], item[9]]);
  // const tableData =
  //   orderDetails?.length > 0
  //     ? orderDetails.map((item) => {item[8], item[10], item[9]})
  //     : [];

  const tableHead = {
    productName: "Tên sản phẩm",
    quantity: "Số lượng",
    price: "Đơn giá",
  };

  const tableData = orderDetails.map((item) => ({
    productName: item[8], // Tên sản phẩm
    quantity: item[10], // Số lượng
    price: item[9], // Đơn giá
  }));

  // Hàm mở Modal
  const openModal = () => {
    const don_hangid = id;
    console.log("Đơn hàng id nè: ", don_hangid);
    setModalVisible(true);
  };

  // Hàm đóng Modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Hàm xử lý khi gửi lý do
  const handleSubmit = async () => {
    if (!reason) {
      Alert.alert("Lỗi", "Vui lòng nhập lý do.");
      return;
    }
    const don_hangid = id;
    try {
      const response = await axios.put(
        `${BASE_URL}/update/shipper/huydonhang/tructiep`,
        null, // Không cần gửi body
        {
          params: {
            don_hangid: don_hangid, // Đúng với @RequestParam("don_hangid")
            ly_do: reason, // Sửa thành ly_do để trùng với back-end
            accountID: email,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Phản hồi từ API:", response.data);
      Alert.alert("Thành công", "Cập nhật trạng thái đơn hàng thành công!");
      sendEmail(
        email,
        "Hủy đơn hàng",
        "Bạn đã hủy đơn hàng nếu như tiếp tục vi phạm 3 lần không nhận hàng thì bạn sẽ không thể thanh toán trực tiếp nữa"
      );
      closeModal(); // Đóng Modal sau khi gửi
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      Alert.alert("Lỗi", "Không thể cập nhật trạng thái đơn hàng.");
    }
  };

  const handleSubmitTrucTuyen = async () => {
    if (!reason) {
      Alert.alert("Lỗi", "Vui lòng nhập lý do.");
      return;
    }
    const don_hangid = id;
    try {
      const response = await axios.put(
        `${BASE_URL}/update/shipper/huydonhang/tructuyen`,
        null, // Không cần gửi body
        {
          params: {
            don_hangid: don_hangid, // Đúng với @RequestParam("don_hangid")
            ly_do: reason, // Sửa thành ly_do để trùng với back-end
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Phản hồi từ API:", response.data);
      Alert.alert("Thành công", "Cập nhật trạng thái đơn hàng thành công!");
      sendEmail(email, "Hủy đơn hàng", "Bạn đã không nhận đơn hàng.");
      closeModal(); // Đóng Modal sau khi gửi
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      Alert.alert("Lỗi", "Không thể cập nhật trạng thái đơn hàng.");
    }
  };

  return (
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

      {/* <View style={styles.tableContainer}>
        <Table borderStyle={styles.tableBorder}>
          <Row
            data={[tableHead.productName, tableHead.quantity, tableHead.price]}
            style={styles.tableHead}
            textStyle={styles.text} // Đảm bảo là đối tượng
          />
          <Rows
            data={tableData.map((item) => [
              item.productName,
              item.quantity,
              item.price,
            ])}
            textStyle={styles.text} // Đảm bảo là đối tượng
          />
        </Table>
      </View> */}
      <View style={styles.containerTable}>
        {/* Tiêu đề bảng */}
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.headerCell]}>
            {tableHead.productName}
          </Text>
          <Text style={[styles.cell, styles.headerCell]}>
            {tableHead.quantity}
          </Text>
          <Text style={[styles.cell, styles.headerCell]}>
            {tableHead.price}
          </Text>
        </View>

        {/* Dữ liệu bảng */}
        {tableData.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.tableRow}>
            <Text style={styles.cell}>{row.productName}</Text>
            <Text style={styles.cell}>{row.quantity}</Text>
            <Text style={styles.cell}>{row.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Tổng tiền:</Text>
        {phuongthuctt === "PTTT02" ? (
          <Text style={styles.totalAmount}>0 VND</Text>
        ) : (
          <Text style={styles.totalAmount}>{orderDetails[0][1]} VND</Text>
        )}
        {/* <Text style={styles.totalAmount}>{orderDetails[0][1]} VND</Text> */}
      </View>
      <View style={styles.imageContainer}>
        <Text style={styles.imageTitle}>Hình ảnh sản phẩm:</Text>
        {hinhAnhNe ? (
          <Image
            source={{ uri: `${URL_HinhAnh}/images/${hinhAnhNe}` }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.noImageText}>Chưa có hình ảnh...</Text>
        )}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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

        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => handleChupHinh(id)}
        >
          <Text style={styles.mapButtonText}>Chụp hình</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => handleHoanThanhDonHang()}
          disabled={!hinhAnhNe}
        >
          <Text style={styles.mapButtonText}>Xác nhận hoàn thành</Text>
        </TouchableOpacity>
      </View>
      {phuongthuctt === "PTTT02" || phuongthuctt === "PTTT03" ? (
        <View>
          <TouchableOpacity
            style={styles.mapButtonKhongNhanHang}
            onPress={openModal}
          >
            <Text style={styles.mapButtonTextKhongNhanHang}>
              Khách không nhận hàng
            </Text>
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal} // Đóng modal khi nhấn back button
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  Lý do khách không nhận hàng
                </Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Nhập lý do..."
                  placeholderTextColor="#aaa"
                  value={reason}
                  onChangeText={setReason} // Cập nhật lý do khi nhập
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.cancelButtonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmitTrucTuyen}
                  >
                    <Text style={styles.submitButtonText}>Gửi</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.mapButtonKhongNhanHang}
            onPress={openModal}
          >
            <Text style={styles.mapButtonTextKhongNhanHang}>
              Khách không nhận hàng khi giao
            </Text>
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal} // Đóng modal khi nhấn back button
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  Lý do khách không nhận hàng
                </Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Nhập lý do..."
                  placeholderTextColor="#aaa"
                  value={reason}
                  onChangeText={setReason} // Cập nhật lý do khi nhập
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.cancelButtonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitButtonText}>Gửi</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </ScrollView>
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
    paddingHorizontal: 45, // Đệm ngang
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
  mapButtonKhongNhanHang: {
    backgroundColor: "#FF0000",
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
  mapButtonTextKhongNhanHang: {
    color: "#fff", // Màu chữ trắng
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // In đậm chữ
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Làm mờ nền
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Hiệu ứng nổi trên Android
    shadowColor: "#000", // Hiệu ứng nổi trên iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
  // Hình ảnh
  imageContainer: {
    alignItems: "left", // Căn giữa nội dung trong container
    marginVertical: 10, // Khoảng cách trên và dưới
    //padding: 10,
    // backgroundColor: "#f8f9fa",  // Nền sáng để hình ảnh nổi bật hơn
    // borderRadius: 10,
    // shadowColor: "#000",  // Thêm bóng nhẹ cho phần container
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 3,  // Tạo bóng trong Android
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10, // Khoảng cách giữa tiêu đề và hình ảnh
    color: "#333", // Màu sắc của tiêu đề
  },
  image: {
    width: 370,
    height: 200,
    borderRadius: 10, // Bo góc hình ảnh
    borderWidth: 2,
    borderColor: "#ddd", // Viền mờ cho hình ảnh
    backgroundColor: "#e9ecef", // Màu nền khi không có ảnh
  },
  noImageText: {
    fontSize: 16,
    color: "#888", // Màu xám nhạt cho thông báo
    fontStyle: "italic",
  },
});
