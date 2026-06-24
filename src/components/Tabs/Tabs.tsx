import { useLocation } from 'react-router-dom';
import * as S from './TabsStyle';

export const Tabs: React.FC = () => {
  const location = useLocation();

  return (
    <S.TabsContainer>
      <S.TabLink to="/" $isActive={location.pathname === '/'}>
        Home
      </S.TabLink>
      
      <S.TabLink to="/favorites" $isActive={location.pathname === '/favorites'}>
        Favorites
      </S.TabLink>

      <S.TabLink to="/about" $isActive={location.pathname === '/about'}>
        About
      </S.TabLink>
    </S.TabsContainer>
  );
};