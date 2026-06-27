import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './HeaderStyle';
import { FilterMenu } from '../FilterMenu/FilterMenu';
import { ProfileDropdown } from './ProfileDropdown';
import { SearchSuggestion } from './SearchSuggestion'
import { getInitials } from '../../utils/getInitials';
import { selectCurrentUser, logoutUser } from '../../features/Auth/AuthSlice'
import { useSelector, useDispatch } from 'react-redux';


interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    searchSuggestion: string;
    setSearchSuggestion: (val: string) => void;
    page: number;
    setPage: (val: number | ((p: number) => number)) => void;
    contentType: string;
    setContentType: (val: string) => void;
    year: string;
    setYear: (val: string) => void;
    sortByRating: string;         
    setSortByRating: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
    searchQuery, setSearchQuery,
    searchSuggestion, setSearchSuggestion,
    setPage,
    contentType, setContentType,
    year, setYear,
    sortByRating, setSortByRating
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('pixema_current_user');
        dispatch(logoutUser());
        setIsMenuOpen(false);
    };

    const handleAcceptSuggestion = (correctedText: string) => {
        setSearchQuery(correctedText); 
        setPage(1);                    
        setSearchSuggestion('');      
    };

    return (
        <S.AppHeader>
            <S.HeaderNav>
                {location.pathname !== '/auth' && location.pathname !== '/about' ? (
                    <S.SearchSection>
                        <S.SearchContainer>
                            <S.SearchInput 
                                type="text" 
                                value={searchQuery} 
                                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} 
                                placeholder="Поиск фильмов и сериалов..."
                            />
                            <S.BurgerWrapper>
                                <FilterMenu
                                    year={year}
                                    setYear={(val) => { setYear(val); setPage(1); }}
                                    contentType={contentType}
                                    setContentType={(val) => { setContentType(val); setPage(1); }}
                                    sortByRating={sortByRating}
                                    setSortByRating={(val) => { setSortByRating(val); setPage(1); }}
                                />
                            </S.BurgerWrapper>
                        </S.SearchContainer>
                        <SearchSuggestion 
                            suggestion={searchSuggestion} 
                            onAccept={handleAcceptSuggestion} 
                        />
                    </S.SearchSection>
                ) : (
                    <S.EmptySearchSpacer />
                )}
                {currentUser ? (
                    <S.ProfileMenuContainer ref={menuRef}>
                        <S.AvatarCircle
                            title={`${currentUser.firstName} ${currentUser.lastName}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{ transform: isMenuOpen ? 'scale(1.05)' : 'none' }}
                        >
                            {getInitials(currentUser)}
                        </S.AvatarCircle>
                        {isMenuOpen && (
                            <ProfileDropdown user={currentUser} onLogout={handleLogout} />
                        )}
                    </S.ProfileMenuContainer>
                    ) : (
                    <S.LoginLink to="/auth">Войти</S.LoginLink>
                )}
            </S.HeaderNav>
        </S.AppHeader>
    );
};