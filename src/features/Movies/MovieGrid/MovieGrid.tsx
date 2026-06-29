import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSearchMoviesQuery } from '../../../services/movieApi';
import { MovieCard } from '../MovieCard/MovieCard';
import { useEffect, useRef, useMemo } from 'react';
import { useSpellChecker } from '../../../hooks/UseSpellChecker';
import * as S from './MovieGridStyle';
import type { MoviesContextType } from '../../../components/MainLayout';
import { getMovieRating } from '../../../utils/GetMovieRating'
import { GridSkeleton } from './GridSkeleton';
import {useMovieTranslator} from '../../../hooks/UseMovieTranslator'
import { useAppSelector } from '../../../hooks/UseAppSelector';
import { selectSearchByPage } from '../../Filters/SearchSlice'; 
import { useDebounce } from '../../../hooks/UseDebounce';



export const MovieGrid = () => {
    const navigate = useNavigate();
    const loaderRef = useRef<HTMLDivElement>(null); 
    const { page, setPage } = useOutletContext<MoviesContextType>();
    const homeSearchState = useAppSelector(selectSearchByPage('home'));
    const debouncedSearchQuery = useDebounce(homeSearchState.query, 500);
    useSpellChecker();
    useMovieTranslator();

    const hasRussianLetters = debouncedSearchQuery ? /[а-яА-ЯёЁ]/.test(debouncedSearchQuery) : false;
    const { data, isFetching, isError } = useSearchMoviesQuery({
        s: debouncedSearchQuery.trim() || 'man',
        page: page,
        type: homeSearchState.contentType || undefined,
        y: homeSearchState.year || undefined,
    }, {
        skip: hasRussianLetters,
    });

    const processedMovies = useMemo(() => {
        if (!data?.Search) return [];
        
        let result = [...data.Search];

        if (homeSearchState.sortByRating === 'desc') {
            result.sort((a, b) => getMovieRating(b.imdbID) - getMovieRating(a.imdbID)); 
        } else if (homeSearchState.sortByRating === 'asc') {
            result.sort((a, b) => getMovieRating(a.imdbID) - getMovieRating(b.imdbID)); 
        }

        const totalToShow = Math.floor(result.length / 12) * 12;
        if (totalToShow === 0) {
            return result;
        }
        return result.slice(0, totalToShow);
    }, [data, homeSearchState.sortByRating]);

    useEffect(() => {
        setPage(1);
    }, [homeSearchState.contentType, homeSearchState.year, setPage]);

    useEffect(() => {
        if (isFetching || isError) return;
        
        if (!data?.Search || data.Search.length < 10) return;

        const shouldLoadMore = processedMovies.length < 12 && data.Search.length >= 10;
        const observer = new IntersectionObserver((entries) => {
            if ((entries[0].isIntersecting || shouldLoadMore) && !isFetching) {
                setPage((prevPage) => prevPage + 1); 
            }
        }, {
            rootMargin: '200px', 
        });

        const currentLoader = loaderRef.current;

        if (currentLoader) {
            observer.observe(currentLoader);
        }
        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [data, isFetching, isError, setPage, processedMovies.length]);

    const showSkeleton = (isFetching && page === 1) || (hasRussianLetters && debouncedSearchQuery !== '');

    return (
        <S.ListContainer>           
            {showSkeleton ? (
                <GridSkeleton />
            ) : (
                <>
                    {isError && (
                        <S.StatusText $isError>Ошибка сетевого запроса или фильмы не найдены.</S.StatusText>
                    )}
                
                    <S.MoviesGrid>
                        {processedMovies && processedMovies.length > 0 ? (
                            processedMovies.map((movie) => (
                                movie && movie.imdbID ? (
                                    <MovieCard 
                                        key={movie.imdbID} 
                                        movie={movie} 
                                        onCardClick={(id) => navigate(`/movie/${id}`)} 
                                    />
                                ) : null
                            ))
                        ) : (
                            !isFetching && data?.Response === "True" && (
                                <S.NoResults>Нет фильмов, соответствующих выбранным фильтрам 🔍</S.NoResults>
                            )
                        )}
                    
                    {data?.Response === "False" && page === 1 && !isFetching && (
                        <S.NoResults>Ничего не найдено: {data?.Error || 'Попробуйте другой запрос'}</S.NoResults>
                    )}
                </S.MoviesGrid>
            </>
        )}
        
        <S.LoadingTrigger ref={loaderRef}>
            {isFetching && page > 1 && <S.PurpleSpinner />}
        </S.LoadingTrigger>
    </S.ListContainer>
);
};