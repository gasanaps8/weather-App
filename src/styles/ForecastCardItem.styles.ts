import styled from 'styled-components';

export const ForecastCard = styled.li<{ $expanded: boolean }>`
    background: ${({theme}) => theme.colors.lightBlue};
    border: 1px solid ${({theme}) => theme.colors.lighterBlue};
    border-radius: 14px;
    padding: 1rem;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
    transition: all 0.25s ease;
    width:90%;
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
    justify-content: center
    gap: 1rem;

    &:hover {
        transform: translateY(-2px);
    }

    ${({ $expanded, theme}) =>
        $expanded &&
        `
            background: ${theme.colors.lighterBlue};
        `}
`;

export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    grid-column: 1 / -1;
`;

export const DateText = styled.span`
    font-weight: 600;
    font-size: 0.95rem;
    color: ${({theme}) => theme.colors.textPrimary};
`;

export const ExpandableContent = styled.div<{ $expanded: boolean }>`
    grid-column: 1 / -1;
    overflow: hidden;
    max-height: ${({ $expanded }) => ($expanded ? '300px' : '0')};
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
    transition: max-height 0.3s ease, opacity 0.2s ease;
    margin-top: ${({ $expanded }) => ($expanded ? '1rem' : '0')};
`;

export const ForecastDetails = styled.div`
    display: grid;
    justify-content: center;
    gap: 0.35rem;
    font-size: 0.95rem;
    color: ${({theme}) => theme.colors.textSecondary};
`;
