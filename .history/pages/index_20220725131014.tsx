import Link from 'next/Link'
import {useRouter} from 'next/router'
import { useEffect } from 'react'
import Layout from '../layout/layout'

function home() {
  // useEffect(() => {
  //   document.title = 'Home'
  // },)
  
  return (
    <div>
      <Link href='/product'>
        <a>Product</a>
      </Link>
    </div>
  )
}

export default home
