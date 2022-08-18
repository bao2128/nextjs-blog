// import './user/register/styles.css'
// import Layout from '../components/layout.tsx'
// import '../components/register.module.css';
import { AppWrapper } from '../context/AppContext'

//run json-server first: json-server --watch data.json --port 4000

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <AppWrapper>
      getLayout(<Component {...pageProps} />)
    </AppWrapper>
  )
}
