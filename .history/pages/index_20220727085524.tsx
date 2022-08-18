import Link from 'next/Link'
import router from 'next/router'
import { useEffect, useContext } from 'react';
import { useAppContext } from '../context/AppContext';
import Layout from '../layout/layout'

function home() {
  const [status] = useAppContext()
  if (status === 'true') {
    // router.push('/')
  }
  return (
    <div>
      <Link href='/product'>
        <a>Product</a>
      </Link>
      <Link onClick={() => { router.push('/user'); } } href={''}>
        User
      </Link>
    </div>
  )
}

export default home
