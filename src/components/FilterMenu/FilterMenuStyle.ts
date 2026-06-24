import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const BurgerIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: var(--text-color, #fff); /* Твоя дефолтная переменная */
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: var(--bg-secondary, #1f1f27);
  border: 1px solid var(--border-color, #333);
  border-radius: 8px;
  padding: 16px;
  min-width: 220px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeIn} 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FilterLabel = styled.label`
  font-size: 12px;
  color: var(--text-muted, #aaa);
  font-weight: 500;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  background-color: var(--bg-primary, #13131a);
  color: var(--text-color, #fff);
  border: 1px solid var(--border-color, #333);
  cursor: pointer;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: var(--accent-color, #e50914);
  }

  option {
    background-color: var(--bg-primary, #13131a);
    color: var(--text-color, #fff);
  }
`;

export const ResetButton = styled.button`
  margin-top: 4px;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background-color: var(--accent-color, #e50914);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s ease, transform 0.1s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;