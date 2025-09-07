import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function CustomButton ({title, onPress, variant='primary'}: Props){
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        button: {
            height: 45,
            padding: 12,
            margin: 10, 
            borderRadius: 5,
            backgroundColor:
              variant === 'primary' ? colors.buttonPrimary : 
              variant === 'secondary' ? colors.buttonSecondary : 'transparent',
        }, 
        text: {
            color: variant === "tertiary" ? colors.text : colors.buttonText,
            fontWeight: 'bold',
        },
    });

    return( 
        <TouchableOpacity  style={styles.button} onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}