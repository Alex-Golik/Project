import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSearchMoviesQuery } from '../../../services/movieApi';
import { MovieCard } from '../MovieCard/MovieCard';
import { useEffect, useRef, useMemo } from 'react';S
import { useSpellChecker } from '../../../hooks/UseSpellChecker';
import * as S from './MovieGridStyle';
import type { MoviesContextType } from '../../../components/MainLayout';
import { getMovieRating } from '../../../utils/getMovieRating'
import { GridSkeleton } from './GridSkeleton';


export const MovieGrid: React.FC = () => {
    const navigate = useNavigate();
    const loaderRef = useRef<HTMLDivElement>(null); 
    const { debouncedSearchQuery, page, setPage, contentType, year, sortByRating, setSearchSuggestion } = useOutletContext<MoviesContextType>();
    useSpellChecker();

    const { data, isFetching, isError } = useSearchMoviesQuery({
        s: debouncedSearchQuery.trim() || 'a',
        page: page,
        type: contentType || undefined,
        y: year || undefined,
    });

    const processedMovies = useMemo(() => {
        if (!data?.Search) return [];
        
        let result = [...data.Search];

        if (sortByRating === 'desc') {
            result.sort((a, b) => getMovieRating(b.imdbID) - getMovieRating(a.imdbID)); 
        } else if (sortByRating === 'asc') {
            result.sort((a, b) => getMovieRating(a.imdbID) - getMovieRating(b.imdbID)); 
        }

        const totalToShow = Math.floor(result.length / 12) * 12;
        if (totalToShow === 0) {
            return result;
        }
        return result.slice(0, totalToShow);
    }, [data, sortByRating]);

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

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [data, isFetching, isError, setPage]);


    return (
        <S.ListContainer>           
            {isFetching && page === 1 ? (
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