import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Button from '../conponents/Button';

const HomeScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if(userData) {
        setUserDetails(JSON.parse(userData));
      }
  };

  const logout= () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({...userDetails, loggedIn: false}),
    );
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, paddingVertical: 10}} >
      <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 10}} >
           Welcome {userDetails?.fullname}
      </Text>
      <Image source={require('../../../assets/Luffy.jpeg')} style={{width: 200, height: 200}} />
      <Button title="Logout" onPress={logout} />
    </View>
  )
}

export default HomeScreen;