import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Link, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react"; // 1. Importamos os Hooks
import { movieService } from "@/services/api";
interface Movie {
  id: string;
  title: string;
  image: string;
  categories: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isRecent: boolean;
}

export default function CatalogScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // Controla o carregamento

  useFocusEffect(
    useCallback(() => {
      fetchMovies();
    }, [])
  );

  const fetchMovies = async () => {
    try {
      const data = await movieService.getMovies(); 
      setMovies(data); 
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false); 
    }
  };

  const featuredMovie = movies.find(m => m.isFeatured) || movies[0];
  const trendingMovies = movies.filter(m => m.isTrending);
  const recentMovies = movies.filter(m => m.isRecent);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Image source={require('../../assets/logo-nxt.png')} style={styles.logoImage} resizeMode="contain" />
            <Text style={styles.headerBrandName}>NExTI FLIX</Text>
          </View>

          {/* Destaque Principal */}
          {featuredMovie && (
            <Link href={`/movie/${featuredMovie.id}`} asChild>
              <TouchableOpacity style={styles.featuredContainer}>
                <Image 
                  source={{ uri: featuredMovie.image }} 
                  style={styles.featuredImage} 
                />
                <View style={styles.featuredGradient}>
                  <Text style={styles.featuredTitle}>
                    {featuredMovie.title}
                  </Text>
                  <Text style={styles.featuredCategories}>
                    {featuredMovie.categories?.join(' • ')}
                  </Text>
                  <View style={styles.featuredButtons}>
                    <TouchableOpacity style={styles.playButton}>
                      <Text style={styles.playButtonText}>Assistir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoButton}>
                      <Text style={styles.infoButtonText}>Saiba mais</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          )}

          {/* Lista de Filmes: Em Alta */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Em Alta</Text>
            {trendingMovies.length === 0 ? (
              <Text style={styles.emptyMessage}>Nenhum filme disponível no momento.</Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieList}>
                {trendingMovies.map(movie => (
                  <Link key={movie.id} href={`/movie/${movie.id}`} asChild>
                    <TouchableOpacity style={styles.movieCard}>
                      <Image source={{ uri: movie.image }} style={styles.moviePoster} />
                      <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
                      <Text style={styles.movieGenre} numberOfLines={1}>{movie.categories?.[0] || 'Desconhecido'}</Text>
                    </TouchableOpacity>
                  </Link>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Lista de Filmes: Adicionados Recentemente */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Adicionados Recentemente</Text>
            {recentMovies.length === 0 ? (
              <Text style={styles.emptyMessage}>Nenhum título recente.</Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieList}>
                {recentMovies.map(movie => (
                  <Link key={`recent-${movie.id}`} href={`/movie/${movie.id}`} asChild>
                    <TouchableOpacity style={styles.movieCard}>
                      <Image source={{ uri: movie.image }} style={styles.moviePoster} />
                      <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
                      <Text style={styles.movieGenre} numberOfLines={1}>{movie.categories?.[0] || 'Desconhecido'}</Text>
                    </TouchableOpacity>
                  </Link>
                ))}
              </ScrollView>
            )}
          </View>

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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logoImage: {
    height: 45,
    width: 45,
    marginLeft: 0,
  },
  headerBrandName: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerLinks: {
    flexDirection: 'row',
    gap: 15,
  },
  headerText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  featuredContainer: {
    width: '100%',
    height: 450,
    position: 'relative',
    marginBottom: 20,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'rgba(20, 20, 20, 0.6)', // Gradiente falso escurecendo a base
  },
  featuredTitle: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  featuredCategories: {
    color: Colors.text,
    fontSize: 14,
    marginBottom: 15,
  },
  featuredButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  playButton: {
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  playButtonText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoButton: {
    backgroundColor: Colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  infoButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  movieList: {
    paddingLeft: 10,
  },
  movieCard: {
    width: 110,
    marginRight: 10,
  },
  moviePoster: {
    width: 110,
    height: 160,
    borderRadius: 4,
    backgroundColor: Colors.surface,
    marginBottom: 5,
  },
  movieTitle: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  movieGenre: {
    color: Colors.textSecondary,
    fontSize: 10,
  },
  emptyMessage: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 10,
    fontStyle: 'italic',
  }
});
