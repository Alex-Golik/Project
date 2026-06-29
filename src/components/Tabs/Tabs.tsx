import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/UseAppSelector';
import { selectWatchLaterMovies } from '../../features/WatchLater/WatchLaterSlice';
import { selectFavoriteMovies } from '../../features/Favorites/FavoritesSlice';
import * as S from './TabsStyle';


export const Tabs = () => {
  const location = useLocation();
  const watchLaterMovies = useAppSelector(selectWatchLaterMovies);
  const favoriteMovies = useAppSelector(selectFavoriteMovies);

  return (
    <S.TabsContainer>
      <S.TabLink to="/" $isActive={location.pathname === '/'}>
        Home
      </S.TabLink>

      <S.TabLink to="/watch-later" $isActive={location.pathname === '/watch-later'} >
        Watch Later
        {watchLaterMovies.length > 0 && <S.TabBadge>{watchLaterMovies.length}</S.TabBadge>}
      </S.TabLink>
      
      <S.TabLink to="/favorites" $isActive={location.pathname === '/favorites'}>
        Favorites
        {favoriteMovies.length > 0 && <S.TabBadge>{favoriteMovies.length}</S.TabBadge>}
      </S.TabLink>

      <S.TabLink to="/about" $isActive={location.pathname === '/about'}>
        About
      </S.TabLink>
    </S.TabsContainer>
  );
};