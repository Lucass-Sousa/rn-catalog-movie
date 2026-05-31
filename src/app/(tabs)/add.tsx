import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function AddMovieScreen() {
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
        />

        <Text style={styles.label}>URL da Imagem de Capa</Text>
        <TextInput 
          style={styles.input}
          placeholder="https://..."
          placeholderTextColor={Colors.textSecondary}
        />

        <Text style={styles.label}>Ano de Lançamento</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 2024"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput 
          style={[styles.input, styles.textArea]}
          placeholder="Sinopse do título..."
          placeholderTextColor={Colors.textSecondary}
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Adicionar ao Catálogo</Text>
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
