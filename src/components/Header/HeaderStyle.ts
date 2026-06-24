import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const dropdownFade = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const AppHeader = styled.header`
  background-color: var(--bg-main);
  border-bottom: 1px solid var(--bg-card);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;       
  justify-content: space-between; 
  
  max-width: 1200px; 
  margin: 0 auto;    
  
  padding: 20px;
  min-height: 80px;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: nowrap;
  gap: 20px;         
`;

export const AppLogo = styled(Link)`
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 1px;
  user-select: none;
  display: flex;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
`;

export const LogoAccent = styled.span`
  color: var(--accent-color);
`;

export const LogoMain = styled.span`
  color: var(--text-main);
`;

export const SearchSection = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: flex-start; 
  flex: 1; 
  max-width: 1000px; 
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%; 
`;

export const SearchInput = styled.input`
  width: 100%; 
  padding: 12px 45px 12px 16px; 
  border-radius: 8px;
  border: 1px solid var(--border-color, #333);
  background-color: var(--bg-primary, #13131a);
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(123, 44, 191, 0.2);
  }
`;

export const BurgerWrapper = styled.div`
  position: absolute;
  right: 16px; /* Выровняли по правому краю инпута, убрав фиксированный сдвиг */
  top: 50%;
  transform: translateY(-50%);
  z-index: 10; 
  display: flex;
  align-items: center;
`;

export const ProfileMenuContainer = styled.div`
  grid-column: 2; 
  justify-self: end; 
  position: relative;
  display: flex;
  align-items: center;
`;

export const AvatarCircle = styled.div`
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
  background-color: var(--accent-color); 
  color: var(--text-main); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-weight: bold; 
  font-size: 14px;
  letter-spacing: 0.5px;
  user-select: none;
  cursor: pointer;
  transition: transform 0.2s ease;
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 50px; 
  right: 0;  
  background-color: var(--bg-card);
  border: 1px solid #2d2d3f;
  border-radius: 12px;
  padding: 20px;
  width: 260px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${dropdownFade} 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;

export const ProfileDropdownInfo = styled.div`
  border-bottom: 1px solid #2d2d3f;
  padding-bottom: 10px;
`;

export const ProfileDropdownName = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: var(--text-main);
`;

export const ProfileDropdownEmail = styled.div`
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 4px;
  word-break: break-all;
`;

export const ProfileDropdownDate = styled.div`
  font-size: 12px;
  color: #76787d;
`;

export const ProfileDropdownDateSpan = styled.span`
  color: var(--text-muted);
`;

export const LogoutBtn = styled.button`
  background-color: transparent;
  border: 1px solid var(--danger-color);
  color: var(--danger-color);
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  margin-top: 5px;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background-color: rgba(255, 77, 77, 0.1);
  }
`;

export const LoginLink = styled(Link)`
  grid-column: 2;
  justify-self: end;
  background-color: var(--accent-color);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--accent-hover);
  }
`;