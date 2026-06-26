import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 12px;
  width: 100%;
  margin-top: 40px; 
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
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
    transform: translateX(4px); /* Легкий аккуратный сдвиг вбок при ховере */
  }
  &:active {
    transform: scale(0.98);
  }
`;