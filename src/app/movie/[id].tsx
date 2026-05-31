import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
// Dados mockados
const MOVIE_DETAILS = {
  id: '1',
  title: 'Stranger Things',
  image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8sXcpCWvm.jpg',
  year: '2022',
  ageLimit: '16',
  seasons: '4 Temporadas',
  description: 'Quando um garoto desaparece, a cidade toda participa nas buscas. Mas o que encontram são segredos, forças sobrenaturais e uma menina.',
  cast: 'Winona Ryder, David Harbour, Millie Bobby Brown'
};

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Imagem do Filme */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: MOVIE_DETAILS.image }} style={styles.image} />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Informações */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{MOVIE_DETAILS.title}</Text>
          
          <View style={styles.metaRow}>
            <Text style={styles.matchText}>98% Relevante</Text>
            <Text style={styles.metaText}>{MOVIE_DETAILS.year}</Text>
            <View style={styles.ageBadge}>
              <Text style={styles.ageText}>{MOVIE_DETAILS.ageLimit}</Text>
            </View>
            <Text style={styles.metaText}>{MOVIE_DETAILS.seasons}</Text>
          </View>

          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playButtonText}>▶ Assistir</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>↓ Baixar</Text>
          </TouchableOpacity>

          <Text style={styles.description}>{MOVIE_DETAILS.description}</Text>
          <Text style={styles.cast}>Elenco: {MOVIE_DETAILS.cast}</Text>

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
