import { Alert, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { i18n } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Login ({navigation}: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const { isDark, changeTheme, theme } = useTheme();

    const handleOnChangeEmail = (email: string) => {
        setEmail(email);
    }
    const handleOnChangePassword = (pwd: string) => {
        setPassword(pwd);
    } 
    const handleLogin = () => {
        try {
            if (!email || !password){
                Alert.alert('Error', 'Por favor complete todos los campos');
                return;
            }
            login(email);
            navigation.navigate('HomeScreen', {correo: email});
        } catch (error: any){
            console.error(error);
        }
    };

    const handleThemeChange = () => {
        if (theme === 'auto') {
            changeTheme('light');
        } else if (theme === 'light') {
            changeTheme('dark');
        } else {
            changeTheme('auto');
        }
    }

    const styles = getStyles(isDark);

    return(
        <View style={styles.container}>
            <View style={styles.backgroundCard}>
                <CustomInput 
                    type="email" 
                    value={email} 
                    title={i18n.t('email')} 
                    onChange={handleOnChangeEmail}            
                />
                <CustomInput 
                    type="password" 
                    value={password} 
                    title={i18n.t('password')} 
                    onChange={handleOnChangePassword}
                />
                
                <CustomButton 
                    title={i18n.t('signIn')}
                    onPress={handleLogin}
                />

                <CustomButton 
                    title= {i18n.t('signUp')}
                    onPress={()=>{}} 
                    variant={'secondary'}
                />

                <CustomButton 
                    title={i18n.t('forgotPassword')}
                    onPress={()=>{}} 
                    variant={'tertiary'}
                />
            </View>
            <View style={styles.themeButtonContainer}>
                <CustomButton title={`Theme: ${theme}`} onPress={handleThemeChange} variant={'primary'} />
            </View>
        </View>
    );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? '#1E1E2C' : '#F5F5F5', // Fondo oscuro moderno o gris claro
        padding: 20,
    },
    backgroundCard: {
        backgroundColor: isDark ? '#2C2C3A' : '#FFFFFF', // Un poco más claro que el fondo oscuro o blanco
        borderRadius: 15,
        padding: 30,
        width: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.5 : 0.2,
        shadowRadius: 5,
        elevation: 5, // for Android shadow
    },
    themeButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    }
});
