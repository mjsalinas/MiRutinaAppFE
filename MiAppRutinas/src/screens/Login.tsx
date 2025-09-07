import {Alert, StyleSheet, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {i18n} from '../contexts/LanguageContext';
import {useTheme} from '../contexts/ThemeContext';

export default function Login({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();
  const {isDark} = useTheme();

  const handleOnChangeEmail = (value: string) => setEmail(value);
  const handleOnChangePassword = (value: string) => setPassword(value);

  const handleLogin = () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Por favor complete todos los campos');
        return;
      }
      login(email);
      navigation.navigate('HomeScreen', {correo: email});
    } catch (error: any) {}
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? '#1E1E2C' : '#fff'},
      ]}>
      <View
        style={[
          styles.backgroundCard,
          {backgroundColor: isDark ? '#222' : '#fff'},
        ]}>
        <CustomInput
          type="email"
          value={email}
          title={'Correo'}
          onChange={handleOnChangeEmail}
        />
        <CustomInput
          type="password"
          value={password}
          title={'Contraseña'}
          onChange={handleOnChangePassword}
        />
        <CustomButton title={i18n.t('signIn')} onPress={handleLogin} />
        <CustomButton
          title={i18n.t('signUp')}
          onPress={() => {}}
          variant={'secondary'}
        />
        <CustomButton
          title={i18n.t('forgotPassword')}
          onPress={() => {}}
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
