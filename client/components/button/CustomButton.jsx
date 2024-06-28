import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({ children, styles, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className={styles}>
      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;
