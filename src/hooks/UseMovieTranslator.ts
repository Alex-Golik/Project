import { useEffect } from 'react';
import { selectSearchByPage, updateSearchText } from '../features/Filters/SearchSlice';
import { useDebounce } from './UseDebounce'
import { useAppDispatch } from './UseAppDispatch';
import { useAppSelector } from './UseAppSelector';

export const useMovieTranslator = () => {
    const dispatch = useAppDispatch();
    const homeSearchState = useAppSelector(selectSearchByPage('home'));
    const debouncedSearchQuery = useDebounce(homeSearchState.query, 500);

    useEffect(() => {
        if (!debouncedSearchQuery) return;

        let isCancelled = false;
        const hasRussianLetters = /[а-яА-ЯёЁ]/.test(debouncedSearchQuery);

        if (!hasRussianLetters || debouncedSearchQuery.length < 3 || debouncedSearchQuery === 'man') {
            return;
        }

        const translateViaKinopoisk = async () => {
            try {
                const publicToken = 'ba132b3b-db9b-4f8e-94c4-747a3131cbb5'; 
                const queryParams = new URLSearchParams({
                    keyword: debouncedSearchQuery
                });

                const baseUrl = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword';
                const finalUrl = `${baseUrl}?${queryParams.toString()}`;

                const response = await fetch(finalUrl, {
                    method: 'GET',
                    headers: {
                        'X-API-KEY': publicToken,
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();

                if (isCancelled) return;

                if (data && data.films && data.films.length > 0) {
                    const bestMatch = data.films[0]; 
                    const englishTitle = bestMatch.nameEn;

                    if (englishTitle && englishTitle.toLowerCase() !== debouncedSearchQuery.toLowerCase()) {
                        dispatch(updateSearchText({ page: 'home', key: 'query', value: englishTitle }));
                    }
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error('Ошибка киноперевода через Кинопоиск API:', error);
                }
            }
        };

        translateViaKinopoisk();

        return () => {
            isCancelled = true;
        };
    }, [debouncedSearchQuery, dispatch]);
};