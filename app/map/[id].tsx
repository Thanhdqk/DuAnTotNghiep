import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, ActivityIndicator, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { decode } from "@mapbox/polyline";
import { useLocalSearchParams } from "expo-router";

// Thay thế bằng API Key của bạn
const API_KEY = "76522ef7c966445aa62f2940182acc47"; // OpenCage API key
const ORS_API_KEY = "5b3ce3597851110001cf62485f64ae1a27594ae49a2ee01a91b1d797"; // ORS API Key
type LocationType = {
  latitude: number;
  longitude: number;
};

export default function App() {
  const { id } = useLocalSearchParams();
  console.log("Địa chỉ nè: ", id);

  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(
    null
  );
  const [destination, setDestination] = useState<LocationType | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LocationType[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Lấy vị trí hiện tại và địa chỉ từ URL
  // Lấy tọa độ từ địa chỉ sử dụng OpenCage Geocoding API
  const fetchCoordinatesFromAddress = async (
    address: string | number | boolean
  ) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const coords = response.data.results[0].geometry;
        // Kiểm tra nếu coords có dữ liệu, sau đó set state
        if (coords) {
          return {
            latitude: coords.lat,
            longitude: coords.lng,
          };
        } else {
          throw new Error("Không có tọa độ.");
        }
      } else {
        throw new Error("Không tìm thấy tọa độ từ địa chỉ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy tọa độ từ địa chỉ:", error);
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Quyền truy cập vị trí bị từ chối!");
        return;
      }

      // Lấy vị trí hiện tại của người dùng
      let location = await Location.getCurrentPositionAsync({});
      const userLocation: LocationType = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(userLocation);

      // Lấy tọa độ từ địa chỉ URL
      if (id) {
        try {
          const coords = await fetchCoordinatesFromAddress(id as string);
          if (coords) {
            setDestination(coords);
            fetchRoute(userLocation, coords);
          }
        } catch (err) {
          setError("Không tìm được tọa độ từ địa chỉ.");
        }
      }
    })();
  }, [id]);

  // Lấy tuyến đường từ vị trí hiện tại đến đích sử dụng OpenRouteService API
  const fetchRoute = async (
    origin: LocationType,
    destination: LocationType
  ) => {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}`;
    const data = {
      coordinates: [
        [origin.longitude, origin.latitude],
        [destination.longitude, destination.latitude],
      ],
    };

    try {
      const response = await axios.post(url, data);
      if (
        response.data?.routes?.length > 0 &&
        response.data.routes[0].geometry
      ) {
        const coords = decode(response.data.routes[0].geometry);
        const formattedCoords = coords.map((coord: number[]) => ({
          latitude: coord[0],
          longitude: coord[1],
        }));
        setRouteCoordinates(formattedCoords);
      } else {
        setError("Không tìm thấy tuyến đường.");
      }
    } catch (error) {
      setError("Lỗi khi lấy tuyến đường. Vui lòng thử lại.");
    }
  };

  if (!currentLocation || !destination) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker
          coordinate={currentLocation}
          title="Vị trí của bạn"
          pinColor="blue"
        />
        <Marker coordinate={destination} title={id as string} />
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="blue"
            strokeWidth={3}
          />
        )}
      </MapView>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 16,
  },
});
