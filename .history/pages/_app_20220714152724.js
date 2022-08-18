// import './user/register/styles.css'
// import Layout from '../components/layout.tsx'
// import '../components/register.module.css';

export default function MyApp({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)
  
    return getLayout(<Component {...pageProps} />)
  }
  