import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { store } from './App/Store';     
import { MovieGrid } from './features/Movies/MovieGrid/MovieGrid';
import { MovieDetails } from './features/Movies/MovieDetails/MovieDetails';
import { Auth } from './features/Auth/Auth';
import { MainLayout } from './components/MainLayout'; 
import { AboutPage } from './Pages/AboutPage/About';
import { WatchLaterPage } from './Pages/WatchLaterPage';
import { FavoritesPage } from './Pages/FavoritesPage';
import { ToastProvider } from './context/ToastContext';
import * as S from './AppStyle';


function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<MovieGrid />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/watch-later" element={<WatchLaterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={
                <S.InfoPageContainer>
                  <S.ErrorTitle>404 - Page Not Found 🔍</S.ErrorTitle>
                  <p>К сожалению, такой страницы в нашем кинотеатре не существует.</p>
                </S.InfoPageContainer>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  );
}

export default App;
