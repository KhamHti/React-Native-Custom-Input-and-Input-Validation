import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import COLORS from '../../consts/colors';

const Button = ({title, onPress= () => {} }) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                height: 55,
                width: '100%',
                backgroundColor: COLORS.darkBlue,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20}} 
        >
            <Text style={{
                color: COLORS.white,
                fontSize: 19,
                fontWeight: 'bold',     
            }} > 
            {title} 
            </Text>
        </TouchableOpacity>
    );
};

export default Button;