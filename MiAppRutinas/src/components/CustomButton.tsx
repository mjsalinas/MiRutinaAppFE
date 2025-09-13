import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary';
}
// componente con props
export default function CustomButton ({title, onPress, variant='primary'}: Props){
    const { theme } = useTheme();
    const styles = getStyles(variant, theme);

    return( 
    <TouchableOpacity  style={styles.button} onPress={onPress} >
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
    );
}
// funcion con parametros para generar estilos
const getStyles = (variant: 'primary' | 'secondary' | 'tertiary', theme: any) => {
    return StyleSheet.create({
       button: {
        height: 45,
        padding: 12,
        margin: 10, 
        borderRadius: 5,
        backgroundColor:
          variant === 'primary' ? theme.colors.primary : 
          variant === 'secondary' ? theme.colors.secondary : 'transparent',
        borderWidth: variant === 'tertiary' ? 1 : 0,
        borderColor: variant === 'tertiary' ? theme.colors.primary : 'transparent',
       }, 
       text: {
        color: variant === "primary" || variant === "secondary" ? 
        '#FFFFFF' : theme.colors.primary,
        fontWeight: 'bold',
        textAlign: 'center',
       },

    })
}