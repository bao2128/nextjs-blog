import { ThemeProvider } from '@mui/material'
import Rect from 'react'
import { AppWrapper } from '../context/AppContext'
import Layout from '../layout/layout'
import appTheme from '../components/theme'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  // const getLayout = Component.getLayout || ((page) => page)

  return (
    <AppWrapper>
      <ThemeProvider theme={myTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AppWrapper>
  )
}
