import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useState } from "react";
import axios from "axios";

export default function AddMovieScreen() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !image || !year || !genre || !description) {
      Alert.alert("Erro", "Preencha todos os campos, incluindo a sinopse.");
      return;
    }

    setLoading(true);
    try {
      const apiUrl =  'http://localhost:3000';
      const newMovie = {
        title,
        image,
        year,
        categories: [genre], // Stored as array to match existing db structure
        isFeatured: false,
        isTrending: false,
        isRecent: true,
        isFavorite: false,
        description
      };

      await axios.post(`${apiUrl}/movies`, newMovie);
      Alert.alert("Sucesso", "Filme adicionado com sucesso!");
      
      // Clear form
      setTitle('');
      setImage('');
      setYear('');
      setGenre('');
      setDescription('');
      
      router.push('/(tabs)');
    } catch (error) {
      console.error("Erro ao salvar filme:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar o título.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Novo Título</Text>
      </View>

      <ScrollView style={styles.formContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.label}>Título do Filme/Série</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: Breaking Bad"
          placeholderTextColor={Colors.textSecondary}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>URL da Imagem de Capa</Text>
        <TextInput 
          style={styles.input}
          placeholder="https://..."
          placeholderTextColor={Colors.textSecondary}
          value={image}
          onChangeText={setImage}
        />

        <Text style={styles.label}>Ano de Lançamento</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 2024"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />

        <Text style={styles.label}>Gênero</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: Ação, Drama"
          placeholderTextColor={Colors.textSecondary}
          value={genre}
          onChangeText={setGenre}
        />

        <Text style={styles.label}>Sinopse</Text>
        <TextInput 
          style={[styles.input, styles.textArea]}
          placeholder="Digite a sinopse do título..."
          placeholderTextColor={Colors.textSecondary}
          multiline={true}
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.saveButtonText}>Adicionar ao Catálogo</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  headerButton: {
    color: Colors.white,
    fontSize: 16,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.surface,
    color: Colors.white,
    padding: 15,
    borderRadius: 6,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
