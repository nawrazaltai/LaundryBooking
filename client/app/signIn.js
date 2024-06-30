import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, setToken } from "./redux/features/user/userSlice";
import { Link, router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/input/InputField";
import CustomButton from "../components/button/CustomButton";

const SignIn = () => {
  const dispatch = useDispatch();
  const { token, status } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token, router]);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap();
    } catch (e) {
      if (e.error) {
        Alert.alert(e.error);
      } else {
        Alert.alert("Inloggning misslyckades, prova igen senare.");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 w-full h-full bg-base">
          <View className="h-[30%] flex items-center">
            <View className="w-[65%]">
              <Image
                resizeMode="contain"
                className="h-full w-full shadow-sm shadow-gray-800"
                source={require("../assets/washing-machine.png")}
              />
            </View>
          </View>

          <KeyboardAvoidingView
            behavior={"padding"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 130}
            className="h-full px-5 rounded-t-3xl bg-secondary"
          >
            <View className="mt-4">
              <Text className="text-3xl font-bold text-white">Logga in</Text>
              <Text className="text-base font-light mt-1.5 text-white">
                Logga in för att boka och hantera tvättider.
              </Text>
            </View>

            <View className="w-full flex flex-col mt-2">
              <InputField
                label="Användarnamn"
                placeholder={"Användarnamn"}
                icon="account"
                onChangeText={setUsername}
                value={username}
              />
              <InputField
                label="Lösenord"
                placeholder={"Lösenord"}
                secure={true}
                icon="lock"
                onChangeText={setPassword}
                value={password}
              />
            </View>
            <TouchableOpacity className="self-end mt-2">
              <Text className="text-white font-medium">Glömt lösenord?</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>

          <View className="mt-auto px-5 absolute bottom-10 w-full">
            <CustomButton
              styles={"w-full bg-accent py-3.5 items-center rounded-md"}
              onPress={handleLogin}
              status={status}
            >
              <Text className="text-[#363062] font-bold text-base">
                Logga in
              </Text>
            </CustomButton>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
