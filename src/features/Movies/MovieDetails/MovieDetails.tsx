import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../../../services/movieApi';
import { DetailsSkeleton } from './DetailsSkeleton';
import { useMovieDetailsActions } from '../../../hooks/UseMovieDetailsActions';
import { MovieComments } from '../../Comments/MovieComments';
import * as S from './MovieDetailsStyle';


export const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(id || '', {
        skip: !id, 
    });

    const { 
        isFavorite, 
        isWatchLater, 
        handleFavoriteClick, 
        handleWatchLaterClick 
    } = useMovieDetailsActions(id || '', movie);

    if (isLoading) {
        return <DetailsSkeleton />;
    }

    if (isError || !movie) {
        return (
            <S.ErrorContainer>
                <h2>Фильм не найден или произошла ошибка запроса</h2>
            </S.ErrorContainer>
        );
    }

    const posterSrc = movie.Poster === 'N/A' 
        ? 'https://placehold.co' 
        : movie.Poster;

    return (
        <S.DetailsContainer>
            <S.BackBtn onClick={() => navigate(-1)}>
                ← Назад к поиску
            </S.BackBtn>

            <S.DetailsTitle>{movie.Title}</S.DetailsTitle>
            <S.DetailsMeta>
                {movie.Year} | {movie.Runtime} | {movie.Genre} | ⭐ IMDb: {movie.imdbRating}
            </S.DetailsMeta>
            <S.ActionButtonsGroup>
                <S.ActionBtn $isActive={isFavorite} onClick={handleFavoriteClick}>
                    <svg viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    {isFavorite ? 'В Избранном' : 'В Избранное'}
                </S.ActionBtn>

                <S.ActionBtn $isActive={isWatchLater} onClick={handleWatchLaterClick}>
                    <svg viewBox="0 0 24 24">
                        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
                    </svg>
                    {isWatchLater ? 'В Смотреть позже' : 'Смотреть позже'}
                </S.ActionBtn>
            </S.ActionButtonsGroup>
            <S.DetailsMainInfo>
                <S.DetailsPoster src={posterSrc} alt={movie.Title} />
                <div>
                    <p><strong>Режиссер:</strong> {movie.Director}</p>
                    <p><strong>В ролях:</strong> {movie.Actors}</p>
                    <p><strong>Возрастной ценз:</strong> {movie.Rated}</p>
                    <p><strong>Мировая премьера:</strong> {movie.Released}</p>
                </div>
            </S.DetailsMainInfo>

            <S.DetailsContent>
                <h3>Сюжет / Описание:</h3>
                <p>{movie.Plot}</p>
            </S.DetailsContent>
            <MovieComments movieID={movie.imdbID} />
        </S.DetailsContainer>
    );
};