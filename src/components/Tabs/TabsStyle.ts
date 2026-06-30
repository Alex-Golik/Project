import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 12px;
  width: 100%;
  margin-top: 40px; 
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

@media (max-width: 768px) {
  flex-direction: row;
  margin-top: 0;
  gap: 8px;
  width: auto; 
}
`;

interface TabLinkProps {
  $isActive: boolean;
}

export const TabLink = styled(Link)<TabLinkProps>`
  font-size: 16px;
  text-decoration: none;
  font-weight: 600;
  padding: 12px 16px;
  border-radius: 8px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease;

  color: ${props => props.$isActive ? '#fff' : 'var(--text-muted)'};
  background-color: ${props => props.$isActive ? 'var(--accent-color)' : 'transparent'};

  &:hover {
    color: ${props => props.$isActive ? '#fff' : 'var(--text-main)'};
    background-color: ${props => props.$isActive ? 'var(--accent-hover)' : 'var(--bg-hover)'};
    transform: translateX(4px); 
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const TabBadge = styled.span`
  background-color: var(--accent-color, #7b61ff);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px; 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 10px;
  height: 14px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 2px 5px rgba(123, 97, 255, 0.3);
  transition: background-color 0.2s;

  
  opacity: 0.9;
`;