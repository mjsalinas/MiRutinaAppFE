import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { i18n, useLanguage } from "../contexts/LanguageContext";
import CustomButton from "../components/CustomButton";
import React from "react";
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
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const books: Book[] = [
    {
      id: "100",
      image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1612238791i/56916837.jpg",
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      genre: "Realismo mágico"
    },
    {
      id: "200",
      image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1612238791i/56916837.jpg",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Ficción clásica"
    },
    {
      id: "300",
      image_url: "https://example.com/images/the-pragmatic-programmer.jpg",
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt y David Thomas",
      genre: "Tecnología / Software"
    },
    {
      id: "400",
      image_url: "https://example.com/images/el-nombre-del-viento.jpg",
      title: "El nombre del viento",
      author: "Patrick Rothfuss",
      genre: "Fantasía"
    }
  ];

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: isDark ? "#333" : "pink" }]}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>{item.title}</Text>
        <Text style={[styles.author, { color: isDark ? "#ccc" : "#444" }]}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? "#000" : "#fff", padding: 16 }}>
      <Text style={{ fontWeight: "bold", color: isDark ? "#fff" : "#000", fontSize: 18 }}>
        Hola {user?.email}, {i18n.t("welcomeText")}
      </Text>
      <Text style={{ color: isDark ? "#fff" : "#000", marginBottom: 10 }}>
        Tu idioma actual de traducción: {language}
      </Text>

      <View style={styles.translationsContainer}>
        <CustomButton title="FR" onPress={() => changeLanguage("fr")} variant="primary" />
        <CustomButton title="EN" onPress={() => changeLanguage("en")} variant="primary" />
        <CustomButton title="ES" onPress={() => changeLanguage("es")} variant="primary" />
        <CustomButton title={isDark ? "Modo Claro" : "Modo Oscuro"} onPress={toggleTheme} variant="secondary" />
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  translationsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginVertical: 10,
    gap: 5
  },
  card: {
    flexDirection: "row",
    borderRadius: 8,
    marginVertical: 8,
    padding: 10
  },
  info: { flexShrink: 1 },
  title: { fontWeight: "bold", fontSize: 16 },
  author: { color: "#444" },
  image: {
    width: 80,
    height: 120
  }
});
