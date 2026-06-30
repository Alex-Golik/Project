import { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Header } from './Header/Header';
import { useAppSelector } from '../hooks/UseAppSelector';
import { selectCurrentUser } from '../features/Auth/AuthSlice';
import { Tabs } from './Tabs/Tabs';
import * as S from '../AppStyle'; 


export interface MoviesContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const MainLayout = () => {
    const location = useLocation();
    const currentUser = useAppSelector(selectCurrentUser);
    const [page, setPage] = useState(1);


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
        <Header />
        <Outlet context={{ page, setPage } satisfies MoviesContextType} />
      </S.MainContent>
    </S.AppLayout>
  );
};