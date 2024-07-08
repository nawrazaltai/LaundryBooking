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
import { Link } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useForm, Controller } from "react-hook-form";
import TextView from "../components/profile/TextView";
import axios from "axios";
import { getData } from "../lib/storage";
import CustomButton from "../components/button/CustomButton";
import { API_URL } from "../lib/constants";
import CustomInput from "../components/input/CustomInput";

const ProfileHeader = ({ isValid, handleSubmit, onSubmit }) => {
  return (
    <View className="flex flex-row items-center justify-between border-b border-b-gray-300 pb-2 px-3">
      <Link className="flex-1 " href="/">
        <Icon name="chevron-left" color={"black"} size={40} />
      </Link>

      <View className="flex-1 ">
        <Text className="text-2xl mx-auto font-semibold">Profil</Text>
      </View>

      <View className=" flex-1 items-end pr-2">
        {isValid ? (
          <CustomButton
            styles={"bg-transparent"}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-xl font-bold text-blue-600">Spara</Text>
          </CustomButton>
        ) : null}
      </View>
    </View>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  // const [isEditing, setIsEditing] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { _id, username, firstName, lastName, apartmentNumber } = useSelector(
    (state) => state.user.user
  );

  // const { token } = useSelector((state) => state.user)
  // const { user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const getUser = async (_id) => {
  //     setLoading(true);
  //     try {
  //       const token = await getData("token");

  //       if (!token) {
  //         return Alert.alert({ error: "Token not found" });
  //       }

  //       const response = await axios.get(`${API_URL}/user/${_id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // setCurrentPassword(response.data.user.password);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getUser(_id);
  // }, [_id]);

  // useEffect(() => {
  //   if (password) {
  //     reset((prevValues) => ({ ...prevValues, password: password }));
  //   }
  // }, [password]);

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
              <Text className="text-xl pt-5 font-bold ">Personligt</Text>

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
              <Text className="text-xl font-bold pb-2 pt-5">Konto</Text>
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
                <Text className="text-gray-600 font-bold text-sm pb-1">
                  Lösenord
                </Text>

                <View className="flex flex-row items-center justify-between bg-gray-50 p-2.5 rounded-md">
                  <Link
                    // password={currentPassword}
                    href={"/changePassword"}
                    asChild
                  >
                    <TouchableOpacity className="flex flex-1 flex-row justify-between">
                      <View className="flex-row  items-center">
                        <Text className="text-base font-medium">
                          Hantera lösenord
                        </Text>
                        <Icon
                          name="chevron-right"
                          size={25}
                          color={"#363062"}
                        />
                      </View>
                      <Icon name="lock" size={25} color={"black"} />
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Profile;

{
  /* <Controller
                    control={control}
                    rules={{
                      required: "Lösenordet får inte vara tomt.",
                      minLength: {
                        value: 8,
                        message: "Lösenordet måste vara minst 8 karaktärer.",
                      },
                    }}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <TextInput
                          className="flex flex-1 text-black text-base"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          secureTextEntry={!showPassword}
                        />
                        <View className="flex-row gap-x-2">
                          <TouchableOpacity
                            onPressIn={() => setShowPassword(true)}
                            onPressOut={() => setShowPassword(false)}
                          >
                            <Icon name="eye" size={25} color={"#363062"} />
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  /> */
}
