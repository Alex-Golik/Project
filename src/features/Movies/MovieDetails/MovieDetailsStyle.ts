import styled from 'styled-components';

export const DetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const BackBtn = styled.button`
  background-color: var(--accent-color);
  color: var(--text-main);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-bottom: 20px;

  &:hover {
    background-color: var(--accent-hover);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const DetailsTitle = styled.h1`
  text-align: left;
  padding: 0 0 10px 0;
  color: var(--text-main);
  font-size: 32px;
  margin: 0;
`;

export const DetailsMeta = styled.p`
  color: var(--text-muted);
  margin-bottom: 20px;
  font-size: 15px;
`;

export const DetailsMainInfo = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 640px) {
    flex-direction: column; /* Защита адаптива для мобилок */
  }

  /* Стилизация внутренних строк с описанием */
  div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
    p {
    font-size: 16px;
    margin: 0;
    color: var(--text-main);
    
    strong {
      color: var(--text-muted);
      font-weight: 600;
    }
  }
`;

export const DetailsPoster = styled.img`
  width: 250px;
  border-radius: 8px;
  object-fit: cover;
  background-color: var(--bg-card);

  @media (max-width: 640px) {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
`;

export const DetailsContent = styled.div`
  font-size: 18px;
  line-height: 1.6;
  border-top: 1px solid var(--bg-card);
  padding-top: 20px;
  color: var(--text-main);

  h3 {
    font-size: 20px;
    margin: 0 0 12px 0;
  }

  p {
    margin: 0;
    color: var(--text-muted);
  }
`;

export const PageStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 20px;
  color: var(--text-main);
  font-size: 18px;
`;