import { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Header } from './Header/Header';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/Auth/AuthSlice';
import { Tabs } from './Tabs/Tabs';
import { useDebounce } from '../hooks/UseDebounce';
import * as S from '../AppStyle'; 


export interface MoviesContextType {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  debouncedSearchQuery: string; 
  searchSuggestion: string; 
  setSearchSuggestion: (val: string) => void; 
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  contentType: string;
  setContentType: (val: string) => void;
  year: string;
  setYear: (val: string) => void;
  sortByRating: string;
  setSortByRating: (val: string) => void; 
}

export const MainLayout: React.FC = () => {
    const location = useLocation();
    const currentUser = useSelector(selectCurrentUser);
    const [searchQuery, setSearchQuery] = useState('man');
    const [searchSuggestion, setSearchSuggestion] = useState('');
    const [page, setPage] = useState(1);
    const [contentType, setContentType] = useState('');
    const [year, setYear] = useState('');
    const [sortByRating, setSortByRating] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const isAuthPage = location.pathname === '/auth' || location.pathname === '/about';
  if (!currentUser && !isAuthPage) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <S.AppLayout>
      <S.Sidebar>
        <S.AppLogo to="/">
          <S.LogoAccent>pix</S.LogoAccent>
          <S.LogoMain>ema</S.LogoMain>
        </S.AppLogo>
        <Tabs />
      </S.Sidebar>
      <S.MainContent>
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchSuggestion={searchSuggestion}     
          setSearchSuggestion={setSearchSuggestion}
          page={page}
          setPage={setPage}
          contentType={contentType}
          setContentType={setContentType}
          year={year}
          setYear={setYear}
          sortByRating={sortByRating}       
          setSortByRating={setSortByRating} 
        />

        <Outlet context={{ 
          searchQuery, setSearchQuery, 
          debouncedSearchQuery,
          searchSuggestion, setSearchSuggestion,
          page, setPage, 
          contentType, setContentType, 
          year, setYear, 
          sortByRating, setSortByRating
          }} />
      </S.MainContent>
    </S.AppLayout>
  );
};