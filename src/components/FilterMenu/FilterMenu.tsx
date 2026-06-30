import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './FilterMenuStyle';
import { RatingSortSelect } from './RatingSortSelect';
import { YearSelect } from './YearSelect';
import { ContentTypeSelect } from './ContentTypeSelect';
import { useAppDispatch } from '../../hooks/UseAppDispatch';
import { useAppSelector } from '../../hooks/UseAppSelector';
import * as R from '../../features/Filters/searchSlice';

export const FilterMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pageKey = location.pathname === '/watch-later' ? 'watchLater' : location.pathname === '/favorites' ? 'favorites' : 'home';
  const { year, contentType, sortByRating } = useAppSelector(R.selectSearchByPage(pageKey));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

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
          <RatingSortSelect value={sortByRating} onChange={(val) => dispatch(R.updateSortByRating({ page: pageKey, value: val }))}  />
          <YearSelect value={year} onChange={(val) => dispatch(R.updateSearchText({ page: pageKey, key: 'year', value: val }))}  />
          <ContentTypeSelect value={contentType} onChange={(val) => dispatch(R.updateContentType({ page: pageKey, value: val }))} />

          {hasActiveFilters && (
            <S.ResetButton onClick={() => {
                dispatch(R.resetPageFilters(pageKey));
                setIsOpen(false);
              }}>
              Сбросить все
            </S.ResetButton>
          )}
        </S.Dropdown>
      )}
    </S.Container>
  );
};