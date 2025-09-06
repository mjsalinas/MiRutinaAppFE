import { FlatList, Image, StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { i18n, useLanguage } from "../contexts/LanguageContext";
import CustomButton from "../components/CustomButton";
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
  const { theme, isDark, toggleTheme } = useTheme();

  const books: Book[] = [
    { id: "100", image_url: "https://example.com/sol.jpg", title: "Cien años de soledad", author: "Gabriel García Márquez", genre: "Realismo mágico" },
    { id: "200", image_url: "https://example.com/mock.jpg", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Ficción clásica" },
  ];

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: isDark ? "#333" : "#f9f9f9" }]}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={{ color: isDark ? "#fff" : "#000", fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
        <Text style={{ color: isDark ? "#ddd" : "#444" }}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? "#121212" : "#fff", padding: 16 }}>
      <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 18, fontWeight: "bold" }}>
        Hola {user?.email}, {i18n.t('welcomeText')}
      </Text>

      {/* Switch de Tema */}
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
        <Text style={{ color: isDark ? "#fff" : "#000", marginRight: 8 }}>Tema actual: {theme}</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      {/* Idiomas */}
      <View style={styles.translationsContainer}>
        <CustomButton title={"FR"} onPress={() => changeLanguage("fr")} />
        <CustomButton title={"EN"} onPress={() => changeLanguage("en")} />
        <CustomButton title={"ES"} onPress={() => changeLanguage("es")} />
      </View>

      {/* Lista */}
      <FlatList data={books} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  translationsContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10 },
  card: { flexDirection: 'row', borderRadius: 8, marginVertical: 8, padding: 10 },
  info: { flexShrink: 1, marginLeft: 10 },
  image: { width: 80, height: 120, borderRadius: 8 },
});
