import styled from 'styled-components';

interface SearchSuggestionProps {
    suggestion: string;
    onAccept: (val: string) => void;
}

const SuggestionWrapper = styled.div`
    font-size: 13px;
    color: var(--text-muted, #aaa);
    padding-left: 4px;
    margin-top: 4px;
    font-family: 'Inter', sans-serif;
`;

const SuggestionLink = styled.span`
    color: var(--accent-color, #7b61ff);
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
    transition: opacity 0.2s ease;

    &:hover {
    opacity: 0.8;
    }
`;

export const SearchSuggestion = ({ suggestion, onAccept }: SearchSuggestionProps) => {
    if (!suggestion) return null;

    return (
        <SuggestionWrapper>
            Возможно, вы имели в виду:{' '}
        <SuggestionLink onClick={() => onAccept(suggestion)}>
            {suggestion}
        </SuggestionLink>
        </SuggestionWrapper>
    );
};