import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/features/user/userSlice";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useForm, Controller } from "react-hook-form";
import TextView from "../components/profile/TextView";

const ProfileHeader = ({ isEditing, setIsEditing }) => {
  return (
    <View className="flex-row items-center justify-between px-2">
      <Link className="" href="/">
        <Icon name="chevron-left" color={"black"} size={40} />
      </Link>

      <Text className="text-2xl font-semibold">Profil</Text>

      <TouchableOpacity onPress={() => setIsEditing(!isEditing)} className="">
        <Icon
          name={isEditing ? "pencil-off-outline" : "pencil-outline"}
          color={"black"}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { _id, firstName, lastName, username, password } = useSelector(
    (state) => state.user.user
  );

  const { user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    dispatch(getUser(_id));
  }, [dispatch, _id]);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: { username, password: password },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaProvider>
      <StatusBar />
      <SafeAreaView className="flex-1 py-2.5 bg-gray-200">
        <ScrollView>
          <ProfileHeader isEditing={isEditing} setIsEditing={setIsEditing} />

          <View className="w-full flex-1 mt-5 px-4">
            <TextView
              label={"Fullständigt namn"}
              isEditing={isEditing}
              value={firstName + " " + lastName}
              icon="account"
            />

            <View className="flex mt-5">
              <Text className="text-gray-600 font-bold text-sm pb-1">
                Användarnamn
              </Text>

              <View className="flex flex-row items-center justify-between bg-gray-50 p-2.5 rounded-md">
                <Controller
                  control={control}
                  rules={{ required: "Användarnamnet får inte vara tomt." }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        className="flex text-black text-base flex-1"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />
                      <Icon name="at" size={25} color={"#363062"} />
                    </>
                  )}
                  name="username"
                />
              </View>
              {errors.username && (
                <Text className="text-sm text-red-600">
                  {errors.username.message}
                </Text>
              )}

              <View className="flex mt-5">
                <Text className="text-gray-600 font-bold text-sm pb-1">
                  Lösenord
                </Text>

                <View className="flex flex-row items-center justify-between bg-gray-50 p-2.5 rounded-md">
                  <Controller
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
                          <Icon name="lock" size={25} color={"#363062"} />
                        </View>
                      </>
                    )}
                  />
                </View>
                {errors.password && (
                  <Text className="text-sm text-red-600">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <TextView
                label="Lägenhetsnummer"
                icon="door"
                value={"1090"}
                isEditing={isEditing}
              />
            </View>

            {isDirty ? (
              <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Profile;
