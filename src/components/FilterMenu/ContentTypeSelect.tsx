import React from 'react';
import * as S from './FilterMenuStyle';

interface Props {
    value: string;
    onChange: (val: string) => void;
}

export const ContentTypeSelect: React.FC<Props> = ({ value, onChange }) => (
    <S.FilterGroup>
        <S.FilterLabel>Тип контента</S.FilterLabel>
        <S.Select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">Все типы</option>
            <option value="movie">Фильмы</option>
            <option value="series">Сериалы</option> 
            <option value="game">Видеоигры</option> 
        </S.Select>
    </S.FilterGroup>
);