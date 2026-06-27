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

export const MoviesGrid = styled.div`
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

export const NoResults = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: var(--text-muted, #aaa);
  font-size: 16px;
  padding: 40px 0;
`;

export const StatusText = styled.div<{ $isError?: boolean }>`
  text-align: center;
  padding: 24px;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.$isError ? 'var(--danger-color, #ff4d4d)' : 'var(--text-muted, #aaa)'};
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

export const SkeletonCard = styled.div`
  background-color: var(--bg-card, #1f1f27);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 360px;
  animation: ${spin} 1.5s ease-in-out infinite; 
  background-color: #1a1a24;
`;

export const SkeletonContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SkeletonBadge = styled.div`
  width: 40%;
  height: 12px;
  border-radius: 4px;
  background-color: #1a1a24;
  animation: ${spin} 1.5s ease-in-out infinite;
`;

export const SkeletonTitle = styled.div`
  width: 85%;
  height: 16px;
  border-radius: 4px;
  background-color: #1a1a24;
  animation: ${spin} 1.5s ease-in-out infinite;
  
  &:last-child {
    width: 60%;
    margin-top: 4px;
  }
`;

export const CollectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ClearAllBtn = styled.button`
  background-color: rgba(255, 77, 77, 0.1);
  color: var(--danger-color, #ff4d4d);
  border: 1px solid rgba(255, 77, 77, 0.2);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--danger-color, #ff4d4d);
    color: #fff;
    box-shadow: 0 4px 12px rgba(255, 77, 77, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PageTitle = styled.h2`
  font-size: 24px;
  color: var(--text-main, #fff);
  margin: 0;
`;