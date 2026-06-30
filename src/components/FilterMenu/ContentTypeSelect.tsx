import * as S from './FilterMenuStyle';

export type ContentType = '' | 'movie' | 'series' | 'game';

interface ContentTypeSelectProps {
    value: ContentType;
    onChange: (val: ContentType) => void;
}

export const ContentTypeSelect = ({ value, onChange }: ContentTypeSelectProps) => (
    <S.FilterGroup>
        <S.FilterLabel>Тип контента</S.FilterLabel>
        <S.Select value={value} onChange={(e) => onChange(e.target.value as ContentType)}>
            <option value="">Все типы</option>
            <option value="movie">Фильмы</option>
            <option value="series">Сериалы</option> 
            <option value="game">Видеоигры</option> 
        </S.Select>
    </S.FilterGroup>
);