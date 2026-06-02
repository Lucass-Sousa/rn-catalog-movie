import { styles } from './styles';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useState } from "react";
import { movieService } from "@/services/api";

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
      const newMovie = {
        title,
        image,
        year,
        categories: [genre],
        isFeatured: false,
        isTrending: false,
        isRecent: true,
        isFavorite: false,
        description
      };

      await movieService.createMovie(newMovie);
      Alert.alert("Sucesso", "Filme adicionado com sucesso!");
      
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
