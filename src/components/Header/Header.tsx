import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import * as S from './HeaderStyle';
import { FilterMenu } from '../FilterMenu/FilterMenu';
import { selectCurrentUser, logoutUser } from '../../features/Auth/AuthSlice'
import { useSelector, useDispatch } from 'react-redux';
import type { UserInfo } from '../../features/Auth/AuthSlice';


interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  page: number;
  setPage: (val: number | ((p: number) => number)) => void;
  contentType: string;
  setContentType: (val: string) => void;
  year: string;
  setYear: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchQuery, setSearchQuery,
  setPage,
  contentType, setContentType,
  year, setYear
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

    const getInitials = (user: UserInfo) => {
        const firstLetter = user.firstName ? user.firstName.charAt(0).toUpperCase() : '';
        const lastLetter = user.lastName ? user.lastName.charAt(0).toUpperCase() : '';
        return `${firstLetter}${lastLetter}`;
    };
     return (
        <S.AppHeader>
            <S.HeaderNav>
                {location.pathname === '/' && (
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
                                />
                            </S.BurgerWrapper>
                        </S.SearchContainer>
                    </S.SearchSection>
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
                            <S.ProfileDropdown>
                                <S.ProfileDropdownInfo>
                                    <S.ProfileDropdownName>
                                        {currentUser.firstName} {currentUser.lastName}
                                    </S.ProfileDropdownName>
                                    <S.ProfileDropdownEmail>
                                        {currentUser.email}
                                    </S.ProfileDropdownEmail>
                                </S.ProfileDropdownInfo>
                                <S.ProfileDropdownDate>
                                    Регистрация: <S.ProfileDropdownDateSpan>{formatDate(currentUser.registeredAt) || 'Неизвестно'}</S.ProfileDropdownDateSpan>
                                </S.ProfileDropdownDate>
                                <S.LogoutBtn onClick={handleLogout}>
                                    Выйти из аккаунта
                                </S.LogoutBtn>
                            </S.ProfileDropdown>
                        )}
                    </S.ProfileMenuContainer>
                    ) : (
                    <S.LoginLink to="/auth">Войти</S.LoginLink>
                )}
            </S.HeaderNav>
        </S.AppHeader>
    );
};