import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getMovieRating } from '../utils/getMovieRating';
import type { MovieShort } from '../types/movie';
import { useSelector } from 'react-redux';
import { selectSearchByPage} from '../features/Filters/searchSlice';


export const useFilteredCollection = (moviesList: MovieShort[]) => {
    const location = useLocation();
    const pageKey: 'watchLater' | 'favorites' = 
    location.pathname === '/watch-later' ? 'watchLater' : 'favorites';

    const { query, contentType, year, sortByRating } = useSelector(selectSearchByPage(pageKey));

    const filteredMovies = useMemo(() => {
        let result = [...moviesList];

        if (query && query.trim() !== '') {
            result = result.filter(m => m.Title.toLowerCase().includes(query.toLowerCase()));
        }

        if (contentType) {
            result = result.filter(m => m.Type === contentType);
        }
    
        if (year) {
            result = result.filter(m => m.Year.includes(year));
        }

        if (sortByRating) {
            result.sort((a, b) => {
                const ratingA = getMovieRating(a.imdbID);
                const ratingB = getMovieRating(b.imdbID);
                return sortByRating === 'high' ? ratingB - ratingA : ratingA - ratingB;
            });
        }

        return result;
    }, [moviesList, query, contentType, year, sortByRating]);

    return filteredMovies;
};