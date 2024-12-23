import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "../styles/colors";
import { moderateScale, textScale, width } from "../styles/responsiveSize";

const TextInputComp = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  keyboardType,
  style,
}) => {
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{ ...styles.inputStyle, style }}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default TextInputComp;

const styles = StyleSheet.create({
  inputStyle: {
    marginBottom: moderateScale(26),
    backgroundColor: colors.white,
    width: width / 1.1,
    paddingVertical: moderateScale(12),
    height: moderateScale(56),
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    fontSize: textScale(13),
    fontWeight: "500",
    color: colors.black,
  },
});
