import { SafeAreaView, Text, View, Keyboard, Alert } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import COLORS from "../../consts/colors";
import Input from "../conponents/input";
import Loader from "../conponents/Loader";
import Button from "../conponents/Button";

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ email: " ", password: " " });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    Keyboard.dismiss();
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          navigation.navigate("HomeScreen");
          AsyncStorage.setItem(
            "userData",
            JSON.stringify({ ...userData, loggedIn: true })
          );
        } else {
          Alert.alert("Error", "Invalid details");
        }
      } else {
        Alert.alert("Error", "User does not exist");
      }
    }, 3000);
  };

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Login
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 16, marginVertical: 10 }}>
          Enter Your Details To Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleChange(text, "email")}
            onFocus={() => handleError(null, "email")}
            label="Email"
            iconName="email-outline"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleChange(text, "password")}
            onFocus={() => handleError(null, "password")}
            label="Password"
            iconName="lock-outline"
            placeholder="Enter your password"
            password
            error={errors.password}
          />
          <Button title="Login" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("RegisterationScreen")}
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: COLORS.black,
              textAlign: "center",
            }}
          >
            Don't have account ? Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
