import styled, { keyframes, css } from 'styled-components';

const skeletonGlow = keyframes`
  0% { background-color: #1a1a24; }
  50% { background-color: #2d2d3f; }
  100% { background-color: #1a1a24; }
`;

const clockWobble = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(15deg) scale(1.15); }
  50% { transform: rotate(-10deg) scale(1.15); }
  75% { transform: rotate(5deg) scale(1.15); }
  100% { transform: rotate(0deg) scale(1); }
`;

const starPop = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  30% { transform: scale(1.3) rotate(-15deg); }
  50% { transform: scale(1.1) rotate(10deg); }
  70% { transform: scale(1.2) rotate(-5deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

export const CardWrapper = styled.div`
  background-color: var(--bg-card, #1f1f27);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column; 
  height: 100%; 

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 15px 30px rgba(123, 44, 191, 0.3);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 360px;
  overflow: hidden;   
  position: relative; 
  background-color: #13131a;
`;

export const SkeletonLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  animation: ${skeletonGlow} 1.5s ease-in-out infinite;
`;

export const NoPosterPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #13131a 0%, #1f1f27 100%);
  color: var(--text-muted, #76787d);
  gap: 12px;
  font-family: 'Inter', sans-serif;
  border-bottom: 1px solid #2d2d3f;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  span {
    font-size: 40px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
  }

  p {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  ${CardWrapper}:hover & {
    transform: scale(1.06);
    color: var(--text-main, #fff);
  }
`;

export const CardImage = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  
  opacity: ${props => props.$isLoaded ? 1 : 0};
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.06);
  }
`;

export const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
`;

export const CardBadge = styled.span`
  display: inline-block;
  color: var(--accent-color, #7b61ff);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main, #fff);
  margin: 0;
  line-height: 1.4;
  min-height: calc(1.4em * 2); 
  
  flex: 1; 
  min-width: 0; 

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RatingBadge = styled.div<{ $ratingColor: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: ${props => props.$ratingColor};
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  z-index: 5;
  font-family: 'Inter', sans-serif;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center; 
  justify-content: space-between; 
  gap: 12px;
  margin-top: auto; 
  width: 100%;
  flex-wrap: nowrap; 
`;

export const WatchLaterBtn = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$isActive ? 'var(--accent-color, #7b61ff)' : 'var(--text-muted, #76787d)'};
  transition: color 0.2s ease;
  z-index: 10; 

  &:hover {
    transform: scale(1.2);
    color: var(--accent-color, #7b61ff);
  }

  ${props => props.$isActive && css`
    animation: ${clockWobble} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  `}

  &:active {
    transform: scale(0.9);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

export const FavoriteBtn = styled.button<{ $isActive: boolean }>`
  position: absolute;
  top: 12px;
  left: 12px; 
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${props => props.$isActive ? '#ffd700' : 'rgba(255, 255, 255, 0.6)'};
  transition: transform 0.2s ease, color 0.2s ease;
  z-index: 6; 
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));

  &:hover {
    transform: scale(1.2);
    color: #ffd700;
  }

  ${props => props.$isActive && css`
    animation: ${starPop} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  `}

  &:active {
    transform: scale(0.9);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

export const CardControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; 
  flex-shrink: 0;
  margin-bottom: 4px; 
`;

export const CommentsCountIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-muted, #76787d);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  user-select: none;
  transition: color 0.2s ease;

  ${CardWrapper}:hover & {
    color: var(--text-main, #fff);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  span {
    line-height: 1;
  }
`;