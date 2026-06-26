import { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Header } from './Header/Header';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/Auth/AuthSlice';
import { Tabs } from './Tabs/Tabs';
import * as S from '../AppStyle'; 


export interface MoviesContextType {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  contentType: string;
  setContentType: (val: string) => void;
  year: string;
  setYear: (val: string) => void;
}

export const MainLayout: React.FC = () => {
    const location = useLocation();
    const currentUser = useSelector(selectCurrentUser);
    const [searchQuery, setSearchQuery] = useState('Joker');
    const [page, setPage] = useState(1);
    const [contentType, setContentType] = useState('');
    const [year, setYear] = useState('');

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
          page={page}
          setPage={setPage}
          contentType={contentType}
          setContentType={setContentType}
          year={year}
          setYear={setYear}
        />

        <Outlet context={{ searchQuery, setSearchQuery, page, setPage, contentType, setContentType, year, setYear }} />
      </S.MainContent>
    </S.AppLayout>
  );
};