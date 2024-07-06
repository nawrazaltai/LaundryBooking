import { Text, TextInput, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TextView = ({ label, isEditing, value, icon }) => {
  return (
    <View className={`flex mt-5  ${isEditing && "opacity-30"}`}>
      <Text className="text-gray-600 font-bold text-sm pb-1">{label}</Text>
      <View className="flex flex-row items-center justify-between bg-gray-50 p-2.5 rounded-md">
        <TextInput className="flex text-black" value={value} editable={false} />
        <Icon name={icon} size={25} color={"#363062"} />
      </View>
    </View>
  );
};

export default TextView;
