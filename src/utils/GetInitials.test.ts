import { describe, it, expect } from 'vitest';
import { getInitials } from './getInitials';
import type { UserInfo } from '../features/Auth/AuthSlice';

describe('Утилита getInitials', () => {
    
    it('должна успешно возвращать заглавные инициалы при наличии имени и фамилии', () => {
        const mockUser: UserInfo = {
            firstName: 'Иван',
            lastName: 'Иванов',
            email: 'ivan@example.com',
            registeredAt: '2026-01-01'
        };

        const result = getInitials(mockUser);
        expect(result).toBe('ИИ');
    });

    it('должна принудительно переводить инициалы в верхний регистр', () => {
        const mockUser: UserInfo = {
            firstName: 'петр',
            lastName: 'петров',
            email: 'petr@example.com',
            registeredAt: '2026-01-01'
        };

        const result = getInitials(mockUser);
        expect(result).toBe('ПП');
    });


    it('должна корректно обрабатывать строки с лишними пробелами по краям', () => {
        const mockUser: UserInfo = {
            firstName: '  Сергей  ',
            lastName: '  Сергеев  ',
            email: 'sergey@example.com',
            registeredAt: '2026-01-01'
        };

        const result = getInitials(mockUser);
        expect(result).toBe('СС');
    });


    it('должна возвращать первую букву Email, если имя и фамилия пустые', () => {
        const mockUser: UserInfo = {
            firstName: '',
            lastName: '',
            email: 'cinema_fan@example.com',
            registeredAt: '2026-01-01'
        };

        const result = getInitials(mockUser);
        expect(result).toBe('C');
    });


    it('должна возвращать иконку силуэта, если отсутствуют вообще все данные пользователя', () => {
        const mockUser: UserInfo = {
            firstName: '',
            lastName: '',
            email: '',
            registeredAt: '2026-01-01'
        };

        const result = getInitials(mockUser);
        expect(result).toBe('👤');
    });
});