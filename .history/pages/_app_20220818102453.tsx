import { SnackbarProvider } from 'notistack'
import { AppWrapper } from '../context/AppContext'
import Layout from '../layout/layout'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  // const getLayout = Component.getLayout || ((page) => page)

  return (
    <AppWrapper>
      <SnackbarProvider
        hideIconVariant
        maxSnack={3}
        autoHideDuration={7000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </AppWrapper>
  )
}