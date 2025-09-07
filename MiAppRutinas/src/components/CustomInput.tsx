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
    const { colors } = useTheme();

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
        if (type == "password" && value.length < 4)
            return i18n.t('passwordMustBeStronger');
    }
    const error = getError();

    return (
        <View>
            <View style={[
                styles.inputContainer,
                { backgroundColor: colors.inputBackground, borderColor: error ? "red" : colors.border }
            ]}>
                <TextInput
                    style={[styles.input, { color: colors.inputText }]}
                    placeholder={title}
                    placeholderTextColor={colors.border}
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
                            color={colors.text}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={[styles.error, { color: "red" }]}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        paddingVertical: 12,
        fontSize: 18,
    },
    error: {
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 12,
        marginBottom: 10,
    }
});