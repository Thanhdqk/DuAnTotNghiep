import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BASE_URL from "../../config.js";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListDonHang() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("unaccepted");
  const [shipperid, setShipperid] = useState("");
  const [ordersUnaccepted, setOrdersUnaccepted] = useState([]);
  const [ordersAccepted, setOrdersAccepted] = useState([]); // State cho danh sách đơn hàng đã nhận
  const [ordersDelivered, setOrdersDelivered] = useState([]);

  // Lấy đơn hàng chưa nhận
  const donHangChuaNhan = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/list/donHangChuaNhan`);
      const data = response.data;
      const formattedData = data.map(([id, time]) => ({
        id,
        name: `Mã đơn hàng: ${id}`,
        details: `Thời gian dự kiến: ${time}`,
      }));
      setOrdersUnaccepted(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Lấy đơn hàng đã giao
  // Lấy đơn hàng đã giao
  const donHangDaGiao = async () => {
    const shipperNe = await AsyncStorage.getItem("shipperid");
    setShipperid(shipperNe || "");
    try {
      const response = await axios.get(`${BASE_URL}/list/donHangDaGiao`, {
        params: { shipperid: shipperNe },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const data = response.data;
      const formattedData = data.map(([id, time]) => ({
        id,
        name: `Mã đơn hàng: ${id}`,
        details: `Thời gian dự kiến: ${time}`,
      }));
      setOrdersDelivered(formattedData);
    } catch (error) {
      console.error("Lấy đơn hàng đã giao thất bại: ", error);
    }
  };

  // Lấy đơn hàng đã nhận
  const donHangDaNhan = async () => {
    const shipperNe = await AsyncStorage.getItem("shipperid");
    setShipperid(shipperNe || "");
    try {
      const response = await axios.get(`${BASE_URL}/list/donHangDaNhan`, {
        params: { shipperid: shipperNe },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const data = response.data;
      const formattedData = data.map(([id, time]) => ({
        id,
        name: `Mã đơn hàng: ${id}`,
        details: `Thời gian dự kiến: ${time}`,
      }));
      setOrdersAccepted(formattedData); // Cập nhật danh sách đơn hàng đã nhận
    } catch (error) {
      console.error(error);
    }
  };

  // Điều hướng chi tiết đơn hàng chưa nhận
  const handleChiTietDonHang = (id) => {
    if (!id) {
      console.error("Không có id đơn hàng. id nhận được là: ", id);
      return;
    }
    router.push({
      pathname: `/chitiet/${id}`,
      query: { id: JSON.stringify(id) },
    });
  };

  const handleChiTietDonHangDaGiao = (id) => {
    if (!id) {
      console.error("Không có id đơn hàng. id nhận được là: ", id);
      return;
    }
    router.push({
      pathname: `/chitiet/${id}`,
      query: { id: JSON.stringify(id) },
    });
  };

  // Điều hướng chi tiết đơn hàng đã nhận
  const handleChiTietDonHangDaNhan = (id) => {
    if (!id) {
      console.error("Không có id đơn hàng. id nhận được là: ", id);
      return;
    }
    router.push({
      pathname: `/chitietdanhan/${id}`,
      query: { id: JSON.stringify(id) },
    });
  };

  useEffect(() => {
    donHangChuaNhan();
    donHangDaNhan();
    donHangDaGiao();
  }, []);

  // Chọn danh sách đơn hàng để hiển thị
  // const ordersToDisplay =
  //   selectedTab === "unaccepted" ? ordersUnaccepted : ordersAccepted;
  let ordersToDisplay;

  switch (selectedTab) {
    case "unaccepted":
      ordersToDisplay = ordersUnaccepted;
      break;
    case "accepted":
      ordersToDisplay = ordersAccepted;
      break;
    case "delivered":
      ordersToDisplay = ordersDelivered;
      break;
    default:
      ordersToDisplay = [];
  }

  // const renderOrderItem = useCallback(
  //   ({ item }) => {
  //     if (!item?.id) return null;

  //     const handlePress = () => {
  //       const action =
  //         selectedTab === "unaccepted"
  //           ? handleChiTietDonHang
  //           : handleChiTietDonHangDaNhan;
  //       handleChiTietDonHangDaGiao;
  //       action(item.id);
  //     };

  //     return (
  //       <TouchableOpacity onPress={handlePress} style={styles.orderItem}>
  //         <Text style={styles.orderName}>{item.name}</Text>
  //         <Text style={styles.orderDetails}>{item.details}</Text>
  //       </TouchableOpacity>
  //     );
  //   },
  //   [selectedTab, handleChiTietDonHang, handleChiTietDonHangDaNhan]
  // );
  const renderOrderItem = useCallback(
    ({ item }) => {
      if (!item?.id) return null;

      const handlePress = () => {
        let action;

        // Determine the action based on the selected tab
        switch (selectedTab) {
          case "unaccepted":
            action = handleChiTietDonHang;
            break;
          case "accepted":
            action = handleChiTietDonHangDaNhan;
            break;
          case "delivered":
            action = handleChiTietDonHangDaGiao;
            break;
          default:
            action = () => console.error("Không tìm thấy tab hợp lệ");
        }

        action(item.id);
      };

      return (
        <TouchableOpacity onPress={handlePress} style={styles.orderItem}>
          <Text style={styles.orderName}>{item.name}</Text>
          <Text style={styles.orderDetails}>{item.details}</Text>
        </TouchableOpacity>
      );
    },
    [selectedTab]
  );

  const tabTextMapping = {
    unaccepted: "Chưa nhận",
    accepted: "Đã nhận",
    delivered: "Đã giao",
  };
  return (
    <View style={styles.container}>
      {/* Tabs */}
      {/* <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "unaccepted" && styles.activeTab]}
          onPress={() => setSelectedTab("unaccepted")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "unaccepted" && styles.activeTabText,
            ]}
          >
            Đơn hàng chưa nhận
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "accepted" && styles.activeTab]}
          onPress={() => setSelectedTab("accepted")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "accepted" && styles.activeTabText,
            ]}
          >
            Đơn hàng đã nhận
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "delivered" && styles.activeTab]}
          onPress={() => setSelectedTab("delivered")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "delivered" && styles.activeTabText,
            ]}
          >
            Đơn hàng đã giao
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.tabContainer}>
        {["unaccepted", "accepted", "delivered"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tabTextMapping[tab] || "Unknown"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách đơn hàng */}
      <FlatList
        data={ordersToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.orderList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Màu nền nhẹ
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 28,
    backgroundColor: "#fff", // Nền trắng cho tab
    elevation: 3, // Hiệu ứng nổi
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#007BFF", // Màu xanh nổi bật
  },
  tabText: {
    fontSize: 16,
    color: "#6c757d",
    fontWeight: "500",
    textTransform: "uppercase", // Chữ in hoa
  },
  activeTabText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  orderList: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12, // Bo góc mềm mại
    elevation: 2, // Hiệu ứng nổi
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
  },
  orderDetails: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 4,
  },
});

// import React, { useEffect, useState } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import BASE_URL from "../../config.js";
// import axios from "axios";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function ListDonHang() {
//   const router = useRouter();
//   const [selectedTab, setSelectedTab] = useState("unaccepted");
//   const [shipperid, setShipperid] = useState("");
//   const [ordersUnaccepted, setOrdersUnaccepted] = useState([]);
//   const [ordersAccepted, setOrdersAccepted] = useState([]); // State cho danh sách đơn hàng đã nhận

//   // Lấy đơn hàng chưa nhận
//   const donHangChuaNhan = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/list/donHangChuaNhan`);
//       const data = response.data;
//       const formattedData = data.map(([id, time]) => ({
//         id,
//         name: `Mã đơn hàng: ${id}`,
//         details: `Thời gian dự kiến: ${time}`,
//       }));
//       setOrdersUnaccepted(formattedData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Lấy đơn hàng đã nhận
//   const donHangDaNhan = async () => {
//     const shipperNe = await AsyncStorage.getItem("shipperid");
//     setShipperid(shipperNe || "");
//     try {
//       const response = await axios.get(`${BASE_URL}/list/donHangDaNhan`, {
//         params: { shipperid: shipperNe },
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       });
//       const data = response.data;
//       const formattedData = data.map(([id, time]) => ({
//         id,
//         name: `Mã đơn hàng: ${id}`,
//         details: `Thời gian dự kiến: ${time}`,
//       }));
//       setOrdersAccepted(formattedData); // Cập nhật danh sách đơn hàng đã nhận
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Điều hướng chi tiết đơn hàng
//   const handleChiTietDonHang = (id) => {
//     if (!id) {
//       console.error("Không có id đơn hàng. id nhận được là: ", id);
//       return;
//     }
//     router.push({
//       pathname: `/chitiet/${id}`,
//       query: { id: JSON.stringify(id) },
//     });
//   };

