import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './HeaderStyle';
import { ProfileDropdown } from './ProfileDropdown';
import { SearchInputWrapper } from './SearchInputWrapper';
import { getInitials } from '../../utils/getInitials';
import { selectCurrentUser, logoutUser } from '../../features/Auth/AuthSlice'
import { useSelector, useDispatch } from 'react-redux';


interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
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

    return (
        <S.AppHeader>
            <S.HeaderNav>
                {location.pathname !== '/auth' && location.pathname !== '/about' ? (
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