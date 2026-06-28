import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../../../services/movieApi';
import { DetailsSkeleton } from './DetailsSkeleton';
import * as S from './MovieDetailsStyle';

export const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: movie, isFetching, isError } = useGetMovieDetailsQuery(id || '', {
        skip: !id, 
    });

    if (isFetching) {
        return <DetailsSkeleton />;
    }

    if (isError || !movie || movie.Response === "False") {
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
        </S.DetailsContainer>
    );
};