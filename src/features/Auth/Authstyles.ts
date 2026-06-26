import styled, { keyframes } from 'styled-components';

export const AuthContainer = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  background-color: var(--bg-card);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  box-sizing: border-box;

  @media (max-width: 480px) {
    margin: 40px auto;
    padding: 20px 16px;
    background-color: transparent;
    box-shadow: none;
  }
`;

export const AuthTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: var(--text-main);
  font-size: 24px;
  font-weight: 700;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const AuthInput = styled.input`
  background-color: #22222f;
  border: 1px solid #2d2d3f;
  color: var(--text-main);
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &::placeholder {
    color: var(--text-muted);
    opacity: 0.6;
  }

  &:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(123, 44, 191, 0.2);
  }
`;

export const AuthSubmitBtn = styled.button`
  background-color: var(--accent-color);
  color: var(--text-main);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-top: 10px;
  width: 100%;

  &:hover {
    background-color: var(--accent-hover);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ErrorMessage = styled.div`
  color: #fff;
  background-color: var(--danger-color, #ff4d4d);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${keyframes`from { opacity: 0; } to { opacity: 1; }`} 0.2s ease-out forwards;
`;

export const AuthToggleText = styled.p`
  margin-top: 20px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
`;

export const AuthToggleLink = styled.span`
  color: var(--accent-color);
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent-hover);
  }
`;