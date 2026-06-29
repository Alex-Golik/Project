import type { MovieShort } from '../../../types/movie';
import * as S from './MovieCardStyle';
import { getMovieRating, getRatingColor } from '../../../utils/GetMovieRating';
import { toggleWatchLater, selectWatchLaterMovies } from '../../WatchLater/WatchLaterSlice';
import { toggleFavorite, selectFavoriteMovies } from '../../Favorites/FavoritesSlice';
import { useToast } from '../../../hooks/UseToast';
import { useImagePreloader } from '../../../hooks/UseImagePreloader';
import { useAppDispatch } from '../../../hooks/UseAppDispatch';
import { useAppSelector } from '../../../hooks/UseAppSelector';


interface MovieCardProps {
  movie: MovieShort; 
  onCardClick: (id: string) => void;
}

export const MovieCard = ({ movie, onCardClick }: MovieCardProps) => {
  const dispatch = useAppDispatch(); 
  const { showToast } = useToast();
  const favoriteMovies = useAppSelector(selectFavoriteMovies);
  const isFavorite = favoriteMovies.some(m => m.imdbID === movie.imdbID);
  const watchLaterMovies = useAppSelector(selectWatchLaterMovies);
  const isWatchLater = watchLaterMovies.some(m => m.imdbID === movie.imdbID);
  const rating = getMovieRating(movie.imdbID);
  const ratingColor = getRatingColor(rating);
  const { isLoaded, hasError } = useImagePreloader(movie.Poster);
  const isMissingPoster = movie.Poster === 'N/A' || hasError;

  const handleWatchLaterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    dispatch(toggleWatchLater(movie));
    if (isWatchLater) {
      showToast(`Фильм "${movie.Title}" удален из Смотреть позже`);
    } else {
      showToast(`Фильм "${movie.Title}" добавлен в Смотреть позже!`);
    }
  };


  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    dispatch(toggleFavorite(movie));
    if (isFavorite) {
      showToast(`Фильм "${movie.Title}" удален из Избранного`);
    } else {
      showToast(`Фильм "${movie.Title}" добавлен в Избранное!`)
    }
  };

  return (
    <S.CardWrapper onClick={() => onCardClick(movie.imdbID)}>
      <S.ImageContainer>
        <S.RatingBadge $ratingColor={ratingColor}>
          {rating.toFixed(1)}
        </S.RatingBadge>
                <S.FavoriteBtn 
          $isActive={isFavorite} 
          onClick={handleFavoriteClick}
          title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
        >
          {isFavorite ? (
            <svg viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
            </svg>
          )}
        </S.FavoriteBtn>
        {!isLoaded && !isMissingPoster && <S.SkeletonLoader />}
        {isMissingPoster ? (
          <S.NoPosterPlaceholder>
            <span>🎬</span>
            <p>No Poster Available</p>
          </S.NoPosterPlaceholder>
        ) : (
        <S.CardImage 
          src={movie.Poster}
          alt={movie.Title} 
          loading="lazy" 
          $isLoaded={isLoaded} 
        />
      )}
      </S.ImageContainer>
      <S.CardContent>
        <S.CardBadge>
          {movie.Type.toUpperCase()} ({movie.Year})
        </S.CardBadge>
                <S.CardFooter>
          <S.CardTitle title={movie.Title}>{movie.Title}</S.CardTitle>
          <S.WatchLaterBtn 
            $isActive={isWatchLater} 
            onClick={handleWatchLaterClick}
            title={isWatchLater ? "Убрать из смотреть позже" : "Смотреть позже"}
          >
          <svg viewBox="0 0 24 24">
          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13zm-5-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm.5 4.5H10V9h1v1h1.5v1z"/>
          </svg>
          </S.WatchLaterBtn>
        </S.CardFooter>

      </S.CardContent>
    </S.CardWrapper>
  );
};