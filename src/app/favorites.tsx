import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";

// Dados falsos
const FAVORITES = [
  { id: '1', image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8sXcpCWvm.jpg' },
  { id: '2', image: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg' },
  { id: '3', image: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg' },
  { id: '4', image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
];

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Minha Lista</Text>
        <View style={{width: 60}} />
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {FAVORITES.map(movie => (
          <Link key={movie.id} href={`/movie/${movie.id}`} asChild>
            <TouchableOpacity style={styles.gridItem}>
              <Image source={{ uri: movie.image }} style={styles.moviePoster} />
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerButton: {
    color: Colors.white,
    fontSize: 16,
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '31%', 
    aspectRatio: 2/3,
    marginBottom: 10,
  },
  moviePoster: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.surface,
  }
});
