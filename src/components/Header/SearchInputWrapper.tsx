import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './HeaderStyle';
import { FilterMenu } from '../FilterMenu/FilterMenu';
import { SearchSuggestion } from './SearchSuggestion';
import { useDispatch, useSelector } from 'react-redux';
import * as R from '../../features/Filters/searchSlice';

export const SearchInputWrapper: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const pageKey: 'home' | 'watchLater' | 'favorites' = 
    location.pathname === '/' ? 'home' : 
    location.pathname === '/watch-later' ? 'watchLater' : 'favorites';

    const pageState = useSelector(R.selectSearchByPage(pageKey))

    const handleAcceptSuggestion = (correctedText: string) => {
    dispatch(R.updateSearch({ page: 'home', key: 'query', value: correctedText }));
    dispatch(R.updateSearch({ page: 'home', key: 'suggestion', value: '' }));
    };

    useEffect(() => {
        if (pageKey !== 'home') {
            dispatch(R.resetPageFilters(pageKey));
        }
    }, [location.pathname, pageKey, dispatch]);

    const handleInputChange = (value: string) => {
        dispatch(R.updateSearch({ page: pageKey, key: 'query', value }));
    };


    return (
        <S.SearchSection>
        <S.SearchContainer>
            <S.SearchInput
                type="text"
                value={pageState.query}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Поиск фильмов и сериалов..."
            />
            <S.BurgerWrapper>
                <FilterMenu
                    year={pageState.year}
                    setYear={(val) => dispatch(R.updateSearch({ page: pageKey, key: 'year', value: val }))}
                    contentType={pageState.contentType}
                    setContentType={(val) => dispatch(R.updateSearch({ page: pageKey, key: 'contentType', value: val }))}
                    sortByRating={pageState.sortByRating}
                    setSortByRating={(val) => dispatch(R.updateSearch({ page: pageKey, key: 'sortByRating', value: val }))}
                />
            </S.BurgerWrapper>
        </S.SearchContainer>
        {pageKey === 'home' && pageState.suggestion && (
        <SearchSuggestion
            suggestion={pageState.suggestion}
            onAccept={handleAcceptSuggestion}
        />
        )}
        </S.SearchSection>
    );
};