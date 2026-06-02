import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { useState, useEffect } from "react"; // 1. Importamos os Hooks
import axios from "axios";

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

  useEffect(() => {
    fetchMovies();
  }, []); 

  const fetchMovies = async () => {
    try {
      const apiUrl = 'http://localhost:3000';
      const response = await axios.get(`${apiUrl}/movies`); 
      
      setMovies(response.data); 
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false); 
    }
  };

  // Filtrando os dados que chegaram do servidor
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
            <Text style={styles.logo}>NExTIFlix</Text>
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
                  <Text style={styles.featuredCategories}>
                    {featuredMovie.categories?.join(' • ')}
                  </Text>
                  <View style={styles.featuredButtons}>
                    <TouchableOpacity style={styles.playButton}>
                      <Text style={styles.playButtonText}>▶ Assistir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoButton}>
                      <Text style={styles.infoButtonText}>ⓘ Saiba mais</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          )}

          {/* Lista de Filmes: Em Alta */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Em Alta</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieList}>
              {trendingMovies.map(movie => (
                <Link key={movie.id} href={`/movie/${movie.id}`} asChild>
                  <TouchableOpacity>
                    <Image source={{ uri: movie.image }} style={styles.moviePoster} />
                  </TouchableOpacity>
                </Link>
              ))}
            </ScrollView>
          </View>

          {/* Lista de Filmes: Adicionados Recentemente */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Adicionados Recentemente</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieList}>
              {recentMovies.map(movie => (
                <Link key={`recent-${movie.id}`} href={`/movie/${movie.id}`} asChild>
                  <TouchableOpacity>
                    <Image source={{ uri: movie.image }} style={styles.moviePoster} />
                  </TouchableOpacity>
                </Link>
              ))}
            </ScrollView>
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
  logo: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
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
  moviePoster: {
    width: 110,
    height: 160,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: Colors.surface,
  }
});
