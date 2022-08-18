import Link from 'next/Link'
import {useRouter} from 'next/router'
import { useEffect } from 'react'
import Layout from '../layout/layout'

function home() {
  // useEffect(() => {
  //   document.title = 'Home'
  // },)
  
  const path = useRouter()

  const handleClick = (type) => {
    // console.log("Place Order");
    switch(type) {
      case "sign-in":
        path.push('/user/sign-in')
        break
      case "sign-up":
        path.push('/user/sign-up')
        break
    }
    
  }
  return (
    <div>
      <Link href='/product'>
        <a>Product</a>
      </Link>
      
      {/* <button onClick={()=>handleClick("sign-in")}>
          Sign in
      </button>
      
      <button onClick={()=>handleClick("sign-up")}>
          Sign up
      </button> */}
    </div>
  )
}

export default home

// home.getLayout = function getLayout(page) {
//   return (
//     <Layout pageTitle="Home">
//       {page}
//     </Layout>
//   )
// }