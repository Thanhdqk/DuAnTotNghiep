import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import imagePath from "../../constants/imagePath";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../styles/responsiveSize";
import colors from "../../styles/colors";
import TextInputComp from "../../components/TextInputComp.js";
import CustomBtn from "../../components/CustomBtn";
import PropTypes from "prop-types";
import { useNavigation } from "expo-router";
import axios from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../config.js";
import { useAuthRedirect } from "../useAuthRedirect";

const Signin = () => {
  const navigation = useNavigation();
  const [shipperid, setShipperid] = useState("");
  const [password, setPassword] = useState("");

  useAuthRedirect();
  const payload = JSON.stringify({ shipperid, password });
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/login/mobile`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { message, token, shipperid, hinhAnh, hovaten, vaitro } =
        response.data;
      if (message === "Đăng nhập thành công!") {
        // Lưu thông tin vào AsyncStorage
        await AsyncStorage.setItem("data", JSON.stringify(response.data));
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("shipperid", shipperid);
        await AsyncStorage.setItem("hinhAnh", hinhAnh);
        await AsyncStorage.setItem("hovaten", hovaten);
        await AsyncStorage.setItem("vaitro", vaitro);
        const vaiTroNe = await AsyncStorage.getItem("vaitro");
        if (vaiTroNe.includes("Shipper")) {
          router.push("/(tabs)");
          console.log("Đăng nhập thành công");
          console.log("Data nè: ", await AsyncStorage.getItem("data"));
        } else {
          router.push("/login");
          console.log("Tài khoản bạn không có quyền truy cập!");
        }
      } else {
        console.log(message);
      }
    } catch (error) {
      if (error.response) {
        // Lỗi từ phía server (ví dụ: HTTP 400, 500)
        console.error("Lỗi từ server:", error.response.data); // In ra thông tin lỗi từ server
        console.error("Mã trạng thái HTTP:", error.response.status); // In ra mã trạng thái HTTP
        console.error("Tiêu đề lỗi:", error.response.headers); // In ra thông tin tiêu đề của phản hồi
      } else if (error.request) {
        // Lỗi khi yêu cầu không nhận được phản hồi từ server
        console.error("Không nhận được phản hồi từ server:", error.request);
      } else {
        // Lỗi khác (ví dụ, lỗi cấu hình trong axios)
        console.error("Lỗi cấu hình yêu cầu:", error.message);
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{ flex: 1, backgroundColor: colors.themebackgroundcolor }}
    >
      <View
        style={{
          flex: 1,
          paddingBottom: moderateScale(40),
          backgroundColor: colors.themebackgroundcolor,
        }}
      >
        <ImageBackground
          style={styles.backgroundStyle}
          resizeMode="cover"
          imageStyle={styles.imageBackStyle}
          source={imagePath.headerIc}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={imagePath.goBackArrow} />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.containViewStyle}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Image
            style={styles.whiteBoardImageStyle}
            source={imagePath.whiteBoard}
          />
          <TextInputComp
            value={shipperid}
            //onChangeText={(text) => setAccountID(text)}
            onChangeText={(text) => {
              setShipperid(text);
            }}
            placeholder={"Enter your AccountID "}
          />
          <TextInputComp
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={"Confirm Password"}
          />
          <Text style={styles.forgetText}>Forgot Password ?</Text>
          <CustomBtn
            btnStyle={{ marginTop: moderateScale(20) }}
            btnText={"Sign In "}
            onpress={handleLogin}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Signin;
// Signin.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };
const styles = StyleSheet.create({
  imageBackStyle: {
    height: height / 6.3,
    width: width / 2.1,
  },
  backgroundStyle: {
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(40),
  },
  containViewStyle: {
    alignItems: "center",
    marginTop: moderateScale(44),
  },
  welcomeText: {
    fontSize: textScale(20),
    fontWeight: "500",
    color: colors.black,
  },
  whiteBoardImageStyle: {
    marginTop: moderateScale(21),
    height: height / 2.3,
    width: width / 1.4,
  },
  forgetText: {
    color: colors.btnColor,
    fontSize: textScale(13),
    fontWeight: "500",
    marginTop: moderateScale(12),
  },
  redyText: {
    fontSize: textScale(15),
    marginTop: moderateScale(32),
  },
  signinText: {
    fontSize: textScale(15),
    color: colors.btnColor,
    fontWeight: "500",
  },
});
