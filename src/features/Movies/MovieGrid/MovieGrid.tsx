import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSearchMoviesQuery } from '../../../services/movieApi';
import { ArticleCard } from '../MovieCard/MovieCard';
import { useEffect, useRef } from 'react';
import * as S from './MovieGridStyle';
import type { MoviesContextType } from '../../../components/MainLayout';


export const MovieGrid: React.FC = () => {
    const navigate = useNavigate();
    const loaderRef = useRef<HTMLDivElement>(null); 
    const { searchQuery, page, setPage, contentType, year } = useOutletContext<MoviesContextType>();

    const { data, isFetching, isError } = useSearchMoviesQuery({
        s: searchQuery,
        page: page,
        type: contentType || undefined,
        y: year || undefined,
    });

    useEffect(() => {
        if (isFetching || isError) return;
        
        if (!data?.Search || data.Search.length < 10) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isFetching) {
                setPage((prevPage) => prevPage + 1); 
            }
        }, {
            rootMargin: '150px', 
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
            {isFetching && page === 1 && (
                <S.StatusText>Поиск на сервере OMDb... ⏳</S.StatusText>
            )}
            
            {isError && (
                <S.StatusText $isError>Ошибка сетевого запроса или фильмы не найдены.</S.StatusText>
            )}
                        <S.ArticlesGrid>
                {data?.Response === "True" && data.Search && data.Search.length > 0 ? (
                    data.Search.map((movie) => (
                        <ArticleCard 
                            key={movie.imdbID} 
                            article={movie} 
                            onCardClick={(id) => navigate(`/movie/${id}`)} 
                        />
                    ))
                ) : (
                    page === 1 && !isFetching && (
                        <S.NoResults>Ничего не найдено: {data?.Error || 'Попробуйте другой запрос'}</S.NoResults>
                    )
                )}
            </S.ArticlesGrid>
            <S.LoadingTrigger ref={loaderRef}>
                {isFetching && page > 1 && <S.PurpleSpinner />}
            </S.LoadingTrigger>
        </S.ListContainer>
    );
};