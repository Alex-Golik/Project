import * as S from './MovieGridStyle';

export const GridSkeleton: React.FC = () => {

    const skeletonItems = Array.from({ length: 12 });

    return (
        <S.MoviesGrid>
            {skeletonItems.map((_, index) => (
                <S.SkeletonCard key={index}>
                <S.SkeletonImage />
                <S.SkeletonContent>
                <S.SkeletonBadge />
                <S.SkeletonTitle />
                <S.SkeletonTitle />
                </S.SkeletonContent>
                </S.SkeletonCard>
            ))}
        </S.MoviesGrid>
    );
};