import { Image, Text, View } from "react-native";

export default function Test() {
  return (
    <View>
      <Text>Test</Text>
      <Image
        source={require("../../assets/images/borad.png")} // Sử dụng require cho ảnh local
        style={{ width: 150, height: 150 }} // Đảm bảo kích thước ảnh hiển thị hợp lý
      />
      <Image
        source={{
          uri: "https://storage.googleapis.com/staging.thanhnehihi.appspot.com/icons8-find-50.png",
        }}
        style={{ width: 150, height: 150 }} // Đảm bảo kích thước ảnh hiển thị hợp lý
      />
    </View>
  );
}
