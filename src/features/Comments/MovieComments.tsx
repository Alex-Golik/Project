import { useState } from 'react';
import { useAppDispatch } from '../../hooks/UseAppDispatch';
import { useAppSelector } from '../../hooks/UseAppSelector';
import { selectCurrentUser } from '../Auth/AuthSlice';
import { addComment, selectCommentsByMovieID } from './СommentsSlice';
import { formatDate } from '../../utils/FormatDate';
import { useToast } from '../../hooks/UseToast';
import { Link } from 'react-router-dom';
import * as S from './MovieCommentsStyle';

interface MovieCommentsProps {
    movieID: string;
}

export const MovieComments = ({ movieID }: MovieCommentsProps) => {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();
    const currentUser = useAppSelector(selectCurrentUser);
    const comments = useAppSelector(selectCommentsByMovieID(movieID));
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
            text: text.trim(),
            createdAt: new Date().toISOString()
        }));

        setText('');
        showToast('Комментарий успешно добавлен!');
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
                    />
                    <S.SubmitCommentBtn type="submit">
                        Отправить отзыв
                    </S.SubmitCommentBtn>
                </S.CommentForm>
            ) : (
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                    Чтобы оставить отзыв, пожалуйста, <Link to="/auth" style={{ color: 'var(--accent-color)' }}>войдите в аккаунт</Link>.
                </p>
            )}

            <S.CommentsList>
                {comments.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>Будьте первым, кто оставит отзыв к этому фильму! ✍️</p>
                ) : (
                    comments.map((comment) => (
                        <S.CommentCard key={comment.id}>
                            <S.CommentHeader>
                                <S.CommentAuthor>{comment.authorName}</S.CommentAuthor>
                                <S.CommentDate>{formatDate(comment.createdAt)}</S.CommentDate>
                            </S.CommentHeader>
                            <S.CommentText>{comment.text}</S.CommentText>
                        </S.CommentCard>
                    ))
                )}
            </S.CommentsList>
        </S.CommentsBlock>
    );
};