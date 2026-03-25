import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.textLight};
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
`;