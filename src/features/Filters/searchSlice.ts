import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../App/store';
import type { ContentType } from '../../components/FilterMenu/ContentTypeSelect';
import type { SortType } from '../../components/FilterMenu/RatingSortSelect';

interface PageSearchState {
    query: string;
    contentType: ContentType;
    year: string;
    sortByRating: SortType;
    suggestion: string;
}

interface SearchState {
    home: PageSearchState;
    watchLater: PageSearchState;
    favorites: PageSearchState;
}

const initialPageState = (): PageSearchState => ({
    query: '',
    contentType: '',
    year: '',
    sortByRating: '',
    suggestion: '',
});

const initialState: SearchState = {
    home: { ...initialPageState(), query: '' }, 
    watchLater: initialPageState(),
    favorites: initialPageState(),
};

type PageKey = keyof SearchState;

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {

        updateSearchText: (
            state, 
            action: PayloadAction<{ page: PageKey; key: 'query' | 'year' | 'suggestion'; value: string }>
        ) => {
            const { page, key, value } = action.payload;
            state[page][key] = value;
        },

        updateContentType: (
            state,
            action: PayloadAction<{ page: PageKey; value: ContentType }>
        ) => {
            const { page, value } = action.payload;
            state[page].contentType = value;
        },

        updateSortByRating: (
            state,
            action: PayloadAction<{ page: PageKey; value: SortType }>
        ) => {
            const { page, value } = action.payload;
            state[page].sortByRating = value;
        },

        resetPageFilters: (state, action: PayloadAction<PageKey>) => {
            state[action.payload] = initialPageState();
        },

        clearOnlyFilters: (state, action: PayloadAction<PageKey>) => {
            const page = action.payload;
            state[page].contentType = '';
            state[page].year = '';
            state[page].sortByRating = '';

        }
    }
});

export const { updateSearchText, updateContentType, updateSortByRating, resetPageFilters, clearOnlyFilters } = searchSlice.actions;
export const selectSearchByPage = (page: PageKey) => (state: RootState) => state.search[page];
export default searchSlice.reducer;