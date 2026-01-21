import styled from 'styled-components';

export const DailyContainer = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 2rem;
`;

export const DayCard = styled.div<{ $selected: boolean }>`
    background: ${(props) => props.$selected ? props.theme.colors.lighterBlue : props.theme.colors.lightBlue};
    color: ${({theme}) => theme.colors.textSecondary};
    border-radius: 12px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-align: center;
    width: 140px;
    transition: background 0.2s ease;
    &:hover {
        background: ${({theme}) => theme.colors.lightBlue};
    }
`;

export const DayDate = styled.div`
    font-weight: 600;
    margin-bottom: 4px;
`;

export const DayTemp = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({theme}) => theme.colors.textPrimary};
`;

export const DayDescription = styled.div`
    font-size: 0.9rem;
    margin-bottom: 4px;
`;