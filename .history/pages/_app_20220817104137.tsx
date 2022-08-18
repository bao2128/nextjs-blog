import { useTheme } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { AppWrapper } from '../context/AppContext'
import Layout from '../layout/layout'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  // const getLayout = Component.getLayout || ((page) => page)
  const myTheme = useTheme()

  return (
    <AppWrapper>
      <SnackbarProvider 
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          '& .SnackbarItem-variantSuccess': {
            backgroundColor: myTheme.palette.primary.main, //your custom color here
          },}}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </AppWrapper>
  )
}
