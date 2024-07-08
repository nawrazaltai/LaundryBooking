import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PasswordEye = ({ setHidePassword, hidePassword }) => {
  return (
    <TouchableOpacity
      className="px-1.5"
      onPress={() => setHidePassword(!hidePassword)}
    >
      <Icon
        name={hidePassword ? "eye" : "eye-off"}
        size={25}
        color={"#363062"}
      />
    </TouchableOpacity>
  );
};

const CustomInput = ({
  control,
  name,
  rules,
  icon,
  editable,
  //   onBlur,
  label,
  secureTextEntry,
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View>
          <Text className="text-gray-600 font-bold text-sm pb-1">{label}</Text>
          <View className="flex flex-row items-center border border-gray-300 justify-between bg-gray-50 p-2.5 rounded-md">
            <TextInput
              className="flex text-black text-base  flex-1"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={hidePassword}
              editable={editable}
            />
            <View className="flex-row">
              {secureTextEntry && (
                <PasswordEye
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
              )}
              <Icon name={icon} size={25} color={"#363062"} />
            </View>
          </View>
          {error && (
            <Text className="text-sm text-red-600">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
};

export default CustomInput;
