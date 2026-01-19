import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Inter', system-ui, sans-serif;
    background: ${(props) => props.theme.colors.lightBlue};
    color: #1a1a1a;
  }
`;