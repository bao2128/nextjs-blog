import Link from 'next/Link'
import router from 'next/router'
import { useAppContext } from '../context/AppContext'

function home() {
  const [status] = useAppContext()
  if (status === 'true') {
    router.push('/')
  }
  return (
    <div>
      <Link href='/product'>
        <a>Product</a>
      </Link>
    </div>
  )
}

export default home
