import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Authstyles';
import { useAppDispatch } from '../../hooks/UseAppDispatch'; 
import { loginUser } from './AuthSlice';
import type { UserInfo } from './AuthSlice';

export const Auth = () => {
    const navigate = useNavigate();
     const dispatch = useAppDispatch();
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Пожалуйста, заполните все поля');
            return;
    }

        if (isRegisterMode && (!firstName || !lastName)) {
            setError('Пожалуйста, укажите имя и фамилию');
            return;
        }
    const users: UserInfo[] = JSON.parse(localStorage.getItem('pixema_users') || '[]');

    if (isRegisterMode) {
        const userExists = users.some((u: UserInfo) => u.email === email);
        if (userExists) {
            setError('Пользователь с таким Email уже существует');
        return;
        }

        const newUser: UserInfo = { 
            firstName, 
            lastName, 
            email, 
            password,
            registeredAt: new Date().toISOString() 
        };

        users.push(newUser);
        localStorage.setItem('pixema_users', JSON.stringify(users));
        dispatch(loginUser(newUser)); 
        navigate('/');

    } else {
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
            setError('Неверный Email или пароль');
            return;
        }

        dispatch(loginUser(user));
        navigate('/');
    }
};

        return (
        <S.AuthContainer>
            <S.AuthTitle>
                {isRegisterMode ? 'Регистрация' : 'Вход в Pixema'}
            </S.AuthTitle>

            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

            <S.AuthForm onSubmit={handleSubmit}>
                {isRegisterMode && (
                    <>
                        <S.AuthInput 
                            type="text" 
                            placeholder="Имя" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <S.AuthInput 
                            type="text" 
                            placeholder="Фамилия" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </>
                )}
                <S.AuthInput 
                    type="email" 
                    placeholder="Ваш Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <S.AuthInput 
                    type="password" 
                    placeholder="Пароль" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            
                <S.AuthSubmitBtn type="submit">
                    {isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
                </S.AuthSubmitBtn>
            </S.AuthForm>
                        <S.AuthToggleText>
                {isRegisterMode ? 'Уже есть аккаунт?' : 'Впервые у нас?'} {' '}
                <S.AuthToggleLink onClick={() => { setIsRegisterMode(!isRegisterMode); setError(''); }}>
                    {isRegisterMode ? 'Войти' : 'Зарегистрироваться'}
                </S.AuthToggleLink>
            </S.AuthToggleText>
        </S.AuthContainer>
    );
};