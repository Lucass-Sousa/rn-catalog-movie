import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
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
  ageLimit: string;
  seasons: string;
  description: string;
  cast: string;
  categories: string[];
}

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiUrl = 'http://localhost:3000';
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
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
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
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Informações */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          
          <View style={styles.metaRow}>
            <Text style={styles.matchText}>98% Relevante</Text>
            <Text style={styles.metaText}>{movie.year}</Text>
            <View style={styles.ageBadge}>
              <Text style={styles.ageText}>{movie.ageLimit}</Text>
            </View>
            <Text style={styles.metaText}>{movie.seasons}</Text>
          </View>

          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playButtonText}>▶ Assistir</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>↓ Baixar</Text>
          </TouchableOpacity>

          <Text style={styles.description}>{movie.description}</Text>
          <Text style={styles.cast}>Elenco: {movie.cast}</Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionItem}>
              <Text style={styles.actionIcon}>+</Text>
              <Text style={styles.actionText}>Minha Lista</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <Text style={styles.actionIcon}>👍</Text>
              <Text style={styles.actionText}>Classifique</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <Text style={styles.actionIcon}>✈️</Text>
              <Text style={styles.actionText}>Compartilhe</Text>
            </TouchableOpacity>
          </View>
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
