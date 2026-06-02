import { StyleSheet } from 'react-native';
import { Colors } from "@/constants/Colors";

export const styles = StyleSheet.create({
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
