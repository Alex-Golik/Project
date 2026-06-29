import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../App/store';

interface PageSearchState {
    query: string;
    contentType: string;
    year: string;
    sortByRating: string;
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

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {

        updateSearch: (
            state, 
            action: PayloadAction<{ page: 'home' | 'watchLater' | 'favorites'; key: keyof PageSearchState; value: string }>
        ) => {
            const { page, key, value } = action.payload;
            state[page][key] = value;
        },
        resetPageFilters: (state, action: PayloadAction<'home' | 'watchLater' | 'favorites'>) => {
            state[action.payload].contentType = '';
            state[action.payload].year = '';
            state[action.payload].sortByRating = '';
            state[action.payload].query = '';
            state[action.payload].suggestion = '';
        }
    },
});

export const { updateSearch, resetPageFilters } = searchSlice.actions;
export const selectSearchByPage = (page: 'home' | 'watchLater' | 'favorites') => (state: RootState) => state.search[page];
export default searchSlice.reducer;