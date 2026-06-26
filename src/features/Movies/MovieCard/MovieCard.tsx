import type { MovieShort } from '../../../types/movie';
import * as S from './MovieCardStyle';

interface ArticleCardProps {
  article: MovieShort; 
  onCardClick: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onCardClick }) => {
  const imageSrc = article.Poster === 'N/A' ? 'https://placehold.co' : article.Poster;

  return (
    <S.CardWrapper onClick={() => onCardClick(article.imdbID)}>
      <S.CardImage src={imageSrc} alt={article.Title} />
      <S.CardContent>
        <S.CardBadge>
          {article.Type.toUpperCase()} ({article.Year})
        </S.CardBadge>
        <S.CardTitle>{article.Title}</S.CardTitle>
      </S.CardContent>
    </S.CardWrapper>
  );
};