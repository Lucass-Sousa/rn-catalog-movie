import { styles } from './styles';
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


