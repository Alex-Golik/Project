import { useEffect } from 'react';
import { useDebounce } from './UseDebounce';
import { selectSearchByPage, updateSearchText } from '../features/Filters/searchSlice';
import { useAppDispatch } from './UseAppDispatch';
import { useAppSelector } from './UseAppSelector';

export const useSpellChecker = () => {
    const dispatch = useAppDispatch();
    const homeSearchState = useAppSelector(selectSearchByPage('home'));
    const debouncedSearchQuery = useDebounce(homeSearchState.query, 500);

    useEffect(() => {
    
    if (!debouncedSearchQuery || debouncedSearchQuery === 'man' || debouncedSearchQuery.length < 3) {
        if (homeSearchState.suggestion !== '') {
            dispatch(updateSearchText({ page: 'home', key: 'suggestion', value: ''}));
        }
        return;
    }

    let isCancelled = false;

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
                if (fullCorrection.toLowerCase() !== debouncedSearchQuery.toLowerCase()) {
                        dispatch(updateSearchText({ page: 'home', key: 'suggestion', value: fullCorrection }));
                }
            }
        } catch (error) {
            if (!isCancelled) {
                console.error('Ошибка проверки орфографии:', error);
            }
        }
    };
    checkSpelling();
    return () => {
        isCancelled = true;
    };
    }, [debouncedSearchQuery, dispatch, homeSearchState.suggestion]);
};