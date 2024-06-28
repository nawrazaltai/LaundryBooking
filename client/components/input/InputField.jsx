import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";

const InputField = ({ placeholder, secure, icon, onChangeText, value }) => {
  const [showPassword, setShowPassword] = useState(secure);

  return (
    <View className="flex flex-row items-center border-b border-b-zinc-300 h-12 w-full my-1">
      <Icon name={icon} color={"#FFF"} size={30} />
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        value={value}
        secureTextEntry={showPassword}
        placeholderTextColor={"#FFF"}
        className="pl-2.5 pb-0.5 text-base flex-1 text-[#FFF] placeholder:font-light focus:text-white font-medium"
      />
      {secure && (
        <TouchableOpacity className="ml-auto">
          <Octicons
            onPress={() => setShowPassword(!showPassword)}
            name={showPassword ? "eye-closed" : "eye"}
            color="#FEFBF6"
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
