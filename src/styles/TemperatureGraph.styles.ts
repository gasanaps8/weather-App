import styled from 'styled-components';

export const ChartWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    padding: 1rem 0;
`;

export const ChartInner = styled.div<{ points: number }>`
    width: ${({ points }) => points * 80}px;
`;

export const ChartTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({theme}) => theme.colors.lightBlue};
`;

export const ChartContainer = styled.div`
    background: ${({theme}) => theme.colors.lightBlue};
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    width: 100%;
    margin-top: 2rem;
`;
