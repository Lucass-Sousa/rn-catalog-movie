import { styles } from './styles';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { movieService } from "@/services/api";
interface Movie {
  id: string;
  title: string;
  image: string;
  year: string;
  description: string;
  categories: string[];
  isFavorite?: boolean;
}


export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await movieService.getMovieById(id as string);
        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar os detalhes do filme:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleDelete = async () => {
    const deleteAction = async () => {
      try {
        await movieService.deleteMovie(id as string);
        if (Platform.OS !== 'web') {
          Alert.alert("Sucesso", "Filme excluído!");
        } else {
          window.alert("Filme excluído!");
        }
        router.replace('/(tabs)');
      } catch (error) {
        console.error("Erro ao excluir filme:", error);
        if (Platform.OS !== 'web') {
          Alert.alert("Erro", "Não foi possível excluir o filme.");
        } else {
          window.alert("Não foi possível excluir o filme.");
        }
      }
    };

    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm("Tem certeza que deseja excluir este título do catálogo?");
      if (confirmDelete) {
        deleteAction();
      }
    } else {
      Alert.alert(
        "Excluir Filme",
        "Tem certeza que deseja excluir este título do catálogo?",
        [
          { text: "Cancelar", style: "cancel" },
          { 
            text: "Excluir", 
            style: "destructive",
            onPress: deleteAction
          }
        ]
      );
    }
  };

  const toggleFavorite = async () => {
    if (!movie) return;
    try {
      const updatedMovie = { ...movie, isFavorite: !movie.isFavorite };
      await movieService.toggleFavorite(id as string, updatedMovie.isFavorite);
      setMovie(updatedMovie);
    } catch (error) {
      console.error("Erro ao favoritar filme:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!movie) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: Colors.white }}>Filme não encontrado.</Text>
          <TouchableOpacity 
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)');
              }
            }} 
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: Colors.primary }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Imagem do Filme */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: movie.image }} style={styles.image} />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)');
              }
            }}
          >
            <Text style={styles.backButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Informações */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{movie.year}</Text>
            <Text style={styles.metaText}> • </Text>
            <Text style={styles.metaText}>{movie.categories?.join(', ')}</Text>
          </View>

          <TouchableOpacity style={styles.playButton} onPress={toggleFavorite}>
            <Text style={[styles.playButtonText, movie.isFavorite && { color: Colors.primary }]}>
              {movie.isFavorite ? 'Favorito' : 'Favoritar'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.downloadButton, { backgroundColor: Colors.error }]} onPress={handleDelete}>
            <Text style={styles.downloadButtonText}>Excluir do Catálogo</Text>
          </TouchableOpacity>

          <Text style={styles.description}>{movie.description}</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


