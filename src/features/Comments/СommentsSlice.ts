import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../App/Store';

export interface CommentItem {
    id: string;
    movieID: string;
    authorName: string;
    authorEmail: string;
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
        deleteComment: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(comment => comment.id !== action.payload);
            localStorage.setItem('pixema_comments', JSON.stringify(state.items));
        },
        editComment: (state, action: PayloadAction<{ id: string; text: string }>) => {
            const { id, text } = action.payload;
            const existingComment = state.items.find(comment => comment.id === id);
            if (existingComment) {
                existingComment.text = text;
                localStorage.setItem('pixema_comments', JSON.stringify(state.items));
            }
        }
    },
});

export const { addComment, deleteComment, editComment } = commentsSlice.actions;
const selectAllComments = (state: RootState) => state.comments?.items || [];
const selectMovieID = (_state: RootState, movieID: string) => movieID;
export const selectCommentsByMovieID = createSelector(
        [selectAllComments, selectMovieID],
        (items, movieID) => items.filter(comment => comment.movieID === movieID)
    );
export const selectCommentsCountByMovieID = createSelector(
    [selectCommentsByMovieID],
    (movieComments) => movieComments.length
);

export default commentsSlice.reducer;