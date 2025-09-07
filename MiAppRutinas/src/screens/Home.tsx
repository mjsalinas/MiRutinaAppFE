import React from 'react';
import {FlatList, Image, StyleSheet, Text, View, Switch} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {i18n, useLanguage} from '../contexts/LanguageContext';
import CustomButton from '../components/CustomButton';
import {translations} from '../translations/i18n';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '../contexts/ThemeContext';

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  image_url: string;
};

export default function Home() {
  const {user} = useAuth();
  const {changeLanguage, language} = useLanguage();
  const {isDark, theme, setTheme} = useTheme();

  const books: Book[] = [
    {
      id: '100',
      image_url:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.goodreads.com%2Fbook%2Fshow%2F56916837-to-kill-a-mockingbird&psig=AOvVaw036T-ORpQ8aIciiTaxfQ5k&ust=1756682770650000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDVkrbXs48DFQAAAAAdAAAAABAW',
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      genre: 'Realismo mágico',
    },
    {
      id: '200',
      image_url:
        'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1612238791i/56916837.jpg',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Ficción clásica',
    },
    {
      id: '300',
      image_url: 'https://example.com/images/the-pragmatic-programmer.jpg',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt y David Thomas',
      genre: 'Tecnología / Software',
    },
    {
      id: '400',
      image_url: 'https://example.com/images/el-nombre-del-viento.jpg',
      title: 'El nombre del viento',
      author: 'Patrick Rothfuss',
      genre: 'Fantasía',
    },
  ];

  const renderItem = ({item}: {item: Book}) => (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: isDark ? '#333' : 'pink'}]}>
      <Image source={{uri: item.image_url}} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, {color: isDark ? '#fff' : '#222'}]}>
          {item.title}
        </Text>
        <Text style={[styles.author, {color: isDark ? '#aaa' : '#444'}]}>
          {item.author}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Switch para modo oscuro
  const isSwitchOn = theme === 'dark';
  const handleSwitch = (value: boolean) => setTheme(value ? 'dark' : 'light');

  return (
    <View
      style={[styles.container, {backgroundColor: isDark ? '#222' : '#fff'}]}>
      <Text
        style={{
          fontWeight: 'bold',
          color: isDark ? '#fff' : '#000',
          fontSize: 18,
          marginBottom: 10,
        }}>
        Hola {user?.email}, ¡Bienvenido a Home!
      </Text>
      <Text style={{color: isDark ? '#fff' : '#000'}}>
        Idioma actual: {language}
      </Text>

      {/* Botones para cambiar idioma */}
      <View style={styles.translationsContainer}>
        <CustomButton
          title={'FR'}
          onPress={() => changeLanguage('fr')}
          variant={'primary'}
        />
        <CustomButton
          title={'EN'}
          onPress={() => changeLanguage('en')}
          variant={'primary'}
        />
        <CustomButton
          title={'ES'}
          onPress={() => changeLanguage('es')}
          variant={'primary'}
        />
      </View>

      {/* Switch para modo oscuro */}
      <View style={styles.themeContainer}>
        <Text style={{color: isDark ? '#fff' : '#000', marginRight: 10}}>
          Modo Oscuro
        </Text>
        <Switch
          value={isSwitchOn}
          onValueChange={handleSwitch}
          thumbColor={isSwitchOn ? '#2196F3' : isDark ? '#fff' : '#222'}
          trackColor={{false: '#ccc', true: '#2196F3'}}
        />
      </View>

      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  translationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
  },
  info: {flexShrink: 1, marginLeft: 10},
  title: {fontWeight: 'bold', fontSize: 16},
  author: {color: 'dark-grey'},
  image: {
    width: 80,
    height: 120,
    borderRadius: 6,
  },
});
