import { useState, useEffect, useRef } from 'react';
import * as S from './FilterMenuStyle';
import { RatingSortSelect } from './RatingSortSelect';
import { YearSelect } from './YearSelect';
import { ContentTypeSelect } from './ContentTypeSelect';

interface FilterMenuProps {
  year: string;
  setYear: (year: string) => void;
  contentType: string;
  setContentType: (type: string) => void;
  sortByRating: string;
  setSortByRating: (val: string) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({
  year,
  setYear,
  contentType,
  setContentType,
  sortByRating,
  setSortByRating,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleReset = () => {
    setYear('');
    setContentType('');
    setSortByRating('');
    setIsOpen(false);
  };

  const hasActiveFilters = year || contentType || sortByRating;

  return (
    <S.Container ref={menuRef}>
      <S.BurgerButton onClick={() => setIsOpen(!isOpen)} aria-label="Фильтры">
        <S.BurgerIcon viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </S.BurgerIcon>
      </S.BurgerButton>
      
      {isOpen && (
        <S.Dropdown>
          <RatingSortSelect value={sortByRating} onChange={setSortByRating} />
          <YearSelect value={year} onChange={setYear} />
          <ContentTypeSelect value={contentType} onChange={setContentType} />

          {hasActiveFilters && (
            <S.ResetButton onClick={handleReset}>
              Сбросить все
            </S.ResetButton>
          )}
        </S.Dropdown>
      )}
    </S.Container>
  );
};