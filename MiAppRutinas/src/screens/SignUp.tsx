import { Alert, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { signUpWithEmail } from "../config/firebase";


interface SignUpProps {
  navigation: any;
}

export default function SignUp({ navigation }: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { theme } = useTheme();

  const handleOnChangeEmail = (email: string) => {
    setEmail(email);
  };

  const handleOnChangePassword = (pwd: string) => {
    setPassword(pwd);
  };

  const handleOnChangeConfirmPassword = (pwd: string) => {
    setConfirmPassword(pwd);
  };

  const handleSignUp = async () => {
    try {
      if (!email || !password || !confirmPassword) {
        Alert.alert('Error', 'Por favor complete todos los campos');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
        return;
      }

      setLoading(true);
      
      const result = await signUpWithEmail(email, password);
      
      if (result.success) {
        Alert.alert(
          'Éxito', 
          'Usuario registrado exitosamente',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('LoginScreen')
            }
          ]
        );
      } else {
        Alert.alert('Error', result.error || 'Error al registrar usuario');
      }
    } catch (error: any) {
      Alert.alert('Error', 'Error inesperado al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.backgroundCard, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Crear Cuenta
        </Text>
        
        <CustomInput 
          type="email" 
          value={email} 
          title="Correo Electrónico" 
          onChange={handleOnChangeEmail}
          required={true}
        />
        
        <CustomInput 
          type="password" 
          value={password} 
          title="Contraseña" 
          onChange={handleOnChangePassword}
          required={true}
        />
        
        <CustomInput 
          type="password" 
          value={confirmPassword} 
          title="Confirmar Contraseña" 
          onChange={handleOnChangeConfirmPassword}
          required={true}
        />
        
        <CustomButton 
          title={loading ? "Registrando..." : "Crear Cuenta"}
          onPress={handleSignUp}
          variant="primary"
        />

        <CustomButton 
          title="Ya tengo cuenta - Iniciar Sesión"
          onPress={goToLogin}
          variant="tertiary"
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
    width: '90%',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});


