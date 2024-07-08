import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomInput from "../components/input/CustomInput";
import { useForm } from "react-hook-form";
import { getData } from "../lib/storage";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../lib/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/button/CustomButton";

const ChangePassword = ({}) => {
  const [currentPassword, setCurrentPassword] = useState(null);
  const [isPasswordMatched, setIsPasswordMatched] = useState(null);
  const [loading, setLoading] = useState(false);

  const { _id } = useSelector((state) => state.user.user);

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const watchCurrentPassword = watch("currentPassword");

  useEffect(() => {
    const getUser = async (_id) => {
      //   setLoading(true);
      try {
        const token = await getData("token");

        if (!token) {
          return Alert.alert({ error: "Token not found" });
        }

        const response = await axios.get(`${API_URL}/user/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCurrentPassword(response.data.user.password);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        // setLoading(false);
      }
    };

    getUser(_id);
  }, [_id]);

  useEffect(() => {
    const subscription = watch((value) => {
      const match = value.currentPassword === currentPassword;
      setIsPasswordMatched(match);
      return () => subscription.unsubscribe();
    });
  }, [watchCurrentPassword]);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView className="flex-1">
        <View className="px-3">
          <View className="flex-row w-full justify-between items-center">
            <Text className="text-2xl font-bold">Hantera ditt lösenord</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="chevron-down" size={33} color={"black"} />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-800 py-2 text-base">
            På denna sida kan du byta ditt lösenord. Ange ditt nuvarande
            lösenord och välj ett nytt som stämmer överens med säkerhetskraven
            för att uppdatera dina inloggningsuppgifter.
          </Text>
        </View>

        <View className="mt-5 px-3">
          <View className={`${isPasswordMatched && "opacity-40"}`}>
            <CustomInput
              control={control}
              name="currentPassword"
              secureTextEntry={true}
              rules={{
                validate: (value) => {
                  const isMatched = value === currentPassword;
                  return (
                    isMatched ||
                    "Lösenordet matchar inte det nuvarande lösenordet."
                  );
                },
              }}
              editable={!isPasswordMatched}
              label="Nuvarande lösenord"
              icon="lock"
            />
          </View>
        </View>
        {isPasswordMatched ? (
          <View className="border-t flex-1 justify-between border-t-gray-300 mt-2 w-full px-3 py-5">
            <ScrollView>
              <CustomInput
                control={control}
                name="newPassword"
                secureTextEntry={true}
                rules={{
                  required: "Lösenordet får inte vara tomt.",
                  minLength: {
                    value: 8,
                    message: "Lösenordet måste vara minst 8 karaktärer.",
                  },
                }}
                label="Nytt lösenord"
                icon="lock"
              />
              <View className="pt-3">
                <CustomInput
                  control={control}
                  name="confirmPassword"
                  secureTextEntry={true}
                  rules={{
                    validate: (value) => {
                      const isMatched = value === getValues("newPassword");
                      return (
                        isMatched ||
                        "Lösenordet matchar inte det nya lösenordet."
                      );
                    },
                  }}
                  label="Bekräfta nya lösenordet"
                  icon="lock"
                />
              </View>
            </ScrollView>
            <View className="">
              {isValid ? (
                <CustomButton
                  styles={
                    "w-full bg-secondary p-3 items-center rounded-md mt-auto"
                  }
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text className="text-white text-lg font-medium">Spara</Text>
                </CustomButton>
              ) : null}
            </View>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;
