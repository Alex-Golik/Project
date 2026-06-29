import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './HeaderStyle';
import { ProfileDropdown } from './ProfileDropdown';
import { SearchInputWrapper } from './SearchInputWrapper';
import { getInitials } from '../../utils/GetInitials';
import { selectCurrentUser, logoutUser } from '../../features/Auth/AuthSlice'
import { useAppDispatch } from '../../hooks/UseAppDispatch'
import { useAppSelector } from '../../hooks/UseAppSelector';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    
    useEffect(() => {
        const currentMenu = menuRef.current;
        const handleClickOutside = (event: MouseEvent) => {
            if (currentMenu && !currentMenu.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleLogout = () => {
        dispatch(logoutUser());
        setIsMenuOpen(false);
    };

    return (
        <S.AppHeader>
            <S.HeaderNav>
                {location.pathname !== '/auth' && location.pathname !== '/about' && !location.pathname.startsWith('/movie') ? (
                    <SearchInputWrapper />
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