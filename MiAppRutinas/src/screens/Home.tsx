import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { i18n, useLanguage } from "../contexts/LanguageContext";
import CustomButton from "../components/CustomButton";
import { translations } from "../translations/i18n";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "../contexts/ThemeContext";

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  image_url: string;
};

export default function Home() {
  const { user } = useAuth();
  const { changeLanguage, language } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();

  const books: Book[] = [
    { id: "100", image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.goodreads.com%2Fbook%2Fshow%2F56916837-to-kill-a-mockingbird&psig=AOvVaw036T-ORpQ8aIciiTaxfQ5k&ust=1756682770650000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDVkrbXs48DFQAAAAAdAAAAABAW", title: "Cien años de soledad", author: "Gabriel García Márquez", genre: "Realismo mágico" },
    { id: "200", image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1612238791i/56916837.jpg", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Ficción clásica" },
    { id: "300", image_url: "https://example.com/images/the-pragmatic-programmer.jpg", title: "The Pragmatic Programmer", author: "Andrew Hunt y David Thomas", genre: "Tecnología / Software" },
    { id: "400", image_url: "https://example.com/images/el-nombre-del-viento.jpg", title: "El nombre del viento", author: "Patrick Rothfuss", genre: "Fantasía" }
  ];

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity style={[styles.card, isDarkMode && styles.darkCard]}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>{item.title}</Text>
        <Text style={[styles.author, isDarkMode && styles.darkText]}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { toggleTheme(); console.log("Theme toggled, isDarkMode:", !isDarkMode); }} style={styles.themeButton}>
          <Text style={styles.themeButtonText}>
            {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.welcomeText, isDarkMode && styles.darkText]}>
        Hola {user?.email}, {i18n.t('welcomeText')}
      </Text>
      <Text style={[styles.languageText, isDarkMode && styles.darkText]}>
        Tu idioma actual de traducción: {language}
      </Text>
      <View style={styles.translationsContainer}>
        <CustomButton title={"FR"} onPress={() => changeLanguage("fr")} variant={'primary'} />
        <CustomButton title={"EN"} onPress={() => changeLanguage("en")} variant={'primary'} />
        <CustomButton title={"ES"} onPress={() => changeLanguage("es")} variant={'primary'} />
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  darkContainer: { backgroundColor: '#333' },
  header: { padding: 10, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' },
  themeButton: { padding: 10, backgroundColor: '#ddd' },
  themeButtonText: { color: '#000' },
  welcomeText: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  languageText: { marginBottom: 10 },
  translationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  list: { paddingHorizontal: 16 },
  card: { flexDirection: 'row', borderRadius: 8, marginVertical: 8, padding: 10, backgroundColor: 'pink' },
  darkCard: { backgroundColor: '#555' },
  info: { flexShrink: 1 },
  title: { fontWeight: 'bold', fontSize: 16 },
  author: { color: 'dark-grey' },
  darkText: { color: '#fff' },
  image: { width: 80, height: 120 },
});