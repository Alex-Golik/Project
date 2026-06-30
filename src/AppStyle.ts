import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-primary, #13131a); 

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 240px;
  background-color: var(--bg-main);
  border-right: 1px solid var(--bg-card);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px 24px 40px 24px; 
  z-index: 90;
  box-sizing: border-box;

  @media (max-width: 768px) {
    position: static; 
    width: 100%;
    height: auto;
    padding: 16px 20px;
    border-right: none;
    border-bottom: 1px solid var(--bg-card);
    flex-direction: row; 
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding-left: 240px; 
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-left: 0; 
    width: 100%;
  }
`;

export const AppLogo = styled(Link)`
  font-size: 32px; 
  font-weight: 700;
  letter-spacing: 1.5px; 
  user-select: none;
  display: flex;
  text-decoration: none;
  font-family: 'Inter', system-ui, sans-serif;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 0;
    font-size: 24px; 
  }
`;

export const LogoAccent = styled.span`
  color: var(--accent-color);
`;

export const LogoMain = styled.span`
  color: var(--text-main);
`;

export const InfoPageContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  box-sizing: border-box;
  color: var(--text-main, #fff);

  h2 {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 16px 0;
    letter-spacing: -0.01em;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-muted, #aaa);
    margin: 0;
  }
    @media (max-width: 480px) {
    padding: 24px 16px;
    
    h2 {
      font-size: 22px;
    }
  }
`;

export const ErrorTitle = styled.h2`
  color: var(--danger-color, #ff4d4d) !important; 
`;