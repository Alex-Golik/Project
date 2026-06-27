import React from 'react';
import * as S from './HeaderStyle';
import { formatDate } from '../../utils/formatDate';
import type { UserInfo } from '../../features/Auth/AuthSlice';

interface ProfileDropdownProps {
    user: UserInfo;
    onLogout: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout }) => {
    return (
        <S.ProfileDropdown>
            <S.ProfileDropdownInfo>
                <S.ProfileDropdownName>
                    {user.firstName} {user.lastName}
                </S.ProfileDropdownName>
                <S.ProfileDropdownEmail>
                    {user.email}
                </S.ProfileDropdownEmail>
            </S.ProfileDropdownInfo>
            
            <S.ProfileDropdownDate>
                Регистрация: <S.ProfileDropdownDateSpan>
                    {formatDate(user.registeredAt) || 'Неизвестно'}
                </S.ProfileDropdownDateSpan>
            </S.ProfileDropdownDate>
            
            <S.LogoutBtn onClick={onLogout}>
                Выйти из аккаунта
            </S.LogoutBtn>
        </S.ProfileDropdown>
    );
};