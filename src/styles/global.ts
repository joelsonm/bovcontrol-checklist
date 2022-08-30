import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: none;
  }
  html,
  body {
    font-family: 'Roboto', sans-serif;
    color: black;
  }
`

export default GlobalStyle
