import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
    const { isDark, changeTheme, theme } = useTheme();

    const books: Book[] = [
        {
            id: "100",
            image_url: "https://www.goodreads.com/book/show/2767052-the-hunger-games",
            title: "Cien años de soledad",
            author: "Gabriel García Márquez",
            genre: "Realismo mágico"
        },
        {
            id: "200",
            image_url: "https://www.goodreads.com/book/show/2767052-the-hunger-games",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Ficción clásica"
        },
        {
            id: "300",
            image_url: "https://www.goodreads.com/book/show/2767052-the-hunger-games",
            title: "The Pragmatic Programmer",
            author: "Andrew Hunt y David Thomas",
            genre: "Tecnología / Software"
        },
        {
            id: "400",
            image_url: "https://www.goodreads.com/book/show/2767052-the-hunger-games",
            title: "El nombre del viento",
            author: "Patrick Rothfuss",
            genre: "Fantasía"
        }
    ];

    const styles = getStyles(isDark);

    const renderItem = ({ item }: { item: Book }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleThemeChange = () => {
        if (theme === 'auto') {
            changeTheme('light');
        } else if (theme === 'light') {
            changeTheme('dark');
        } else {
            changeTheme('auto');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                Hola {user?.email}, {i18n.t('welcomeText')}
            </Text>
            <Text style={styles.languageText}>Tu idioma actual de traduccion: {language}</Text>

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
            <View style={styles.themeButtonContainer}>
                <CustomButton title={`Theme: ${theme}`} onPress={handleThemeChange} variant={'primary'} />
            </View>
        </View>
    );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDark ? '#1E1E2C' : '#F5F5F5',
        padding: 10,
    },
    welcomeText: {
        fontWeight: "bold",
        color: isDark ? '#FFFFFF' : '#000000',
        fontSize: 18,
    },
    languageText: {
        color: isDark ? '#FFFFFF' : '#000000',
    },
    translationsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    list: {
        paddingHorizontal: 16
    },
    card: {
        flexDirection:'row',
        borderRadius: 8,
        marginVertical: 8,
        padding: 10,
        backgroundColor: isDark ? '#2C2C3A' : '#FFFFFF',
    },
    info: {
        flexShrink: 1,
        marginLeft: 10,
    },
    title: {
        fontWeight:'bold',
        fontSize: 16,
        color: isDark ? '#FFFFFF' : '#000000',
    },
    author: {
        color: isDark ? '#B0B0B0' : '#555555',
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 4,
    },
    themeButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    }
});
