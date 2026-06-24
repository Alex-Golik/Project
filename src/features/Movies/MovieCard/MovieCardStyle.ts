import styled from 'styled-components';

export const CardWrapper = styled.div`
  background-color: var(--bg-card);
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

export const CardImage = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  transition: opacity 0.2s;
  display: block; 

  ${CardWrapper}:hover & {
    opacity: 0.9;
  }
`;

export const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardBadge = styled.span`
  display: inline-block;
  color: var(--accent-color);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;