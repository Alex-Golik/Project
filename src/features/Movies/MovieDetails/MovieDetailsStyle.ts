import styled, { keyframes } from 'styled-components';

interface SkeletonLineProps {
  $width?: string;
}

const skeletonGlow = keyframes`
  0% { background-color: #1a1a24; }
  50% { background-color: #2d2d3f; }
  100% { background-color: #1a1a24; }
`;

export const SkeletonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  gap: 40px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SkeletonPoster = styled.div`
  width: 300px;
  height: 450px;
  border-radius: 14px;
  animation: ${skeletonGlow} 1.5s ease-in-out infinite;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 260px;
    height: 390px;
  }
`;

export const SkeletonInfoSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  width: 100%;
`;


export const SkeletonMainTitle = styled.div`
  width: 60%;
  height: 32px;
  border-radius: 6px;
  animation: ${skeletonGlow} 1.5s ease-in-out infinite;
`;


export const SkeletonMetaGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 10px 0;
`;


export const SkeletonLine = styled.div<SkeletonLineProps>`
  width: ${props => props.$width || '100%'};
  height: 16px;
  border-radius: 4px;
  animation: ${skeletonGlow} 1.5s ease-in-out infinite;
`;


export const SkeletonPlotBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
  border-top: 1px solid #2d2d3f;
  padding-top: 20px;
`;

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
    flex-direction: column; 
  }
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

export const ErrorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
  text-align: center;
  color: var(--text-muted, #76787d);
  font-family: 'Inter', sans-serif;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--danger-color, #ff4d4d);
    margin: 0;
  }
`;

export const ActionButtonsGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

interface ActionBtnProps {
  $isActive: boolean;
}

export const ActionBtn = styled.button<ActionBtnProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${props => props.$isActive ? 'var(--accent-color, #7b61ff)' : '#2d2d3f'};
  color: var(--text-main, #fff);
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: ${props => props.$isActive ? 'var(--accent-hover)' : '#3d3d55'};
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;