import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { MoviesContextType } from '../components/MainLayout';

export const useSpellChecker = () => {
    const { debouncedSearchQuery, setSearchSuggestion } = useOutletContext<MoviesContextType>();

    useEffect(() => {
    let isCancelled = false;
    
    if (!debouncedSearchQuery || debouncedSearchQuery.length < 3) {
        setSearchSuggestion('');
        return;
    }

    const checkSpelling = async () => {
        try {
            const response = await fetch(
                `https://speller.yandex.net/services/spellservice.json/checkText?text=${encodeURIComponent(debouncedSearchQuery)}&lang=ru,en&options=518`
            );
            const data = await response.json();
            
            if (isCancelled) return;

            if (data && data.length > 0 && data[0].s && data[0].s.length > 0) {
                const correctedWord = data[0].s[0];
                const wrongWord = data[0].word;
                const fullCorrection = debouncedSearchQuery.replace(wrongWord, correctedWord);
                setSearchSuggestion(fullCorrection);
            } else {
                setSearchSuggestion('');
            }
        } catch (error) {
            if (!isCancelled) {
                console.error('Ошибка проверки орфографии:', error);
                setSearchSuggestion('');
            }
        }
    };
    checkSpelling();
    return () => {
        isCancelled = true;
    };
    }, [debouncedSearchQuery, setSearchSuggestion]);
};