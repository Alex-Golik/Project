import * as S from './MovieDetailsStyle';


export const DetailsSkeleton = () => {
    return (
        <S.SkeletonContainer>
        <S.SkeletonPoster />
        <S.SkeletonInfoSide>
        <S.SkeletonMainTitle />
        
        <S.SkeletonMetaGroup>
            <S.SkeletonLine $width="30%" />
            <S.SkeletonLine $width="45%" />
            <S.SkeletonLine $width="35%" />
            <S.SkeletonLine $width="50%" />
        </S.SkeletonMetaGroup>

        <S.SkeletonPlotBlock>
            <S.SkeletonLine $width="100%" />
            <S.SkeletonLine $width="95%" />
            <S.SkeletonLine $width="90%" />
            <S.SkeletonLine $width="65%" />
        </S.SkeletonPlotBlock>
        </S.SkeletonInfoSide>
    </S.SkeletonContainer>
    );
};