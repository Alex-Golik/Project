import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { MovieShort } from '../../types/movie';
import type { RootState } from '../../App/store';

interface WatchLaterState {
    movies: MovieShort[];
}

const initialState: WatchLaterState = {
    movies: (() => {
        const data = localStorage.getItem('pixema_watch_later');
        if (!data) return [];
        try {
            return JSON.parse(data) as MovieShort[];
        } catch {
            return [];
        }
    })(),
};

const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState,
    reducers: {
        toggleWatchLater: (state, action: PayloadAction<MovieShort>) => {
            const exists = state.movies.some((m: MovieShort) => m.imdbID === action.payload.imdbID);
        if (exists) {
            state.movies = state.movies.filter((m: MovieShort) => m.imdbID !== action.payload.imdbID);
        } else {
            state.movies.push(action.payload);
        }
            localStorage.setItem('pixema_watch_later', JSON.stringify(state.movies));
        },
        clearWatchLater: (state) => {
            state.movies = [];
            localStorage.removeItem('pixema_watch_later');
        }
    },
});

export const { toggleWatchLater, clearWatchLater } = watchLaterSlice.actions;
export const watchLaterReducer = watchLaterSlice.reducer;
export const selectWatchLaterMovies = (state: RootState) => state.watchLater.movies;