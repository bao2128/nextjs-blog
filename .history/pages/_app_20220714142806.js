import './user/register/styles.css'
import Layout from '../components/layout.tsx'

function MyApp({Component, pageProps}) {
    return (
        <Layout>
            <Component {...pageProps}/>
        </Layout>
    )
}

export default MyApp