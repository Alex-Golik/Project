import styled from 'styled-components';

export const InfoTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 16px;
    color: var(--text-main, #fff);
`;

export const InfoDescription = styled.p`
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-muted, #aaa);
    margin-bottom: 24px;
`;

export const TechStackTitle = styled.h3`
    font-size: 20px;
    margin-bottom: 12px;
    color: var(--accent-color, #e50914);
`;

export const TechList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 15px;
    color: var(--text-main, #fff);

    code {
    background-color: var(--bg-primary, #13131a);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    color: var(--accent-color, #e50914);
    }
`;