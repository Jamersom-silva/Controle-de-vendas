import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string; // cor de fundo opcional
  style?: ViewStyle | ViewStyle[]; // style customizado opcional
  textStyle?: TextStyle | TextStyle[]; // style do texto opcional
};

const Button = ({ title, onPress, color, style, textStyle }: ButtonProps) => (
  <TouchableOpacity
    style={[styles.button, color ? { backgroundColor: color } : {}, style]}
    onPress={onPress}
  >
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Button;
