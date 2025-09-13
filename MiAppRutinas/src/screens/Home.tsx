import { FlatList, Image, StyleSheet, Text, View, Switch } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { i18n, useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import CustomButton from "../components/CustomButton";
import { translations } from "../translations/i18n";
import { TouchableOpacity } from "react-native-gesture-handler";

type Book = {
    id: string;
    title: string;
    author: string;
    genre: string;
    image_url: string;
};

export default function Home({ navigation }: any) {
    const { user, logout } = useAuth();
    const { changeLanguage, language } = useLanguage();
    const { theme, themeMode, setThemeMode, toggleTheme } = useTheme();

    const handleLogout = async () => {
        try {
            await logout();
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const books: Book[] = [
        {
            id: "100",
            image_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.goodreads.com%2Fbook%2Fshow%2F56916837-to-kill-a-mockingbird&psig=AOvVaw036T-ORpQ8aIciiTaxfQ5k&ust=1756682770650000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDVkrbXs48DFQAAAAAdAAAAABAW",
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

    const renderItem = ({ item }: { item: Book }) =>
    (<TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <View style={styles.info}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.author, { color: theme.colors.textSecondary }]}>{item.author}</Text>
        </View>
    </TouchableOpacity>)


    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
                Hola {user?.email}, {i18n.t('welcomeText')}</Text>
            <Text style={[styles.languageText, { color: theme.colors.textSecondary }]}>
                Tu idioma actual de traducción: {language}</Text>

            {/* Switch de tema */}
            <View style={styles.themeContainer}>
                <Text style={[styles.themeLabel, { color: theme.colors.text }]}>
                    Tema oscuro:
                </Text>
                <Switch
                    value={theme.isDark}
                    onValueChange={toggleTheme}
                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                    thumbColor={theme.isDark ? theme.colors.surface : '#f4f3f4'}
                />
            </View>

            <View style={styles.translationsContainer}>
                <CustomButton title={"FR"}
                    onPress={() => changeLanguage("fr")}
                    variant={'primary'} />
                <CustomButton title={"EN"}
                    onPress={() => changeLanguage("en")}
                    variant={'primary'} />
                <CustomButton title={"ES"}
                    onPress={() => changeLanguage("es")}
                    variant={'primary'} />
            </View>

            <CustomButton 
                title="Cerrar Sesión"
                onPress={handleLogout}
                variant="secondary"
            />

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
    container: {
        flex: 1,
        padding: 16,
    },
    welcomeText: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 8,
    },
    languageText: {
        fontSize: 14,
        marginBottom: 20,
    },
    themeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    themeLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    translationsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    list: {
        paddingHorizontal: 16
    },
    card: {
        flexDirection: 'row',
        borderRadius: 8,
        marginVertical: 8,
        padding: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    info: {
        flexShrink: 1,
        marginLeft: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    author: {
        fontSize: 14,
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 4,
    }
})