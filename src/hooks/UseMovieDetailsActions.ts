import { toggleWatchLater, selectWatchLaterMovies } from '../features/WatchLater/WatchLaterSlice';
import { toggleFavorite, selectFavoriteMovies } from '../features/Favorites/FavoritesSlice';
import { useToast } from './UseToast';
import { useAppDispatch } from './UseAppDispatch';
import { useAppSelector } from './UseAppSelector';

interface ShortMoviePayload {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

export const useMovieDetailsActions = (id: string, movie: any) => {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();

    const watchLaterMovies = useAppSelector(selectWatchLaterMovies);
    const isWatchLater = watchLaterMovies.some(m => m.imdbID === id);

    const favoriteMovies = useAppSelector(selectFavoriteMovies);
    const isFavorite = favoriteMovies.some(m => m.imdbID === id);

    const handleWatchLaterClick = () => {
        if (!movie) return;
        const shortInfo: ShortMoviePayload = {
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Type: movie.Type || 'movie',
            Poster: movie.Poster
        };
        dispatch(toggleWatchLater(shortInfo));
        showToast(isWatchLater ? 'Удалено из Смотреть позже' : 'Добавлено в Смотреть позже!');
    };

    const handleFavoriteClick = () => {
        if (!movie) return;
        const shortInfo: ShortMoviePayload = {
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Type: movie.Type || 'movie',
            Poster: movie.Poster
        };
        dispatch(toggleFavorite(shortInfo));
        showToast(isFavorite ? 'Удалено из Избранного' : 'Добавлено в Избранное!');
    };

    return {
        isFavorite,
        isWatchLater,
        handleFavoriteClick,
        handleWatchLaterClick
    };
};