//   useEffect(() => {
//     donHangChuaNhan();
//     donHangDaNhan(); // Lấy danh sách đơn hàng đã nhận
//   }, []);

//   // Chọn danh sách đơn hàng để hiển thị
//   const ordersToDisplay =
//     selectedTab === "unaccepted" ? ordersUnaccepted : ordersAccepted;

//   // Render đơn hàng
//   const renderOrderItem = ({ item }) => {
//     if (!item || !item.id) {
//       console.error("Lỗi: không có id trong item", item);
//       return null; // Trả về null nếu item không hợp lệ
//     }

//     return (
//       <TouchableOpacity onPress={() => handleChiTietDonHang(item.id)}>
//         <View style={styles.orderItem}>
//           <Text style={styles.orderName}>{item.name}</Text>
//           <Text style={styles.orderDetails}>{item.details}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tab, selectedTab === "unaccepted" && styles.activeTab]}
//           onPress={() => setSelectedTab("unaccepted")}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === "unaccepted" && styles.activeTabText,
//             ]}
//           >
//             Đơn hàng chưa nhận
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, selectedTab === "accepted" && styles.activeTab]}
//           onPress={() => setSelectedTab("accepted")}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               selectedTab === "accepted" && styles.activeTabText,
//             ]}
//           >
//             Đơn hàng đã nhận
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Danh sách đơn hàng */}
//       <FlatList
//         data={ordersToDisplay}
//         keyExtractor={(item) => item.id}
//         renderItem={renderOrderItem}
//         contentContainerStyle={styles.orderList}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   tabContainer: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderColor: "#d1d1d1",
//     marginTop: 28,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   activeTab: {
//     borderBottomWidth: 3,
//     borderBottomColor: "#007BFF",
//   },
//   tabText: {
//     fontSize: 16,
//     color: "#6c757d",
//   },
//   activeTabText: {
//     color: "#007BFF",
//     fontWeight: "bold",
//   },
//   orderList: {
//     padding: 16,
//   },
//   orderItem: {
//     backgroundColor: "#ffffff",
//     padding: 16,
//     marginBottom: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#e0e0e0",
//   },
//   orderName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#343a40",
//   },
//   orderDetails: {
//     fontSize: 14,
//     color: "#6c757d",
//     marginTop: 4,
//   },
// });
