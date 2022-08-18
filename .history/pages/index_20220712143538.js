import Link from 'next/Link'
import {useRouter} from 'next/router'

function home() {

  const router = useRouter()

  const handleClick = () => {
    console.log("Place Order");
    router.replace('/product')
  }
  return (
    <div>
      <h1>Home page</h1>
      <Link href='/blog'>
        <a>Blog</a>
      </Link>
      
      <Link href='/product'>
        <a>Product</a>
      </Link>
      
      <button onClick={handleClick}>
          Place Order
      </button>
    </div>
  )
}

export default home