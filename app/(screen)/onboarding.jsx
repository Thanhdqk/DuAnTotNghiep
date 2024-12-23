// import React, { useEffect } from "react";
// import PropTypes from "prop-types"; // Import PropTypes
// import { Image, StyleSheet, Text, View } from "react-native";
// import imagePath from "../../constants/imagePath";
// import { moderateScale, textScale } from "../../styles/responsiveSize";
// import colors from "../../styles/colors";
// import CustomBtn from "../../components/CustomBtn";
// // import navigationsStrings from "../../constants/navigationsStrings";
// // import { Link } from "expo-router";
// // import { useNavigation } from "expo-router";
// import { router } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useAuthRedirect } from "../useAuthRedirect";
// const Onboarding = () => {
//   //const navigation = useNavigation();
//   useAuthRedirect();
//   return (
//     <View style={styles.mainContainer}>
//       <Image source={imagePath.headerIc} style={styles.headerImage} />
//       <View style={styles.containerStyle}>
//         <Image source={imagePath.youngMan} style={styles.mainImage} />
//         <Text style={styles.getTextStyle}>Get things done with TODo</Text>
//         <Text style={styles.loremTextStyle}>
//           Lorem ipsum dolor sit amet, consectetur adipisicing. Maxime, tempore!
//           Animi nemo aut atque, deleniti nihil dolorem repellendus.
//         </Text>
//       </View>
//       <View style={styles.buttonContainer}>
//         <CustomBtn
//           btnText="Get Started"
//           //onpress={() => navigation.navigate("login")}
//           onpress={() => router.push("/login")}
//           //onpress={() => router.push("/test")}
//         />
//       </View>
//     </View>
//   );
// };

// // Add PropTypes validation
// // Onboarding.propTypes = {
// //   navigation: PropTypes.shape({
// //     navigate: PropTypes.func.isRequired,
// //   }).isRequired,
// // };

// export default Onboarding;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   headerImage: {
//     // Style as needed
//   },
//   containerStyle: {
//     alignItems: "center",
//     marginHorizontal: moderateScale(16),
//     flex: 0.8,
//     justifyContent: "center",
//   },
//   mainImage: {
//     // Style as needed
//   },
//   getTextStyle: {
//     fontSize: textScale(20),
//     color: colors.black,
//     fontWeight: "500",
//   },
//   loremTextStyle: {
//     textAlign: "center",
//     fontSize: textScale(13),
//     fontWeight: "500",
//     marginHorizontal: moderateScale(45),
//     marginTop: moderateScale(18),
//   },
//   buttonContainer: {
//     flex: 0.2,
//     alignItems: "center",
//   },
// });
