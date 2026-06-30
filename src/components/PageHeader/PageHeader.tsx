import { useToast } from '../../hooks/UseToast';
import * as S from '../../features/Movies/MovieGrid/MovieGridStyle';

interface PageHeaderProps {
    title: string;
    hasMovies: boolean;
    onClear: () => void; 
    successMessage: string;
}

export const PageHeader = ({
    title,
    hasMovies,
    onClear,
    successMessage,
}: PageHeaderProps) => {
    const { showToast } = useToast();

    const handleClearAll = () => {
        if (window.confirm(`Вы уверены, что хотите полностью очистить список "${title}"?`)) {
            onClear();
            showToast(successMessage);
        }
    };

    return (
        <S.CollectionHeader>
            <S.PageTitle>{title}</S.PageTitle>
            {hasMovies && (
                <S.ClearAllBtn onClick={handleClearAll}>
                Очистить список
                </S.ClearAllBtn>
            )}
        </S.CollectionHeader>
    );
};