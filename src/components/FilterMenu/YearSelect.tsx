import React, { useMemo } from 'react';
import * as S from './FilterMenuStyle';

interface Props {
    value: string;
    onChange: (val: string) => void;
}

export const YearSelect: React.FC<Props> = ({ value, onChange }) => {
    const yearsList = useMemo(() => {
    const currentYear = new Date().getFullYear(); 
    const startYear = currentYear - 16; 
    const years = [];
    for (let y = currentYear; y >= startYear; y--) {
        years.push(y.toString());
    }
    return years;
    }, []);

    return (
        <S.FilterGroup>
            <S.FilterLabel>Год выпуска</S.FilterLabel>
            <S.Select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">Все годы</option>
                {yearsList.map((y) => (
                <option key={y} value={y}>{y}</option>
                ))}
            </S.Select>
        </S.FilterGroup>
    );
};