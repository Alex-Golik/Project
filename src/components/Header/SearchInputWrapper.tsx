import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './HeaderStyle';
import { FilterMenu } from '../FilterMenu/FilterMenu';
import { SearchSuggestion } from './SearchSuggestion';
import { useAppDispatch } from '../../hooks/UseAppDispatch';
import { useAppSelector } from '../../hooks/UseAppSelector';
import * as R from '../../features/Filters/searchSlice';

export const SearchInputWrapper = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const pageKey: 'home' | 'watchLater' | 'favorites' = 
    location.pathname === '/' ? 'home' : 
    location.pathname === '/watch-later' ? 'watchLater' : 'favorites';

    const pageState = useAppSelector(R.selectSearchByPage(pageKey));

    const handleAcceptSuggestion = (correctedText: string) => {
    dispatch(R.updateSearchText({ page: 'home', key: 'query', value: correctedText }));
    dispatch(R.updateSearchText({ page: 'home', key: 'suggestion', value: '' }));
    };

    useEffect(() => {
        if (pageKey !== 'home') {
            dispatch(R.clearOnlyFilters(pageKey));
        }
    }, [location.pathname, pageKey, dispatch]);

    const handleInputChange = (value: string) => {
        dispatch(R.updateSearchText({ page: pageKey, key: 'query', value }));
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
                <FilterMenu />
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