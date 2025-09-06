import { View, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {Login, isAllowed}=useAuth();

  const handleOnChangeEmail = (text: string) => {
    setEmail(text);
  };

  const handleOnChangePassword = (text: string) => {
    setPassword(text);
  };

  const handleRegistro = () => {
    
      navigation.navigate("RegistroScreen");
   
  };

  const handleLogin = () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Por favor complete todos los campos");
        return;
      }
      Login(email);
      navigation.navigate("HomeScreen", { correo: email });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <CustomInput
          title="Ingrese su correo"
          value={email}
          type="email"
          onChange={handleOnChangeEmail}
        />

        <CustomInput
          title="Ingrese su contraseña"
          value={password}
          type="password"
          onChange={handleOnChangePassword}
        />
      </View>

      <View style={styles.item}>
        <CustomButton title="Iniciar Sesion" onPress={handleLogin} />
      </View>

      <View style={styles.item}>
        <CustomButton
          title="Registrarme"
          onPress={handleRegistro}
          variant="secondary"
        />
      </View>

      <View style={styles.item}>
        <CustomButton
          title="Cambiar contraseña"
          onPress={() => {}}
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
    backgroundColor: '#73be1dff',
    padding: 20,
  },
  
  
  item: {
    marginVertical: 5, 
    width: '70%', 
  },
  
  backgroundCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});