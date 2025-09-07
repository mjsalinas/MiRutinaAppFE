import { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { i18n } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

type Props = {
    value: string;
    title: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'numeric';
    onChange: (text: string) => void;
    required?: boolean;
}

export default function CustomInput({ value, title, type = "text", onChange, required }: Props) {
    const [isSecureText, setIsSecureText] = useState(type === 'password');
    const [isPasswordVisible, setIsPasswordVisible] = useState (false);
    const { isDark } = useTheme();

    const isPasswordField = type==="password";
    const keyboardType: KeyboardTypeOptions =
        type === 'email' ? 'email-address' :
            type === 'number' ? 'number-pad' :
                type === 'numeric' ? 'numeric' :
                    'default';


    const getError = () => {
        if (required && !value)
            return "El campo es obligatorio";
        if (type === "email" && !value.includes("@"))
            return i18n.t('invalidEmail');
        if (type == "password" && value.length < 6)
            return i18n.t('passwordMustBeStronger')
        return null;
    };

    const error = getError();

    // Estilos dinámicos basados en el tema
    const themeStyles = StyleSheet.create({
        inputContainer: {
            borderColor: isDark ? '#4a4a6b' : '#ccc',
            backgroundColor: isDark ? '#2c2c42' : '#f9f9f9',
        },
        input: {
            color: isDark ? '#ededf7' : '#000',
        },
        placeholder: {
            color: isDark ? '#aaaaaa' : '#5c5c5c',
        },
        icon: {
            color: isDark ? '#ededf7' : '#010117',
        },
    });

    return (
        <View>
            <View style={[styles.inputContainer, themeStyles.inputContainer]}>
                <TextInput
                    style={[styles.input, themeStyles.input]}
                    placeholder={title}
                    placeholderTextColor={isDark ? '#aaaaaa' : '#5c5c5c'}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={isSecureText}
                    keyboardType={keyboardType}
                />
                 {isPasswordField && (
                    <TouchableOpacity
                        onPress={() => {
                            setIsPasswordVisible(!isPasswordVisible);
                            setIsSecureText(!isSecureText);
                        }}>
                        <Icon
                            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                            size={20}
                            style={themeStyles.icon}
                        />
                    </TouchableOpacity>
                )}
            </View>
            
        </View>

    );
};

const styles = StyleSheet.create(
    {
        input: {
            paddingVertical: 12,
            fontSize: 18,
            flex: 1,
        },
        inputError: {
            borderColor: 'red'
        },
        error: {
            color:'red',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 12,
        }
    }
)