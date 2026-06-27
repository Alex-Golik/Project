import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from '../services/movieApi';
import { authReducer } from '../features/Auth/AuthSlice';
import { watchLaterReducer } from '../features/WatchLater/WatchLaterSlice';
import { favoritesReducer } from '../features/Favorites/FavoritesSlice';

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    auth: authReducer,
    watchLater: watchLaterReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;