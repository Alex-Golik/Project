import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../App/Store';

export interface CommentItem {
    id: string;
    movieID: string;
    authorName: string;
    text: string;
    createdAt: string;
}

interface CommentsState {
    items: CommentItem[];
}

const initialState: CommentsState = {
    items: (() => {
        const data = localStorage.getItem('pixema_comments');
        if (!data) return [];
        try {
            return JSON.parse(data) as CommentItem[];
        } catch {
            return [];
        }
    })(),
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<CommentItem>) => {
            state.items.unshift(action.payload); 
            localStorage.setItem('pixema_comments', JSON.stringify(state.items));
        },
    },
});

const selectAllComments = (state: RootState) => state.comments?.items || [];
export const { addComment } = commentsSlice.actions;
export const selectCommentsByMovieID = (movieID: string) => 
    createSelector(
        [selectAllComments],
        (items) => items.filter(comment => comment.movieID === movieID)
    );

export default commentsSlice.reducer;