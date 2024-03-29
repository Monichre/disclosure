import { createGlobalStyle } from 'styled-components'

export const theme = {
  colors: {
    white: 'hsl(0, 0%, 100%)',
    whiteAlpha50: 'hsla(0, 0%, 100%, 0.5)',
    whiteAlpha75: 'hsla(0, 0%, 100%, 0.75)',
    black: '#020407ff',
    grayDark: 'hsl(240, 17%, 26%)',
    grayLight: 'hsl(240, 6%, 54%)',
    turquoise: 'hsl(194, 48%, 49%)',
    orangeLight: 'hsl(33, 82%, 61%)',
    orangeDark: 'hsl(10, 63%, 51%)',
    purple: 'hsl(263, 67%, 51%)',
    redLight: 'hsl(2, 68%, 53%)',
    redDark: 'hsl(17, 73%, 46%)',
    green: 'hsl(169, 73%, 44%)',
    blue: 'hsl(222, 87%, 56%)',
    onyx: '#3C403Fff',
    richBlack: `#03090fff`,
    indigo: `#304e67ff`,
    prussianBlue: '#173248ff',
    gray: `#667795ff`,
  },
  fonts: {
    primary: `'Spartan', sans-serif`,
    secondary: `'Antonio', sans-serif`,
  },
}

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html:focus-within {
        scroll-behavior: smooth;
    }

    ul,
    ol {
        list-style: none;
    }

    @media (prefers-reduced-motion: reduce) {
        html:focus-within {
            scroll-behavior: auto;
        }

        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }

    html {
        font-size: 16px;
    }

    body {
        font-family: ${theme.fonts.primary};
        font-size: 0.875rem;
        counter-reset: tab;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`
