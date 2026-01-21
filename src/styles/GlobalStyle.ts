import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: 'Inter', system-ui, sans-serif;
        background: ${({theme}) => theme.colors.blue};

        color: ${({theme}) => theme.colors.textPrimary};
    }
`;

export const breakpoints = {
    mobile: 768,
    tablet: 1024,
};