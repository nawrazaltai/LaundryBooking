import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useForm, Controller } from "react-hook-form";
import TextView from "../components/profile/TextView";
import CustomButton from "../components/button/CustomButton";
import CustomInput from "../components/input/CustomInput";
import { logout } from "./redux/features/user/userSlice";
import { router, Link, useNavigation } from "expo-router";

const ProfileHeader = ({ isValid, handleSubmit, onSubmit }) => {
  return (
    <View className="flex flex-row items-center justify-between border-b border-b-gray-300 pb-2 px-3">
      <Link className="flex-1 " href="/">
        <Icon name="chevron-left" color={"black"} size={40} />
      </Link>

      <View className="">
        <Text className="text-2xl mx-auto font-interSemi">Profil</Text>
      </View>

      <View className="flex-1 items-end pr-2">
        {isValid ? (
          <CustomButton
            styles={"bg-transparent"}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-xl font-interBold text-blue-600">Spara</Text>
          </CustomButton>
        ) : null}
      </View>
    </View>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { _id, username, firstName, lastName, apartmentNumber } = useSelector(
    (state) => state?.user?.user || {}
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: { username },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    // reset({ username: data.username });
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/signIn");
  };

  return (
    <SafeAreaProvider>
      <StatusBar />

      <SafeAreaView className="flex-1 py-2.5 bg-gray-200">
        <ProfileHeader
          isDirty={isDirty}
          isValid={isValid}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
        <KeyboardAvoidingView
          className="flex-1"
          behavior="padding"
          keyboardVerticalOffset={10}
        >
          <ScrollView>
            <View className="w-full px-4 ">
              <Text className="text-xl pt-5 font-interBold ">Personligt</Text>

              <View className="py-2 opacity-60">
                <TextView
                  label={"Fullständigt namn"}
                  value={firstName + " " + lastName}
                  icon="account"
                />
              </View>
              <View className="py-2 opacity-60">
                <TextView
                  label="Lägenhetsnummer"
                  icon="door"
                  value={apartmentNumber}
                />
              </View>
            </View>

            <View className="px-4">
              <Text className="text-xl font-interBold pb-2 pt-5">Konto</Text>
              <CustomInput
                control={control}
                name="username"
                label={"Användarnamn"}
                rules={{
                  required: "Användarnamnet får inte vara tomt.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ange en giltig e-postadress.",
                  },
                }}
                icon="at"
              />

              <View className="flex mt-5">
                <Text className="text-gray-600 font-interBold text-sm pb-1">
                  Lösenord
                </Text>

                <Link href={"/changePassword"} asChild>
                  <TouchableOpacity className="flex-1 flex-row items-center justify-between bg-gray-50 p-2.5 rounded-md">
                    <View className="flex-row  items-center">
                      <Text className="text-base font-interMedium">
                        Hantera lösenord
                      </Text>
                      <Icon name="chevron-right" size={25} color={"#363062"} />
                    </View>
                    <Icon name="lock" size={25} color={"black"} />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </ScrollView>

          <View className="w-full px-4 bottom-0 absolute">
            <CustomButton
              onPress={handleLogout}
              styles="flex-row items-center justify-center bg-red-400 p-3 rounded-md w-full items-center"
            >
              <Icon name="logout" color="#FFF" size={20} />
              <Text className="text-white pl-2 font-interMedium text-base">
                Logga ut
              </Text>
            </CustomButton>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Profile;
