import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Movie } from "../services/api";

interface MovieState {
  // Search state
  searchQuery: string;
  searchResults: Movie[];
  isLoading: boolean;
  error: string | null;

  // Favorites state
  favoriteMovies: Movie[];
  savedMovies: Movie[];

  // Actions
  setSearchQuery: (query: string) => void;
  setSearchResults: (movies: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Favorites actions
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: string) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: string) => boolean;

  // Saved movies actions
  addToSaved: (movie: Movie) => void;
  removeFromSaved: (movieId: string) => void;
  toggleSaved: (movie: Movie) => void;
  isSaved: (movieId: string) => boolean;

  // Clear actions
  clearSearch: () => void;
  clearError: () => void;
}

export const useMovieStore = create<MovieState>()(
  persist(
    (set, get) => ({
      // Initial state
      searchQuery: "",
      searchResults: [],
      isLoading: false,
      error: null,
      favoriteMovies: [],
      savedMovies: [],

      // Search actions
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSearchResults: (movies: Movie[]) => set({ searchResults: movies }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),

      // Favorites actions
      addToFavorites: (movie: Movie) => {
        const { favoriteMovies } = get();
        if (!favoriteMovies.find((m) => m.id === movie.id)) {
          set({ favoriteMovies: [...favoriteMovies, movie] });
        }
      },

      removeFromFavorites: (movieId: string) => {
        const { favoriteMovies } = get();
        set({
          favoriteMovies: favoriteMovies.filter(
            (movie) => movie.id !== movieId
          ),
        });
      },

      toggleFavorite: (movie: Movie) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get();
        if (isFavorite(movie.id)) {
          removeFromFavorites(movie.id);
        } else {
          addToFavorites(movie);
        }
      },

      isFavorite: (movieId: string) => {
        const { favoriteMovies } = get();
        return favoriteMovies.some((movie) => movie.id === movieId);
      },

      // Saved movies actions
      addToSaved: (movie: Movie) => {
        const { savedMovies } = get();
        if (!savedMovies.find((m) => m.id === movie.id)) {
          set({ savedMovies: [...savedMovies, movie] });
        }
      },

      removeFromSaved: (movieId: string) => {
        const { savedMovies } = get();
        set({
          savedMovies: savedMovies.filter((movie) => movie.id !== movieId),
        });
      },

      toggleSaved: (movie: Movie) => {
        const { isSaved, addToSaved, removeFromSaved } = get();
        if (isSaved(movie.id)) {
          removeFromSaved(movie.id);
        } else {
          addToSaved(movie);
        }
      },

      isSaved: (movieId: string) => {
        const { savedMovies } = get();
        return savedMovies.some((movie) => movie.id === movieId);
      },

      // Clear actions
      clearSearch: () =>
        set({
          searchQuery: "",
          searchResults: [],
          error: null,
        }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "movie-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favoriteMovies: state.favoriteMovies,
        savedMovies: state.savedMovies,
      }),
    }
  )
);
