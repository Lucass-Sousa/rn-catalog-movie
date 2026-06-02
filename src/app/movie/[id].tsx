import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: string;
  title: string;
  image: string;
  year: string;
  description: string;
  categories: string[];
  isFavorite?: boolean;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/movies/${id}`);
        setMovie(response.data);
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
        await axios.delete(`${apiUrl}/movies/${id}`);
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
      await axios.patch(`${apiUrl}/movies/${id}`, { isFavorite: !movie.isFavorite });
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  matchText: {
    color: Colors.success,
    fontWeight: 'bold',
  },
  metaText: {
    color: Colors.textSecondary,
  },
  ageBadge: {
    backgroundColor: '#444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ageText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  playButton: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  playButtonText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 15,
  },
  downloadButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: Colors.white,
    lineHeight: 20,
    marginBottom: 10,
  },
  cast: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 30,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIcon: {
    color: Colors.white,
    fontSize: 24,
    marginBottom: 5,
  },
  actionText: {
    color: Colors.textSecondary,
    fontSize: 12,
  }
});
