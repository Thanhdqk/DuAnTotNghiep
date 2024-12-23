// import { useLocalSearchParams } from "expo-router";
// import { View, Text, StyleSheet } from "react-native";

// export default function mapne() {
//   // Lấy id từ URL
//   const { id } = useLocalSearchParams();
//   console.log("Địa chỉ nè: ", id);
//   if (!id) {
//     console.error("Lỗi: id là undefined.");
//   } else {
//     console.log("id từ URL:", id);
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Chụp hình nè</Text>
//       <Text>ID Đơn hàng: {id}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
// });

import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams } from "expo-router";
import BASE_URL from "../../config.js";
import axios from "axios";

export default function App() {
  const { id } = useLocalSearchParams();
  const [facing, setFacing] = useState < CameraType > "back";
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = (useState < string) | (null > null);
  const cameraRef = useRef < CameraView > null;

  useEffect(() => {
    console.log("Đã nhận được ID:", id);
  }, [id]);
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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

  async function savePicture() {
    if (photoUri) {
      const formData = new FormData();
      formData.append("don_hangid", id); // ID đơn hàng
      formData.append("hinh_anh", {
        uri: photoUri,
        name: `photo_${Date.now()}.jpg`, // Đặt tên file
        type: "image/jpeg", // Loại file
      });

      try {
        const response = await axios.post(
          `${BASE_URL}/update/shipper/hinhanh`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          Alert.alert("Success", "Image uploaded successfully");
        } else {
          Alert.alert("Error", "Failed to upload image");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while uploading the picture");
      }
    } else {
      Alert.alert("Error", "No picture to upload");
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
          <TouchableOpacity style={styles.button} onPress={savePicture}>
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

// async function savePicture() {
//   if (photoUri) {
//     try {
//       // Lưu ảnh vào thư viện
//       const asset = await MediaLibrary.createAssetAsync(photoUri);
//       console.log("Photo saved to library:", asset);
//       Alert.alert("Picture saved!", "Image saved to your photo library");

//       // Tạo Blob từ ảnh
//       const response = await fetch(photoUri);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch image: ${response.statusText}`);
//       }

//       // Lấy tên file từ URI (tên file là phần cuối của đường dẫn)
//       const imageName = photoUri.split("/").pop();
//       console.log("Image name:", imageName);

//       // Tạo Blob từ URI (cần đọc tệp hình ảnh)
//       const blob = await response.blob();

//       // Chuẩn bị dữ liệu FormData
//       const formData = new FormData();
//       formData.append("don_hangid", id);
//       formData.append("hinh_anh", blob); // Gửi Blob với tên file

//       console.log("Form data:", formData);

//       // Gửi API
//       const uploadResponse = await axios.put(
//         `${BASE_URL}/update/shipper/hinhanh`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (uploadResponse.status === 200) {
//         Alert.alert("Success", uploadResponse.data);
//       } else {
//         Alert.alert("Error", uploadResponse.data);
//       }
//     } catch (error: unknown) {
//       const err = error as Error; // Type assertion: treating 'error' as an Error
//       console.error("Error details:", err.message);
//       Alert.alert("Error", `Upload failed: ${err.message}`);
//     }
//   } else {
//     Alert.alert("Error", "No picture to save");
//   }
// }
