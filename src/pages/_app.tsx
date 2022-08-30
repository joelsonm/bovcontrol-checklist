import { ThemeProvider } from 'styled-components'
import DialogProvider from '../components/contexts/dialog'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DialogProvider>
          <Component {...pageProps} />
        </DialogProvider>
      </ThemeProvider>
    </>
  )
}
