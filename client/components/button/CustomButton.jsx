import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const CustomButton = ({ children, styles, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className={styles}>
      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;
