import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { MoviesContextType } from '../components/MainLayout';

export const useSpellChecker = () => {
    const { debouncedSearchQuery, setSearchSuggestion } = useOutletContext<MoviesContextType>();

    useEffect(() => {
        if (!debouncedSearchQuery || debouncedSearchQuery === 'a' || debouncedSearchQuery.length < 3) {
            setSearchSuggestion('');
        return;
        }

    const checkSpelling = async () => {
        try {
            const response = await fetch(
                `https://yandex.net{encodeURIComponent(debouncedSearchQuery)}`
            );
            const data = await response.json();

            if (data && data.length > 0 && data[0].s && data[0].s.length > 0) {
                const correctedWord = data[0].s[0];
                const fullCorrection = debouncedSearchQuery.replace(data[0].word, correctedWord);
                setSearchSuggestion(fullCorrection);
            } else {
                setSearchSuggestion('');
            }
        } catch (error) {
            console.error('Ошибка проверки раскладки:', error);
            setSearchSuggestion('');
        }
    };

    checkSpelling();
    }, [debouncedSearchQuery, setSearchSuggestion]);
};