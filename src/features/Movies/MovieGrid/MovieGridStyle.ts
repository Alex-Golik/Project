import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const ListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)); 
  gap: 24px; 
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr)); 
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr)); 
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr; 
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid var(--bg-card);

  button {
    background-color: var(--accent-color);
    color: var(--text-main);
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;

    &:hover:not(:disabled) {
      background-color: var(--accent-hover);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      background-color: var(--bg-card);
      color: var(--text-muted);
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const PageNumber = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-muted);
`;

export const NoResults = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: var(--text-muted);
  font-size: 16px;
  padding: 40px 0;
`;

export const StatusText = styled.div<{ $isError?: boolean }>`
  text-align: center;
  padding: 24px;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.$isError ? 'var(--danger-color, #ff4d4d)' : 'var(--text-muted)'};
`;

export const LoadingTrigger = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  min-height: 60px;
`;

export const PurpleSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(123, 97, 255, 0.1); 
  border-top: 4px solid var(--accent-color, #7B61FF); 
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;