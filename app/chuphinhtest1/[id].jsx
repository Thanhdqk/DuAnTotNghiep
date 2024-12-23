import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  Image,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import BASE_URL from "../../config.js";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";

export default function mapne() {
  // Lấy id từ URL
  const { id } = useLocalSearchParams();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const { trangThai } = useState(false);
  const cameraRef = useRef(null);

  console.log("Địa chỉ nè: ", id);
  if (!id) {
    console.error("Lỗi: id là undefined.");
  } else {
    console.log("id từ URL:", id);
  }

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();

        if (photo?.uri) {
          setPhotoUri(photo.uri); // Cập nhật uri để hiển thị ảnh
          Alert.alert("Picture captured!", "You can save the image now.");
        } else {
          Alert.alert("Error", "Could not capture photo");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while taking the picture");
      }
    }
  }

  async function savePicture(photoUri) {
    try {
      // Tạo thư mục uploads/images nếu chưa có
      const directoryUri = FileSystem.documentDirectory + "uploads/images";
      const exists = await FileSystem.getInfoAsync(directoryUri);
      if (!exists.exists) {
        await FileSystem.makeDirectoryAsync(directoryUri, {
          intermediates: true,
        });
      }

      // Lấy tên ảnh
      const imageName = photoUri.split("/").pop() ?? "default_image.jpg";
      const newUri = directoryUri + "/" + imageName;

      // Di chuyển ảnh từ URI ban đầu vào thư mục mới
      await FileSystem.moveAsync({
        from: photoUri,
        to: newUri,
      });

      // Tạo FormData
      const formData = new FormData();
      formData.append("don_hangid", id); // ID đơn hàng
      formData.append("hinh_anh", {
        uri: newUri,
        type: "image/jpeg", // Kiểu MIME của ảnh
        name: imageName,
      }); // Thêm ảnh dưới dạng file

      console.log("Form data:", formData);

      // Gửi yêu cầu API
      const uploadResponse = await axios.put(
        `${BASE_URL}/update/shipper/hinhanh`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Kiểm tra phản hồi
      if (uploadResponse.status === 200) {
        Alert.alert("Success", uploadResponse.data);
        router.push(`/chitietdanhan/${id}`);
      } else {
        console.error("Response error:", uploadResponse); // In chi tiết phản hồi lỗi
        Alert.alert("Error", uploadResponse.data);
      }
    } catch (error) {
      console.error("Error details:", error.message); // In lỗi chung

      // Kiểm tra lỗi chi tiết từ server (nếu có)
      if (error.response) {
        console.error("Server Error Response:", error.response.data);
        console.error("Server Error Status:", error.response.status);
      }

      // Hiển thị thông báo lỗi
      Alert.alert("Error", `Upload failed: ${error.message}`);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => savePicture(photoUri || "")}
          >
            <Text style={styles.text}>Save Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});
