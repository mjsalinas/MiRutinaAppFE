import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary';
    style?: object;
    textStyle?: object;
}
// componente con props
export default function CustomButton ({title, onPress, variant='primary'}: Props){
            const styles = getStyles(variant);
            // Desestructurar style y textStyle
            const { style, textStyle } = arguments[0];
            return( 
                <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
                    <Text style={[styles.text, textStyle]}>{title}</Text>
                </TouchableOpacity>
            );
}
// funcion con parametros para generar estilos
const getStyles = (variant: 'primary' | 'secondary' | 'tertiary') => {
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
        color: variant === "primary" || variant === "secondary" ? 
        '#ededf7' : '#010117',
        fontWeight: 'bold',
       },

    })
}