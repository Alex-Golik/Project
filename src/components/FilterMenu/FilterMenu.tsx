import { useState, useEffect, useRef } from 'react';
import * as S from './FilterMenuStyle';

interface FilterMenuProps {
  year: string;
  setYear: (year: string) => void;
  contentType: string;
  setContentType: (type: string) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({
  year,
  setYear,
  contentType,
  setContentType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleReset = () => {
    setYear('');
    setContentType('');
    setIsOpen(false);
  };

  return (
    <S.Container ref={menuRef}>
      <S.BurgerButton onClick={() => setIsOpen(!isOpen)} aria-label="Фильтры">
        <S.BurgerIcon viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </S.BurgerIcon>
      </S.BurgerButton>
      
      {isOpen && (
        <S.Dropdown>
          <S.FilterGroup>
            <S.FilterLabel>Год выпуска</S.FilterLabel>
            <S.Select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Все годы</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </S.Select>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.FilterLabel>Тип контента</S.FilterLabel>
            <S.Select value={contentType} onChange={(e) => setContentType(e.target.value)}>
              <option value="">Все типы</option>
              <option value="movie">Фильмы</option>
              <option value="series">Сериалы</option> 
            </S.Select>
          </S.FilterGroup>

          {(year || contentType) && (
            <S.ResetButton onClick={handleReset}>
              Сбросить
            </S.ResetButton>
          )}
        </S.Dropdown>
      )}
    </S.Container>
  );
};