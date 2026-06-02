import axios from 'axios';
import { Platform } from 'react-native';

// Lógica inteligente para buscar a URL base:
// Tenta pegar do .env primeiro, se não achar, usa a detecção de plataforma padrão.
const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  return Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
};

export const api = axios.create({
  baseURL: getBaseUrl(),
});

// Camada de Serviço (Service Layer)
export const movieService = {
  // Buscar todos os filmes
  getMovies: async () => {
    const response = await api.get('/movies');
    return response.data;
  },

  // Buscar detalhes de um único filme
  getMovieById: async (id: string) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  // Buscar apenas os filmes favoritos
  getFavorites: async () => {
    const response = await api.get('/movies?isFavorite=true');
    return response.data;
  },

  // Adicionar um novo filme
  createMovie: async (movieData: any) => {
    const response = await api.post('/movies', movieData);
    return response.data;
  },

  // Atualizar status de favorito
  toggleFavorite: async (id: string, isFavorite: boolean) => {
    const response = await api.patch(`/movies/${id}`, { isFavorite });
    return response.data;
  },

  // Deletar um filme
  deleteMovie: async (id: string) => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  }
};
