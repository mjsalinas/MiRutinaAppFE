import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function CustomButton ({title, onPress, variant='primary'}: Props){
    const { isDark } = useTheme();
    const styles = getStyles(variant, isDark);

    return( 
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const getStyles = (variant: 'primary' | 'secondary' | 'tertiary', isDark: boolean) => {
    return StyleSheet.create({
       button: {
        height: 45,
        padding: 12,
        margin: 10, 
        borderRadius: 5,
        backgroundColor:
          variant === 'primary' ? '#1c1c30' : 
          variant === 'secondary' ? '#65659c' : 'transparent',
       }, 
       text: {
        color: variant === 'tertiary' ? (isDark ? '#FFFFFF' : '#010117') : '#ededf7',
        fontWeight: 'bold',
       },
    })
}