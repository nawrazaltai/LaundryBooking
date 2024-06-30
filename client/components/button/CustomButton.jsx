import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const CustomButton = ({ children, styles, onPress, status }) => {
  return (
    <TouchableOpacity onPress={onPress} className={styles}>
      {status === "loading" ? (
        <ActivityIndicator color={"white"} size={"small"} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
