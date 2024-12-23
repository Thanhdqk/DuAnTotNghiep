// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, Alert, ActivityIndicator, Text } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";
// import * as Location from "expo-location";
// import axios from "axios";
// import { decode } from "@mapbox/polyline";

// const ORS_API_KEY = "5b3ce3597851110001cf62485f64ae1a27594ae49a2ee01a91b1d797"; // Thay bằng API key của bạn từ OpenRouteService

// type LocationType = {
//   latitude: number;
//   longitude: number;
// };

// export default function App() {
//   const [currentLocation, setCurrentLocation] = useState<LocationType | null>(
//     null
//   );
//   const [routeCoordinates, setRouteCoordinates] = useState<LocationType[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [lastUpdatedTime, setLastUpdatedTime] = useState<number>(0); // Thời gian cập nhật lần cuối

//   const destination: LocationType = {
//     latitude: 10.7385,
//     longitude: 106.6931,
//   };

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Quyền truy cập vị trí bị từ chối!");
//         return;
//       }

//       // Lấy vị trí ban đầu của người dùng
//       let location = await Location.getCurrentPositionAsync({});
//       const userLocation: LocationType = {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       };
//       setCurrentLocation(userLocation);
//       fetchRoute(userLocation, destination);

//       // Theo dõi vị trí hiện tại
//       const watchId = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           distanceInterval: 1, // Cập nhật khi di chuyển 1m
//         },
//         (newLocation) => {
//           const updatedLocation: LocationType = {
//             latitude: newLocation.coords.latitude,
//             longitude: newLocation.coords.longitude,
//           };
//           setCurrentLocation(updatedLocation);

//           // Cập nhật tuyến đường nếu đã đủ thời gian (ví dụ 5 giây) kể từ lần cập nhật cuối
//           const currentTime = new Date().getTime();
//           if (currentTime - lastUpdatedTime > 5000) {
//             fetchRoute(updatedLocation, destination);
//             setLastUpdatedTime(currentTime); // Cập nhật thời gian
//           }
//         }
//       );

//       return () => {
//         // Dừng theo dõi vị trí khi component bị unmount
//         watchId.remove();
//       };
//     })();
//   }, []);

//   const fetchRoute = async (
//     origin: LocationType,
//     destination: LocationType
//   ) => {
//     const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}`;
//     const data = {
//       coordinates: [
//         [origin.longitude, origin.latitude],
//         [destination.longitude, destination.latitude],
//       ],
//     };

//     try {
//       const response = await axios.post(url, data);
//       if (
//         response.data?.routes?.length > 0 &&
//         response.data.routes[0].geometry
//       ) {
//         const coords = decode(response.data.routes[0].geometry);
//         const formattedCoords = coords.map((coord: number[]) => ({
//           latitude: coord[0],
//           longitude: coord[1],
//         }));
//         setRouteCoordinates(formattedCoords);
//       } else {
//         setError("Không tìm thấy tuyến đường.");
//       }
//     } catch (error) {
//       setError("Lỗi khi lấy tuyến đường. Vui lòng thử lại.");
//     }
//   };

//   if (!currentLocation) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: currentLocation.latitude,
//           longitude: currentLocation.longitude,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//         showsUserLocation={true} // Hiện vị trí người dùng trên bản đồ
//         followsUserLocation={true} // Cập nhật vị trí của bản đồ theo người dùng
//       >
//         <Marker
//           coordinate={currentLocation}
//           title="Vị trí của bạn"
//           pinColor="blue"
//         />
//         <Marker
//           coordinate={destination}
//           title="19E1 Đường Số 48, Tân Phong, Q7"
//         />
//         {routeCoordinates.length > 0 && (
//           <Polyline
//             coordinates={routeCoordinates}
//             strokeColor="blue"
//             strokeWidth={3}
//           />
//         )}
//       </MapView>
//       {error && <Text style={styles.errorText}>{error}</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "red",
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     fontSize: 16,
//   },
// });
