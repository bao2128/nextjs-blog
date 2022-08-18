import Head from 'next/head'
import router from 'next/router'
import { useAppContext } from '../context/AppContext'

function home() {
  const [status] = useAppContext()
  // if (status === 'true') {
  //   router.push('/')
  // }
  return (
    <>
      <Head>
        <title>
          {'Home'}
        </title>
      </Head>
      <h1>Home Page</h1>
    </>
  )
}

export default home
