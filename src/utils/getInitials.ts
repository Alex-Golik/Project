import type { UserInfo } from '../features/Auth/AuthSlice';

export const getInitials = (user: UserInfo): string => {
    const firstLetter = user.firstName ? user.firstName.charAt(0).toUpperCase() : '';
    const lastLetter = user.lastName ? user.lastName.charAt(0).toUpperCase() : '';
    return `${firstLetter}${lastLetter}`;
};