import axios from 'axios';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  return 'http://localhost:3000';
};

export const api = axios.create({
  baseURL: getBaseUrl(),
});

export const movieService = {
  getMovies: async () => {
    const response = await api.get('/movies');
    return response.data;
  },

  getMovieById: async (id: string) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  getFavorites: async () => {
    const response = await api.get('/movies?isFavorite=true');
    return response.data;
  },
  
  createMovie: async (movieData: any) => {
    const response = await api.post('/movies', movieData);
    return response.data;
  },

  toggleFavorite: async (id: string, isFavorite: boolean) => {
    const response = await api.patch(`/movies/${id}`, { isFavorite });
    return response.data;
  },

  deleteMovie: async (id: string) => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
  }
};
