import { Text, View, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Delay } from "../delay";

export default function SplashScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  Delay(2000); // Thêm tham số delay mặc định là 2 giây
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Logo image with rings */}
      <Animated.View
        style={[styles.ringContainer, { padding: ring2padding.value }]}
      >
        <Animated.View style={[styles.ring, { padding: ring1padding.value }]}>
          <Image
            source={require("../../assets/images/shipper.png")}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      {/* Title and punchline */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Your one-stop delivery solution</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f59e0b", // tương đương với bg-amber-500
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  ringContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // tương đương với bg-white/20
    padding: 10,
    borderRadius: 100, // tương đương với rounded-full
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // tương đương với bg-white/20
    padding: 8,
    borderRadius: 100, // tương đương với rounded-full
  },
  logo: {
    width: hp(20),
    height: hp(20),
  },
  textContainer: {
    alignItems: "center",
    space: 2, // tương đương với space-y-2
  },
  title: {
    fontSize: hp(7),
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2, // tương đương với tracking-widest
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "white",
    letterSpacing: 2, // tương đương với tracking-widest
  },
});

//const navigation = useNavigation();

// useEffect(() => {
//   ring1padding.value = 0;
//   ring2padding.value = 0;
//   setTimeout(() => {
//     ring1padding.value = withSpring(ring1padding.value + hp(5), 100);
//   });

//   setTimeout(() => {
//     ring2padding.value = withSpring(ring2padding.value + hp(5.5), 300);
//   });

//   setTimeout(() => {
//     navigation.navigate("login");
//   }, 5000);
// });

// useEffect(() => {
//   // Chỉ thiết lập giá trị của padding một lần khi component mount
//   ring1padding.value = withSpring(hp(5), { stiffness: 100 });
//   ring2padding.value = withSpring(hp(5.5), { stiffness: 300 });
//   const timeout = setTimeout(() => {
//     // navigation.navigate("onboarding");
//     router.push("/onboarding");
//   }, 5000);

//   // Cleanup timeout khi component unmount
//   return () => clearTimeout(timeout);
// }, []);
