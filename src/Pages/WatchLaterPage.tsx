import { useAppSelector } from '../hooks/UseAppSelector'; 
import { useNavigate } from 'react-router-dom';
import { selectWatchLaterMovies, clearWatchLater } from '../features/WatchLater/WatchLaterSlice';
import { MovieCard } from '../features/Movies/MovieCard/MovieCard';
import { useFilteredCollection } from '../hooks/UseFilteredCollection';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { useAppDispatch } from '../hooks/UseAppDispatch';
import * as S from '../features/Movies/MovieGrid/MovieGridStyle'; 

export const WatchLaterPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch(); 
    const watchLaterMovies = useAppSelector(selectWatchLaterMovies);
    const filteredMovies = useFilteredCollection(watchLaterMovies);

    return (
        <S.ListContainer>
            <PageHeader 
                title="Watch Later" 
                hasMovies={watchLaterMovies.length > 0} 
                onClear={() => dispatch(clearWatchLater())} 
                successMessage="Список 'Смотреть позже' полностью очищен" 
            />
        {filteredMovies.length === 0 ? (
            <S.NoResults>Список пуст. Добавьте фильмы с главной страницы с помощью значка часов!</S.NoResults>
        ) : (
            <S.MoviesGrid>
            {filteredMovies.map((movie) => (
            <MovieCard 
                key={movie.imdbID} 
                movie={movie} 
                onCardClick={(id) => navigate(`/movie/${id}`)} 
            />
            ))}
        </S.MoviesGrid>
        )}
    </S.ListContainer>
    );
};