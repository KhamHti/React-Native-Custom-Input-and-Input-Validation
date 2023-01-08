import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import COLORS from '../../consts/colors';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';


const Input = ({
    label, 
    iconName, 
    error , 
    password,
    onFocus = () => {},
    ...props
}) => {
    const [hidePassword, setHidePassword] = useState(password);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={{marginBottom: 20}} >
            <Text style={style.inputLabel} >{label}</Text>
            <View 
            style={[
                style.inputContainer, 
                {
                    borderColor: error
                    ? COLORS.red
                    : isFocused
                    ? COLORS.darkBlue 
                    : COLORS.light ,
                    alignItems: 'center',
                },
                ]}>
              <Icon 
                name = {iconName}
                style={{
                fontSize: 22, 
                color: COLORS.darkBlue, 
                marginRight: 10,
              }} />
              <TextInput 
              secureTextEntry={hidePassword}
              autoCorrect={false}
              onFocus ={() => {
                onFocus();
                setIsFocused(true);
              }}
              onBlur ={() => setIsFocused(false)}
              style={style.inputText} 
              {...props}  
              />
              {password && (
                <Icon 
                  onPress={() => setHidePassword(!hidePassword) }
                  style={{color: COLORS.darkBlue, fontSize: 22}}
                  name={hidePassword ? 'eye-outline': 'eye-off-outline'} />
              )}
            </View>
            {error && (
                <Text style={{color: COLORS.red, marginTop: 7, fontSize: 12}} >
                    {error}
                </Text>
            )}
        </View>
    );
};

const style = StyleSheet.create({
    inputLabel: {
        marginVertical: 5,
        fontSize: 15,
        color: COLORS.grey,
    },
    inputContainer: {
        backgroundColor: COLORS.light,
        height: 55,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        borderWidth: 0.3,
    },
    inputText: {
        color: COLORS.darkBlue,
        flex: 1,
    },
});

export default Input;