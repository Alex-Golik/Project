import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFavoriteMovies, clearFavorites } from '../features/Favorites/FavoritesSlice';
import { MovieCard } from '../features/Movies/MovieCard/MovieCard';
import { useFilteredCollection } from '../hooks/UseFilteredCollection';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { useAppDispatch } from '../hooks/UseAppDispatch';
import * as S from '../features/Movies/MovieGrid/MovieGridStyle'; 

export const FavoritesPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const favoriteMovies = useSelector(selectFavoriteMovies);
    const filteredMovies = useFilteredCollection(favoriteMovies);

    return (
        <S.ListContainer>
            <PageHeader 
                title="Favorites" 
                hasMovies={favoriteMovies.length > 0} 
                onClear={() => dispatch(clearFavorites())} 
                successMessage="Список Избранного полностью очищен" 
            />
        {filteredMovies.length === 0 ? (
            <S.NoResults>Ваш список избранного пуст. Нажимайте на звездочки на главной странице!</S.NoResults>
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