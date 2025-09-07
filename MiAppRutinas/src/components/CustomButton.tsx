import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function CustomButton ({title, onPress, variant='primary'}: Props){
    const { isDark } = useTheme(); // 1. Accede al tema
    const styles = getStyles(variant, isDark); // 2. Pasa isDark a la función de estilos

    return( 
    <TouchableOpacity  style={styles.button} onPress={onPress} >
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
    );
}

// 3. Modifica la función de estilos para aceptar isDark
const getStyles = (variant: 'primary' | 'secondary' | 'tertiary', isDark: boolean) => {
    
    // Define los colores según el tema
    const buttonPrimary = isDark ? '#4a4a6b' : '#1c1c30';
    const buttonSecondary = isDark ? '#8d8dae' : '#65659c';
    const buttonTertiaryText = isDark ? '#ededf7' : '#010117';
    const textColor = isDark ? '#ededf7' : '#ededf7';
    const secondaryTextColor = isDark ? '#ededf7' : '#010117';


    return StyleSheet.create({
       button: {
        height: 45,
        padding: 12,
        margin: 10, 
        borderRadius: 5,
        backgroundColor:
          variant === 'primary' ? buttonPrimary : 
          variant === 'secondary' ? buttonSecondary : 'transparent',
       }, 
       text: {
        color: variant === "primary" || variant === "secondary" ? 
        textColor : secondaryTextColor,
        fontWeight: 'bold',
       },
    })
}