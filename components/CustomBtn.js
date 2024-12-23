import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, textScale, width } from "../styles/responsiveSize";
import colors from "../styles/colors";

const CustomBtn = ({ btnText, btnStyle, textStyle, onpress }) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{ ...styles.btnStyle, ...btnStyle }}
    >
      <Text style={{ ...styles.btnTextStyle, textStyle }}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.btnColor,
    paddingVertical: moderateScale(12),
    width: width / 1.7,
    alignItems: "center",
    height: moderateScale(44),
  },
  btnTextStyle: {
    fontSize: textScale(14),
    color: colors.white,
  },
});
