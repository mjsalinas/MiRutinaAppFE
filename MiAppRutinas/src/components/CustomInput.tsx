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
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { isDark } = useTheme();

    const styles = getStyles(isDark);

    const isPasswordField = type === "password";
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
        if (type == "password" && value.length < 4)
            return i18n.t('passwordMustBeStronger');
    }
    const error = getError();

    return (
        <View >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={title}
                    placeholderTextColor={isDark ? '#A9A9A9' : '#808080'}
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
                            color={isDark ? '#FFFFFF' : '#000000'} />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.error}>{error} </Text>
        </View>

    );
};

const getStyles = (isDark: boolean) => StyleSheet.create(
    {
        input: {
            flex: 1,
            paddingVertical: 12,
            fontSize: 18,
            color: isDark ? '#FFFFFF' : '#000000'
        },
        inputError: {
            borderColor: 'red'
        },
        error: {
            color: '#E57373',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: isDark ? '#555555' : '#ccc',
            borderRadius: 5,
            paddingHorizontal: 12,
            backgroundColor: isDark ? '#2C2C3A' : '#f9f9f9ff'
        }
    }
)