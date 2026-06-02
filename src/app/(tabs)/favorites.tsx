import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Link, router, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { movieService } from "@/services/api";

interface Movie {
  id: string;
  title: string;
  image: string;
  isFavorite: boolean;
}

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const fetchFavorites = async () => {
    try {
      const data = await movieService.getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minha Lista</Text>
      </View>

      {loading ? (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={[styles.gridContainer, { paddingBottom: 100 }]}>
          {favorites.length === 0 ? (
            <Text style={{ color: 'white', textAlign: 'center', width: '100%' }}>Nenhum favorito encontrado.</Text>
          ) : (
            favorites.map(movie => (
              <Link key={movie.id} href={`/movie/${movie.id}`} asChild>
                <TouchableOpacity style={styles.gridItem}>
                  <Image source={{ uri: movie.image }} style={styles.moviePoster} />
                </TouchableOpacity>
              </Link>
            ))
          )}
        </ScrollView>
      )}
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
