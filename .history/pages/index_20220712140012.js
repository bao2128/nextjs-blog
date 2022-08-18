import Link from 'next/Link'

function home() {
  return (
    <div>
      <h1>Home page</h1>
      <Link href='/blog'>
        <a>Blog</a>
      </Link>
      
      <Link href='/product'>
        <a>Producth</a>
      </Link>
      
    </div>
  )
}

export default home