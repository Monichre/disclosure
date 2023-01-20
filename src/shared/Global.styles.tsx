import styled, { createGlobalStyle, DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {}

export const GlobalStyle = createGlobalStyle`

`

export const FullPage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
