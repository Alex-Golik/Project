import React from 'react';
import * as S from './FilterMenuStyle';

interface Props {
    value: string;
    onChange: (val: string) => void;
}

export const RatingSortSelect: React.FC<Props> = ({ value, onChange }) => (
    <S.FilterGroup>
        <S.FilterLabel>Сортировка по рейтингу</S.FilterLabel>
        <S.Select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">Без сортировки</option>
            <option value="desc">Сначала высокие ⭐</option>
            <option value="asc">Сначала низкие 📉</option>
        </S.Select>
    </S.FilterGroup>
);