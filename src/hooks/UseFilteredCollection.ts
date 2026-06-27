import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getMovieRating } from '../utils/getMovieRating';
import type { MovieShort } from '../types/movie';
import type { MoviesContextType } from '../components/MainLayout';

export const useFilteredCollection = (moviesList: MovieShort[]) => {
    const { debouncedSearchQuery, contentType, year, sortByRating } = useOutletContext<MoviesContextType>();

    const filteredMovies = useMemo(() => {
        let result = [...moviesList];


        if (debouncedSearchQuery && debouncedSearchQuery.toLowerCase() !== 'man') {
                result = result.filter(m => m.Title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
        }
        if (contentType) {
            result = result.filter(m => m.Type.toLowerCase() === contentType.toLowerCase());
        }

        if (year) {
            result = result.filter(m => m.Year === year);
        }

        if (sortByRating === 'desc') {
            result.sort((a, b) => getMovieRating(b.imdbID) - getMovieRating(a.imdbID));
        } else if (sortByRating === 'asc') {
            result.sort((a, b) => getMovieRating(a.imdbID) - getMovieRating(b.imdbID));
        }

        return result;
    }, [moviesList, debouncedSearchQuery, contentType, year, sortByRating]); 

    return filteredMovies;
};