import * as S from './AboutStyle'; 
import * as R from '../../AppStyle'; 

export const AboutPage = () => {
  return (
    <R.InfoPageContainer>
      <S.InfoTitle>About Project</S.InfoTitle>
      
      <S.InfoDescription>
        <strong>Pixema</strong> — это современный агрегатор фильмов, сериалов и видеоигр, разработанный в учебных целях. 
        Приложение интегрировано с внешним API OMDb, поддерживает безопасную симуляцию бэкенда для авторизации, 
        адаптивную сетку компонентов, умное кэширование и продвинутые персональные коллекции.
      </S.InfoDescription>

      <S.TechStackTitle>Реализованный функционал и технологии:</S.TechStackTitle>

      <S.TechList>
        <li>🚀 <strong>React 19 & Vite</strong> — передовой фронтенд-стек для мгновенной сборки и работы интерфейса</li>
        <li>🔷 <strong>TypeScript</strong> — строгая типизация данных (интерфейсы ответов OMDb, пропсов и стейта)</li>
        <li>📁 <strong>Feature-Driven Architecture</strong> — модульная структура проекта, разделяющая бизнес-логику фич на изолированные независимые слои</li>
        <li>🔄 <strong>Redux Toolkit & RTK Query</strong> — управление глобальным стейтом авторизации, кэширование поисковых запросов и предотвращение лишних сетевых вызовов</li>
        <li>🕒 <strong>Watch Later</strong> — изолированный модуль отложенного просмотра с синхронизацией в <code>localStorage</code></li>
        <li>⭐ <strong>Favorites</strong> — персональная коллекция избранного с независимым Redux-слайсом</li>
        <li>🔍 <strong>Локальный поиск и сортировка</strong> — переиспользуемый кастомный хук <code>useFilteredCollection</code>, реализующий полноценный поиск, фильтрацию и сортировку по рейтингу внутри личных коллекций без нагрузки на API</li>
        <li>💅 <strong>Styled Components</strong> — стилизация UI по принципу CSS-in-JS с поддержкой динамических пропсов</li>
        <li>📱 <strong>Infinite Scroll & Скелетоны</strong> — бесшовная подгрузка карточек порциями по 12 штук через нативный <code>IntersectionObserver</code> с плавными анимациями загрузки постеров</li>
      </S.TechList>
    </R.InfoPageContainer>
  );
};