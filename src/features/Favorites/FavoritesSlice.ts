import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { MovieShort } from '../../types/movie';
import type { RootState } from '../../App/store';


interface FavoritesState {
    movies: MovieShort[];
}

const initialState: FavoritesState = {
    movies: (() => {
        const data = localStorage.getItem('pixema_favorites');
    if (!data) return [];
    try {
        return JSON.parse(data) as MovieShort[];
    } catch {
        return [];
    }
    })(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<MovieShort>) => {
            const exists = state.movies.some((m: MovieShort) => m.imdbID === action.payload.imdbID);
        if (exists) {
            state.movies = state.movies.filter((m: MovieShort) => m.imdbID !== action.payload.imdbID);
        } else {
            state.movies.push(action.payload);
        }
        localStorage.setItem('pixema_favorites', JSON.stringify(state.movies));
        },
        clearFavorites: (state) => {
            state.movies = [];
        localStorage.removeItem('pixema_favorites');
        }
    },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
export const selectFavoriteMovies = (state: RootState) => state.favorites.movies;