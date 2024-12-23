import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
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
import { useLocalSearchParams, useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id;
  //const { id } = useLocalSearchParams();
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

  async function savePicture() {
    if (photoUri) {
      try {
        await MediaLibrary.createAssetAsync(photoUri);
        Alert.alert("Picture saved!", "Image saved to your photo library");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while saving the picture");
      }
    } else {
      Alert.alert("Error", "No picture to save");
    }
  }

  return (
    // <View style={styles.container}>
    //   <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
    //     <View style={styles.buttonContainer}>
    //       <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
    //         <Text style={styles.text}>Flip Camera</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.button} onPress={takePicture}>
    //         <Text style={styles.text}>Take Picture</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.button} onPress={savePicture}>
    //         <Text style={styles.text}>Save Picture</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </CameraView>

    //   {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
    // </View>
    <View style={styles.container}>
      <Text>Chủp hình nè</Text>
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
