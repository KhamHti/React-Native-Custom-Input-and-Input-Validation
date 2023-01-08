import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, SafeAreaView, ScrollView, Keyboard, Alert } from 'react-native';
import React, {useState} from 'react';


import COLORS from '../../consts/colors';
import Input from '../conponents/input';
import Button from '../conponents/Button';
import Loader from '../conponents/Loader';


const RegisterationScreen = ({navigation}) => {

  const [inputs, setInputs] = useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validation = () => {
    let isValid = true;
    Keyboard.dismiss();

    if (!inputs.email) {
        handleError('Please input email', 'email');
        isValid = false;
    }else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input real email', 'email');
        isValid = false;
    };

    if(!inputs.fullname){
      handleError('Please input fullname', 'fullname');
      isValid = false;
    };
    if(!inputs.phone){
      handleError('Please input phone number', 'phone');
      isValid = false;
    };
    if(!inputs.password){
      handleError('Please input password', 'password');
      isValid = false;
    }else if (inputs.password.length < 5 ) {
      handleError("password requires at least 5", "password")
      isValid = false;
    };

    if(isValid){
      register();
    }
  };

  

  const register = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        try {
          AsyncStorage.setItem( "userData", JSON.stringify(inputs));
          navigation.navigate("LoginScreen")
        } catch (error) {
          Alert.alert("Error", " Somethins went wrong ")
        }
      }, 3000);
  };

  const handleChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]:text}));
  }; 

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  return (
    <SafeAreaView style = {{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle = {{paddingTop: 50, paddingHorizontal: 20}} >
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold' }} >Register</Text>
        <Text style={{color: COLORS.grey, fontSize: 16, marginVertical: 10, }} >Enter Your Details To Register</Text>
        <View style={{marginVertical: 20}} >
          <Input 
            label="Email" 
            iconName='email-outline'
            placeholder="Enter your email address"
            error={errors.email}
            onFocus = {() => handleError(null, 'email')}
            onChangeText={(text) => handleChange(text, "email") }
          />

          <Input 
            label="Full Name" 
            iconName='account-outline'
            placeholder="Enter your full name"
            onChangeText={(text) => handleChange(text, "fullname")}
            error={errors.fullname}
            onFocus = {() => handleError(null, 'fullname')}
          />

          <Input 
            keyboardType="numeric"
            label="Phone Number" 
            iconName='phone-outline'
            placeholder="Enter your phone number"
            onChangeText={(text) => handleChange(text, "phone") }
            error={errors.phone}
            onFocus = {() => {handleError(null, 'phone')}}
          />

          <Input 
            label="Password" 
            iconName='lock-outline'
            placeholder="Enter your password"
            password
            error={errors.password}
            onFocus = {() => {handleError(null, 'password')}}
            onChangeText={(text) => handleChange(text, "password") }
          />

          <Button title="Register" onPress={validation} />

          <Text 
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              fontWeight: 'bold', 
              fontSize: 16, 
              color: COLORS.black, 
              textAlign: 'center',
              }} 
          >
            Already have account ? Login 
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterationScreen;