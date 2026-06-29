import { useState } from 'react';
import { useAppDispatch } from '../../hooks/UseAppDispatch';
import { useAppSelector } from '../../hooks/UseAppSelector';
import { selectCurrentUser } from '../Auth/AuthSlice';
import { addComment, selectCommentsByMovieID } from './СommentsSlice';
import { useToast } from '../../hooks/UseToast';
import { Link } from 'react-router-dom';
import * as S from './MovieCommentsStyle';
import { CommentItem } from './CommentItem';

interface MovieCommentsProps {
    movieID: string;
}

export const MovieComments = ({ movieID }: MovieCommentsProps) => {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();
    const currentUser = useAppSelector(selectCurrentUser);
    const comments = useAppSelector((state) => selectCommentsByMovieID(state, movieID));
    const [text, setText] = useState('');

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!text.trim()) {
            showToast('Комментарий не может быть пустым');
            return;
        }

        if (!currentUser) return;

        dispatch(addComment({
            id: Date.now().toString(),
            movieID,
            authorName: `${currentUser.firstName} ${currentUser.lastName}`,
            authorEmail: currentUser.email,
            text: text.trim(),
            createdAt: new Date().toISOString()
        }));

        setText('');
        showToast('Комментарий успешно добавлен!');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const form = e.currentTarget.form;
            if (form) form.requestSubmit();
        }
    };

    return (
        <S.CommentsBlock>
            <S.BlockTitle>Отзывы и комментарии ({comments.length})</S.BlockTitle>

            {currentUser ? (
                <S.CommentForm onSubmit={handleSubmit}>
                    <S.CommentTextArea
                        placeholder="Поделитесь своими впечатлениями о фильме..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <S.SubmitCommentBtn type="submit">
                        Отправить отзыв
                    </S.SubmitCommentBtn>
                </S.CommentForm>
            ) : (
                <S.AuthPromptText>
                    Чтобы оставить отзыв, пожалуйста,{' '}
                    <Link to="/auth">войдите в аккаунт</Link>.
                </S.AuthPromptText>
            )}

            <S.CommentsList>
                {comments.length === 0 ? (
                    <S.NoCommentsText>Будьте первым, кто оставит отзыв к этому фильму! ✍️</S.NoCommentsText>
                ) : (
                    comments.map((comment) => (
                         <CommentItem 
                            key={comment.id} 
                            comment={comment} 
                            currentUser={currentUser} 
                        />
                    ))
                )}
            </S.CommentsList>
        </S.CommentsBlock>
    );
};
