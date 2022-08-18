import Link from 'next/Link'
import {useRouter} from 'next/router'
import Layout from '../layout/layout'

function home() {

  const router = useRouter()

  const handleClick = (type) => {
    // console.log("Place Order");
    router.push('/user/sign-up')
  }
  return (
    <div>
      <Link href='/product'>
        <a>Product</a>
      </Link>
      
      <button onClick={()=>handleClick("sign-in")}>
          Sign in
      </button>
      
      <button onClick={()=>handleClick("sign-up")}>
          Sign up
      </button>
    </div>
  )
}

export default home

home.getLayout = function getLayout(page) {
  return (
    <Layout pageTitle="Home">
      {page}
    </Layout>
  )
}