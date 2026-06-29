import * as S from './FilterMenuStyle';

export type SortType = '' | 'desc' | 'asc';

interface RatingSortSelectProps {
    value: SortType;
    onChange: (val: SortType) => void;
}

export const RatingSortSelect = ({ value, onChange }: RatingSortSelectProps) => (
    <S.FilterGroup>
        <S.FilterLabel>Сортировка по рейтингу</S.FilterLabel>
        <S.Select value={value} onChange={(e) => onChange(e.target.value as SortType)}>
            <option value="">Без сортировки</option>
            <option value="desc">Сначала высокие 👍</option>
            <option value="asc">Сначала низкие 👎</option>
        </S.Select>
    </S.FilterGroup>
);