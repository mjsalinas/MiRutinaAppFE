import { Alert, Button, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { i18n, useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Login ({navigation}: any) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);

const {login, isAllowed, loading: authLoading} = useAuth();
const { theme } = useTheme();

const handleOnChangeEmail = (email: string) => {
    setEmail(email);
}
const handleOnChangePassword = (pwd: string) => {
    setPassword(pwd);
} 
const handleLogin = async () => {
try {
    if (!email || !password){
        Alert.alert('Error', 'Por favor complete todos los campos');
        return;
    }

    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
        // La navegación se manejará automáticamente por el AuthContext
        navigation.navigate('HomeScreen');
    } else {
        Alert.alert('Error', result.error || 'Error al iniciar sesión');
    }
} catch (error: any){
    Alert.alert('Error', 'Error inesperado al iniciar sesión');
} finally {
    setLoading(false);
}
};

const goToSignUp = () => {
    navigation.navigate('SignUpScreen');
};

return(
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.backgroundCard, { backgroundColor: theme.colors.card }]}>
            <CustomInput 
            type="email" 
            value={email} 
            title={"Correo"} 
            onChange={handleOnChangeEmail}            
            />
            <CustomInput type="password" 
            value={password} 
            title={"Contraseña"} 
            onChange={handleOnChangePassword}/>
            
            <CustomButton 
                title={loading ? "Iniciando sesión..." : i18n.t('signIn')}
                onPress={handleLogin}
            />

            <CustomButton 
                title={i18n.t('signUp')}
                onPress={goToSignUp} 
                variant={'secondary'}
            />

            <CustomButton 
                title={i18n.t('forgotPassword')}
                onPress={()=>{}} 
                variant={'tertiary'}
            />

        </View>
        </View>
    );
}


const styles = StyleSheet.create({
     container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    backgroundCard: {
        borderRadius: 15,
        padding: 30,
        width: '85%',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
})