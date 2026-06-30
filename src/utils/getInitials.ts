import type { UserInfo } from '../features/Auth/AuthSlice';

export const getInitials = (user: UserInfo): string => {
    const firstLetter = user.firstName?.trim().charAt(0).toUpperCase() || '';
    const lastLetter = user.lastName?.trim().charAt(0).toUpperCase() || '';
    const initials = `${firstLetter}${lastLetter}`;
    if (!initials.trim()) {
        return user.email ? user.email.trim().charAt(0).toUpperCase() : '👤';
    }
    return `${firstLetter}${lastLetter}`;
};