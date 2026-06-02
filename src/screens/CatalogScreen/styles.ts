import { StyleSheet } from 'react-native';
import { Colors } from "@/constants/Colors";

export const styles = StyleSheet.create({
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
