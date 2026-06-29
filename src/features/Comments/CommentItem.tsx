import { deleteComment } from './СommentsSlice'; 
import { formatDate } from '../../utils/formatDate';
import { useToast } from '../../hooks/UseToast';
import { useAppDispatch } from '../../hooks/UseAppDispatch';
import type { CommentItem as CommentType } from './СommentsSlice';
import type { UserInfo } from '../../features/Auth/AuthSlice';
import * as S from './MovieCommentsStyle';

interface CommentItemProps {
    comment: CommentType;
    currentUser: UserInfo | null;
}

export const CommentItem = ({ comment, currentUser }: CommentItemProps) => {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();

    const isAuthor = currentUser !== null && currentUser.email === comment.authorEmail;

    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить свой комментарий?')) {
            dispatch(deleteComment(comment.id));
            showToast('Комментарий успешно удален');
        }
    };

    return (
        <S.CommentCard>
            <S.CommentHeader>
                <S.CommentAuthor>{comment.authorName}</S.CommentAuthor>
                <S.CommentMeta>
                    <S.CommentDate>
                        {comment.createdAt ? formatDate(comment.createdAt) : 'Только что'}
                    </S.CommentDate>
                    
                    {isAuthor && (
                        <S.DeleteCommentBtn 
                            type="button" 
                            onClick={handleDelete}
                            title="Удалить комментарий"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                        </S.DeleteCommentBtn>
                    )}
                </S.CommentMeta>
            </S.CommentHeader>
            <S.CommentText>{comment.text}</S.CommentText>
        </S.CommentCard>
    );
};