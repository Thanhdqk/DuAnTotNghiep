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
export default function mapne() {
  // Lấy id từ URL
  const { id } = useLocalSearchParams();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
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

  // async function savePicture() {
  //   if (photoUri) {
  //     try {
  //       await MediaLibrary.createAssetAsync(photoUri);
  //       Alert.alert("Picture saved!", "Image saved to your photo library");
  //     } catch (error) {
  //       console.error(error);
  //       Alert.alert("Error", "An error occurred while saving the picture");
  //     }
  //   } else {
  //     Alert.alert("Error", "No picture to save");
  //   }
  // }

  async function savePicture(photoUri: string) {
    try {
      // Đọc hình ảnh từ URI và chuyển thành Blob
      const response = await fetch(photoUri);
      const blob = await response.blob();

      // Tạo tên file từ URI (sử dụng tên file cuối cùng trong đường dẫn)
      const imageName = photoUri.split("/").pop() ?? "default_image.jpg";
      console.log("Tên photoUri là: ", photoUri);
      console.log("Image name:", imageName);

      // Tạo một File từ Blob (File là subclass của Blob)
      const file = new File([blob], imageName, {
        type: "image/jpeg", // Đảm bảo đúng loại MIME
      });

      console.log("File nè:", file.name);
      console.log("File đây:", file);

      // Chuẩn bị FormData
      const formData = new FormData();
      formData.append("don_hangid", id); // ID đơn hàng, ví dụ
      formData.append("hinh_anh", file); // Sử dụng file Blob

      console.log("Form data:", formData);

      // Gửi yêu cầu API
      const uploadResponse = await axios.put(
        `${BASE_URL}/update/shipper/hinhanh`,
        formData
      );

      if (uploadResponse.status === 200) {
        Alert.alert("Success", uploadResponse.data);
      } else {
        Alert.alert("Error", uploadResponse.data);
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error details:", err.message);
      Alert.alert("Error", `Upload failed: ${err.message}`);
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
