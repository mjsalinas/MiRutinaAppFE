import { FlatList, Image, StyleSheet, Text, View, Switch } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { i18n, useLanguage } from "../contexts/LanguageContext";
import CustomButton from "../components/CustomButton";
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
  const { theme, colors, setTheme } = useTheme();

  const books: Book[] = [
    { id: "100", image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1612238791i/56916837.jpg", title: "Cien años de soledad", author: "Gabriel García Márquez", genre: "Realismo mágico" },
    { id: "200", image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1612238791i/56916837.jpg", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Ficción clásica" },
    { id: "300", image_url: "https://example.com/images/the-pragmatic-programmer.jpg", title: "The Pragmatic Programmer", author: "Andrew Hunt y David Thomas", genre: "Tecnología" },
  ];

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.author, { color: colors.text }]}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ fontWeight: "bold", color: colors.text, fontSize: 18 }}>
        Hola {user?.email}, {i18n.t('welcomeText')}
      </Text>
      <Text style={{ color: colors.text }}>Idioma actual: {language}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
        <Text style={{ color: colors.text, marginRight: 10 }}>Modo oscuro</Text>
        <Switch
          value={theme === "dark"}
          onValueChange={(val) => setTheme(val ? "dark" : "light")}
        />
        <CustomButton title="Auto" onPress={() => setTheme("auto")} />
      </View>

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
  translationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  list: { paddingHorizontal: 16 },
  card: {
    flexDirection:'row',
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
  },
  info: { flexShrink: 1, marginLeft: 10 },
  title: { fontWeight:'bold', fontSize: 16 },
  author: { fontSize: 14 },
  image: { width: 80, height: 120 },
});