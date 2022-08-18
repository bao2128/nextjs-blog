// import './user/register/styles.css'
// import Layout from '../components/layout.tsx'
// import '../components/register.module.css'
// import { MenuUnstyledContext } from '@mui/base'
import Rect from 'react'
import { AppWrapper } from '../context/AppContext'
import Layout from '../layout/layout'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <AppWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  )
}
